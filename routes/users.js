var express = require('express');
var router = express.Router();
var db = require('../connection')
var fun = require('../functions')
var ObjectId = require('mongodb').ObjectId
const cloudinary = require("cloudinary");

/* GET users listing. */
// const requiredlogin = (req,res)=>{
//   if (req.session.user) {
//       req.session.userstatus = true
//   }else{
//     req.session.userstatus = false
//   }
// }

router.get('/', async function (req, res) {
  if (req.session.loggedIN) {
//     let id = req.session.user
//     let user =  await db.get().collection('users').findOne({ _id: ObjectId(id) })
//     let blogs = await db.get().collection('blogs').find().toArray()
//     let newblog = blogs[0]
//     res.render('index', { blogs,user,newblog });
        res.redirect('/')

  } else {
    res.redirect('/')
  }
});


router.get('/add-to-cart/:id', async (req, res) => {
  let user = req.session.userdata
  let item = {}
  console.log(user);
  item.userid = user.userid
  item.quantity = 1
  console.log(item); 
  item.item = await db.get().collection('products').findOne(({ _id: ObjectId(req.params.id) }))
  db.get().collection('carts').insertOne(item).then((response) => {
    console.log(response);
  })
  res.redirect('/')
})

router.delete('/cart/:id', async (req, res) => {
  let itemid = req.params.id
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  db.get().collection('carts').removeOne({ "userid": user._id, _id: ObjectId(itemid) }).then((response) => {
    console.log(response);
  })
  res.redirect('/cart')
})


module.exports = router;
