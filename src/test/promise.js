const myPromise = require('../Promise.bak')
// const myPromise = Promise
function main() {
  return new myPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
}

main().then(res => {
  console.log(res)
  return new myPromise((resolve, reject) => {
    resolve('哈哈哈')
  })
}).then((res) => {
  console.log(res)
})