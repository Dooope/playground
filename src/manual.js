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
        } else {
            fn.call(self, args);
        }

        timer = setTimeout(function() {
            fn.call(self, args)
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
 * @param {*} target 
 */
function deepClone(target) {}

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
 * @param {*} target 
 */
Object.prototype.isInstanceOf = function(target) {
    let proto = Object.getPrototypeOf(this)
    while(proto) {
        if(proto === target.prototype) {
            return true
        } 
        proto = proto = Object.getPrototypeOf(proto)
    }
    return false
}