function getRandomvalue(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function doSomeHeavyTask() {
    const ms = getRandomvalue([100, 150, 200, 300, 600, 500, 1000, 1400, 2500]);
    const shouldThrowError = getRandomvalue([1, 2, 3, 4, 5, 6, 7, 8]) === 8;

    if (shouldThrowError) {
      const randomError = getRandomvalue([
        "DB payment failure",
        "DB server failure",
        "Access failure",
        "Not Found failure"
      ]);
      throw new Error(randomError);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(ms), ms); // Resolves after `ms` milliseconds with the value `ms`
    });
  }

  module.exports = { doSomeHeavyTask };
