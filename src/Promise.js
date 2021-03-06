const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

class Promise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING

    this.fulfilledCallback = []
    this.rejectedCallback = []

    this.resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        this.fulfilledCallback.forEach(fn => fn())
      }
    }

    this.reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.rejectedCallback.forEach(fn => fn())
      }
    }

    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        this.fulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.rejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })  
        })
      }
    })
    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError('typeError'))
    }

    if (x && (typeof x === 'object' || typeof x === 'function')) {
      let called
      try {
        let then = x.then
        if(typeof then === 'function') {
          then.call(x, (y) => {
            if (called) return
            called = true
            this.resolvePromise(promise2, y, resolve, reject)
          }, (r) => {
            if (called) return
            called = true
            reject(r)
          })
        } else {
          if (called) return
          called = true
          resolve(x)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;