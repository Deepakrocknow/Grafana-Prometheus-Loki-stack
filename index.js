const express = require('express');
const responseTime = require('response-time')
const {doSomeHeavyTask} = require('./util')
const client = require('prom-client') 
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
        labels:{
            appName:"express"
        },
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);

const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({register:client.register})

const resTime = new client.Histogram({
     name:'http_express_req_res',
     help:'This tell us about time taken in req and res',
     labelNames:['method','route','status_code'],
     buckets:[1,50,100,200,400,500,800,1000,2000],
});

const totalC = new client.Counter({
    name:'http_express',
    help:'This tell us about time taken',
})

app.use(responseTime((req,res,time)=>{
       totalC.inc();
       resTime.labels({
           method:req.method,
           route:req.url,
           status_code:res.statusCode
       }).observe(time)
}))

app.get('/',(req,res)=>{
    logger.info("req come in / route")
   return res.json({message:`Hello from Server`});
})

app.get('/slow',async(req,res)=>{
      try{
        logger.info("req come in /slow route")
         const timeTaken = await doSomeHeavyTask();
         return res.json({
             status:"Success",
             message:`heavy task completed in ${timeTaken}ms`,
         })
      }catch(error){
        logger.error("error /slow route")
         return res
              .status(500)
               .json({status:"Error",error:"Internal server error"})
      }
})

app.get('/metrics',async(req,res)=>{
     res.setHeader("Content-Type",client.register.contentType);
     const metrics = await client.register.metrics();
     res.send(metrics);
})

app.listen(PORT,()=>{
     console.log(`server is running on ${PORT}`)
});