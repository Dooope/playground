const Pubsub = require('./Pubsub');

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