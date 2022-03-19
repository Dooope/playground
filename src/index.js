const Pubsub = require('./pubsub/Pubsub');
require('./manual')
const obj = {
    name: 'newThis',
    fn: function() {
        console.log('hahha')
    }
}
function testMyCall(a, b, c) {
    console.log('this：', this)
    console.log('arguments：', ...arguments)
}
console.log('+++ myCall +++')
testMyCall.myCall(obj, 1, 2, 3)
console.log('+++ myApply +++')
testMyCall.myApply(obj, [1, 2, 3])
console.log('+++ mybind +++')
const newTest = testMyCall.myBind(obj, 1, 2, 3)
const testIns = new newTest(4, 5, 6)

console.log('+++ Pubsub +++')
const pubsub = new Pubsub()


pubsub.subscribe('hashchange', (data) => {
    console.log(data)
})


pubsub.subscribe('hashchange', (data) => {
    console.log(`${data} --- 2`)
}, true)

pubsub.publish('hashchange', 'publish')

pubsub.publish('hashchange', 'publish again')

pubsub.publish('myEvent', 'publish again')
// pubsub.unSubscribe('hashchange')

// pubsub.publish('hashchange', 'publish again and again')

console.log(pubsub)