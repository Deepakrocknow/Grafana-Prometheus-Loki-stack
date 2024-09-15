**Monitoring Stack: Prometheus, Grafana, and Loki** : 

This project implements a robust monitoring system using Grafana, Prometheus, and Loki to provide real-time data visualization, alerting, and log management.

Grafana: Visualization and dashboard management.
Prometheus: Monitoring and alerting system, pulling metrics from services.
Loki: Log aggregation system, allowing efficient log queries and visualization within Grafana.

**Table of Contents**
Prometheus Server Setup
Grafana Setup
Loki Server Setup
Using the Stack
1. Prometheus Server Setup
Step 1: Create Prometheus Configuration
Create a prometheus-config.yml file with the following content. Be sure to replace <NODEJS_SERVER_ADDRESS> with the actual address of the Node.js server or any other target you want to monitor:

yaml
Copy code
global:
  scrape_interval: 4s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["<NODEJS_SERVER_ADDRESS>"]
Step 2: Start the Prometheus Server
Use Docker Compose to start the Prometheus server. Create a docker-compose.yml file with the following content:

yaml
Copy code
version: "3"

services:
  prom-server:
    image: prom/prometheus
    ports:
      - 9090:9090
    volumes:
      - ./prometheus-config.yml:/etc/prometheus/prometheus.yml
Run the following command to start the Prometheus server:

bash
Copy code
docker-compose up -d
Now, the Prometheus server is up and running at http://localhost:9090.

2. Grafana Setup
To set up Grafana, use the following command:

bash
Copy code
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
Grafana will be accessible at http://localhost:3000 with the default credentials:

Username: admin
Password: admin
Be sure to change the password after your first login.

3. Loki Server Setup
To set up Loki for log aggregation, run the following command:

bash
Copy code
docker run -d --name=loki -p 3100:3100 grafana/loki
Loki will be accessible at http://localhost:3100.

4. Using the Stack
Adding Prometheus as a Data Source in Grafana
Open Grafana at http://localhost:3000 and log in.
Navigate to Configuration > Data Sources.
Add a new data source and select Prometheus.
Enter the Prometheus server URL: http://prom-server:9090.
Click Save & Test to verify the connection.
Adding Loki as a Data Source in Grafana
Open Configuration > Data Sources.
Add a new data source and select Loki.
Enter the Loki server URL: http://loki:3100.
Click Save & Test to verify the connection.
Creating Dashboards
Once your data sources are set up, go to Dashboards in Grafana and create or import dashboards for visualizing your Prometheus metrics and Loki logs.
Conclusion
This monitoring stack gives you powerful insights into your application's performance and logs. You can customize your Prometheus configuration for specific scraping needs and create rich visualizations with Grafana.
Feel free NOT to contribute or raise issues for any improvements or questions!

License
This project is licensed under the MIT License.
![Screenshot (187)](https://github.com/user-attachments/assets/ca889e7e-6574-4f5c-807b-6170d2af3d70)
![Screenshot (189)](https://github.com/user-attachments/assets/5da7e50e-8898-4d5a-ab7e-f0780eb2d963)
![Screenshot (191)](https://github.com/user-attachments/assets/afd4e3c4-ee33-4ed0-af16-3f881963cadd)
![Screenshot (194)](https://github.com/user-attachments/assets/483a1fe4-d556-4160-b6df-437f3595c233)




