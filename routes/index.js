const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home', sites: req.app.get('sites') })
})

module.exports = router
