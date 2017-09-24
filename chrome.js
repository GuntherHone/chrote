const CDP = require('chrome-remote-interface');

let client
let Page
let connected = false
let timer
let chromeVersion

module.exports = (() => {
    const load = async url => {
        try {
            if (!connected) throw "Not connected!"
            console.log(`Loading ${url}...`)
            await Page.navigate({ url })
            await Page.loadEventFired()
        } catch (err) {
            console.log(err)
        }
    }

    const delay = ms => {
        console.log(`Waiting for ${ms / 1000} seconds...`)
        return new Promise((resolve, reject) => setTimeout(resolve, ms))
    }

    const connect = async (options = { retry: false }) => {
        try {
            console.log('Connecting to Chrome Interface...')
            // connect to endpoint
            client = await CDP()
            chromeVersion = await CDP.Version()
            Page = client.Page
            // enable events then start!
            await Page.enable()
            console.log('Connected')
            connected = true
        } catch (err) {
            console.log('Could not connect!')
            if (options.retry) {
                options.retryTime = options.retryTime || 10000
                await delay(options.retryTime)
                await connect(options)
            } else {
                throw err
            }
        }
    }

    const getVersion = () => chromeVersion.Browser

    return {
        connect,
        load,
        getVersion
    }
})()
