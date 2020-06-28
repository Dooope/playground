Function.prototype.myCall = function(context) {
    context=context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

function fn1(a) {
    console.log(this, a)
}

fn1('gag')
fn1.myCall({})

