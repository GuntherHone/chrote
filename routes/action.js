const express = require('express')
const router = express.Router()

router.post('/play', (req,res,next) => {
  req.app.get('chrome').play()
  res.send('PLAYING')
})

router.post('/stop', (req,res,next) => {
  req.app.get('chrome').stop()
  res.send('STOPPED')
})

router.post('/next', (req,res,next) => {
  req.app.get('chrome').next()
  res.send('SKIPPED FORWARD')
})

router.post('/previous', (req,res,next) => {
  req.app.get('chrome').previous()
  res.send('SKIPPED BACK')
})

router.post('/delete/:id?', (req, res, next) => {
  let sites = req.app.get('sites')
  sites.splice(sites.findIndex(site => site.id === req.params.id),1)
  res.redirect('/')
})

router.post('/add/' , (req, res, next) => {
  let newSite = {
    id:req.app.get('shortid').generate(),
    description:req.body.description,
    url:req.body.url,
    time:req.body.time
  }

  req.app.get('sites').push(newSite)

  res.redirect('/')
})

router.post('/update/' , (req, res, next) => {
  req.app.get('sites').find(site => site.id === req.body.id)[req.body.param] = req.body.value
  res.redirect('/')
})

module.exports = router
