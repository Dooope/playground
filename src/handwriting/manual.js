/**
 * 防抖函数
 * @param {*} fn 
 * @param {*} time 
 */
function debounce(fn, time) {
    let timer = null
    return function(...args) {
        const self = this
        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function() {
            fn.apply(self, args)
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
        if(!timer) {
            timer = setTimeout(function() {
                fn.call(self, args)
                timer = null
            }, time)
        }
        
    }
}


/**
 * 深拷贝
 * @param {*} fn 
 */
function deepClone(fn) {}

const oriObj = {
    name: 'andy',
    age: 11,
    hobbies: ['soccer', 'game', 'movie'],
    grade: {
        a: '1',
        b: '2',
        c: {
            ex: '11223'
        }
    },
    hit: function(who) {
        console.log(who)
    }
}

/**
 * Promise.all
 * @param {*} arr 
 */
function PromiseAll(arr) {
    if(!Array.isArray(arr)) {
        throw Error('requires the first parameter to be an Array!')
    }

    let results = []

    for(let i = 0;i < arr.length;i++) {
        arr[i].then(res => {
            results[i] = new Promise.resolve(res)
        }).catch(e => {
            results = new Promise.reject(e)
            break
        })
    }
}

/**
 * instanceof
 * @param {*} fn 
 */
Object.prototype.isInstanceOf = function(fn) {
    let proto = Object.getPrototypeOf(this)
    while(proto) {
        if(proto === fn.prototype) {
            return true
        } 
        proto = proto = Object.getPrototypeOf(proto)
    }
    return false
}

/**
 * call函数
 */
Function.prototype.myCall = function(context, ...args) {
    const fn = Symbol()
    context = context || window
    args = args || []
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

/**
 * apply函数
 */
Function.prototype.myApply = function(context, args) {
    const fn = Symbol()
    context = context || window
    args = args || []
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

/**
 * bind函数
 */
Function.prototype.myBind = function(context, ...args) {
    const self = this
    context = context || window
    args = args || []
    return function bindedFn(...newArgs) {
        if(this instanceof bindedFn) {
            return new self(...args, ...newArgs)
        }
        return self.call(context, ...args)
    }
}

/**
 * new操作符
 */
function myNew(fn) {

}
