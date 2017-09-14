const CDP = require('chrome-remote-interface');

let client
let Page
let connected = false
let timer

async function load(url) {
    try {
        if(!connected) throw "Not connected!"
        console.log(`Loading ${url}...`)
        await Page.navigate({url})
        await Page.loadEventFired()
    } catch (err) {
        console.log(err)
    }
}

const delay = (ms) => {
    console.log(`Waiting for ${ms / 1000} seconds...`)
    return new Promise((resolve,reject) => setTimeout(resolve,ms))
}

const connect = async (options = {retry:false}) => {
    try {
        console.log('connecting...')
        // connect to endpoint
        client = await CDP()
        Page = client.Page
        // enable events then start!
        await Page.enable()
        console.log('Connected')
        connected = true
    } catch (err) {
        console.log('Could not connect!')
        if(options.retry) {
            options.retryTime = options.retryTime || 10000
            console.log(`Retrying in ${options.retryTime / 1000} seconds`)
            await delay(options.retryTime)
            await connect(options)
        } else {
            throw err
        }
    }
}

connect({retry:true, retryTime:20000})
.then(() => load('http://nodejs.org'))
.then(() => delay(6000))
.then(() => load('http://www.munichurch.de'))
.then(() => client.close())
.then(() => console.log('done'))