const CDP = require('chrome-remote-interface')

module.exports = (() => {

    let schedule
    let index = 0
    let timer
    let Page
    let chromeVersion
    let connected = false

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

    const load = async url => {
        try {
            if (!connected) throw "Not connected!"
            console.log(`Loading ${url}...`)
            Page.navigate({ url })
        } catch (err) {
            console.log(err)
        }
    }

    const play = () => {
        console.log(`Showing index ${index} ${schedule[index].url} for ${schedule[index].time}`)
        load(schedule[index].url)
        timer = setTimeout(play, schedule[index].time * 1000)
        index = (index + 1) % schedule.length
    }

    const stop = () => {
        if (timer) clearTimeout(timer)
        timer = undefined
    }

    const next = () => {
        console.log('next')
        stop()
        play()
    }

    const previous = () => {
        console.log('previous')
        stop()
        index = index - 2
        if (index < 0) index = index + schedule.length
        play()
    }

    const setSchedule = sites => { 
        schedule = sites 
        index = 0
    }

    const getVersion = () => chromeVersion.Browser

    return {
        connect,
        getVersion,
        play,
        stop,
        next,
        previous,
        setSchedule
    }
})()
