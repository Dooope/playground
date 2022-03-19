module.exports = class Pubsub {
    constructor() {
        this.messages = {}
    }

    subscribe(name, fn, once) {
        if(this.messages[name]) {
            this.messages[name].push({
                callback: fn,
                once: !!once
            })
        } else {
            this.messages[name] = [{
                callback: fn,
                once: !!once
            }]
        }
    }

    publish(name, ...args) {
        if(this.messages[name] && this.messages[name].length > 0) {
            this.messages[name] = this.messages[name].filter(fn => {
                fn.callback(...args)
                return !fn.once
            });
        } else {
            console.warn(`"${name}" has not been registered!`)
        }
    }

    subscribeOnce(name, fn) {
        this.subscribe(name, fn, true)
    }

    unSubscribe(name) {
        if(this.messages[name]) {
            delete this.messages[name]
        }
    }
}