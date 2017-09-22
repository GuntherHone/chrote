const express = require('express')
const router = express.Router()

let globalID = 0

router.post('/delete/:id?', (req, res, next) => {
  let sites = req.app.get('sites')
  sites.splice(sites.findIndex(site => site.id === +req.params.id),1)
  res.redirect('/')
})

router.post('/add/' , (req, res, next) => {
  let newSite = {
    id:globalID++,
    description:req.body.description,
    url:req.body.url,
    time:req.body.time
  }

  req.app.get('sites').push(newSite)

  res.redirect('/')
})

router.post('/update/' , (req, res, next) => {
  req.app.get('sites').find(site => site.id === +req.body.id)[req.body.param] = req.body.value
  res.redirect('/')
})

module.exports = router
