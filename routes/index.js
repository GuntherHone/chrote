const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home', sites: req.app.get('sites') })
})

module.exports = router
