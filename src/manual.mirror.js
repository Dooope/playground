/**
 * 防抖函数
 * @param {*} fn 
 * @param {*} time 
 */
function debounce(fn, time) {
  let timer = null
  const self = this
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
      timer = null
    }, time)
  }
}

/**
* 节流函数
* @param {*} fn 
* @param {*} time 
*/
function throttle(fn, time) {
  let timer = null
  const self = this
  return function(...args) {
    if(timer === null) {
      timer = setTimeout(() => {
        fn.apply(self, args)
        timer = null
      }, time)
    }
  }
}


/**
* 深拷贝
*
*/
function deepClone(fn) {

}

/**
* Promise.all
* @param {*} arr 
*/
function PromiseAll(arr) {

}



/**
 * insanceof
 * @param {*} fn 
 */
Object.prototype.isInstanceOf = function(fn) {
  let proto = Object.getPrototypeOf(this)
  while(proto) {
    if(proto === fn.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

/**
* call函数
*/
Function.prototype.myCall = function(context, ...args) {
  context = context || window
  args = args || []
  const fn = Symbol()
  context[fn] = this
  let res = context[fn](...args)
  delete context[fn]
  return res
}

/**
* apply函数
*/
Function.prototype.myApply = function(context, args) {
  context = context || window
  args = args || []
  const fn = Symbol()
  context[fn] = this
  let res = context[fn](...args)
  delete context[fn]
  return res
}

/**
* bind函数
*/
Function.prototype.myBind = function(context, ...args) {
  const self = this
  context = context || window
  args = args || []
  return function newFn(...newArgs) {
    if(this instanceof newFn) {
      return new self(...args, ...newArgs)
    }
    return self.apply(context, args)
  }
}

/**
* new操作符
*/
function myNew(fn, ...args) {
  let obj = {}
  obj = Object.create(fn.prototype)
  const res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}
