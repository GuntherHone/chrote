var express = require('express');
var router = express.Router();

let sites = [
  { description: "Node", url: "http://nodejs.org", time: 20 },
  { description: "JS News", url: "https://news.js.org/", time: 20 }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', sites })
})

module.exports = router

