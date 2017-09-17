const express = require('express')
const router = express.Router()

router.post('/delete/:description?', (req, res, next) => {
  let sites = req.app.get('sites')
  sites.splice(sites.findIndex(site => site.description === req.params.description),1)
  res.redirect('/')
})

router.post('/add/' , (req, res, next) => {
  let newSite = {
    description:req.body.description,
    url:req.body.url,
    time:req.body.time
  }

  req.app.get('sites').push(newSite)

  res.redirect('/')
})

module.exports = router
