var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  res.render('about', {
    title: 'About',
    chromeVersion: req.app.get('chrome').getVersion()
  })
})

module.exports = router
