module.exports = (url, ...values) => {
  return new Promise((resolve, reject) => {
    const spawn = require("child_process").spawn;
    const process = spawn('python3',[url, ...values]);

    const fallbackTimeout = setTimeout(() => {
      reject('TIMEOUT')
    }, 5000)

    process.stdout.on('data', (data) => {
      try {
        const buff = new Buffer(data, 'utf8').toString()
        resolve(buff)
      } catch (e) {
        reject(e)
      }
    });

    process.stderr.on('data', (data) => {
      console.log(new Buffer(data, 'utf8').toString())
      reject('Something went wrong..')
    });

  })
}
