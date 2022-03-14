var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId
var fun = require('../functions')

// Home 

router.get('/', async function (req, res) {
 
  res.render('products');

});

router.get('/new', async function (req, res) {
 
  res.render('products');

}); 

router.post('/', async function (req, res) {
 
  res.render('products');

});


module.exports = router;

