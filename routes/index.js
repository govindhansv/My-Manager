var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId
var fun = require('../functions')

// Home 

router.get('/', async function (req, res) {
  let id = req.session.user
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  let products = await db.get().collection('products').find().sort({ title: 1 }).toArray()
  console.log(products);
  if (user) {
    res.render('index', { products, user });
  }
  res.render('index', { products });
});

// Routes

router.get('/cart', async (req, res) => {
  let user = req.session.user
  let cartitems = await db.get().collection('carts').find({ "userid": user }).toArray()
  console.log(cartitems);
  res.render('cart', { cartitems, user })
})

router.get('/profile', async function (req, res) {
  let user = req.session.userdata
  // let user = await db.get().collection('users').findOne({ _id: ObjectId(req.session.user) })
  // let blogs = await db.get().collection('blogs').find({ "userid": req.session.user }).toArray()
  res.render('profile',{user})
});

router.get('/catagory', async function (req, res) {
  let products = await db.get().collection('products').find().toArray()
  res.render('catagory',{products})
});

router.get('/view-product/:id', async function (req, res) {
  let id = req.session.user
  let prodid = req.params.id
  let product = await db.get().collection('products').findOne({ _id: ObjectId(prodid) })
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  res.render('product', {user,product});
});





// router.get('/section/:section', async function (req, res) {
//   var section = req.params.section
//   if (req.session.loggedIN) {
//     let id = req.session.user
//     let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
//     let blogs = await db.get().collection('blogs').find({ "section": section }).toArray()
//     let newblog = blogs[0]
//     res.render('index', { blogs, user,newblog });
//   } else {
//     let blogs = await db.get().collection('blogs').find({ "section": section }).toArray()
//     let newblog = blogs[0]
//     res.render('index', { blogs,newblog });
//   }

// });




// User Authentication Code Place

router.get('/signup', (req, res) => {
  if (req.session.signupstatusfalse) {
    res.render('signup', { err: true })
  } else
    res.render('signup')
})


router.post('/signup', (req, res) => {
  console.log(req.body);
  fun.doSignup(req.body).then((response) => {
    console.log(response);
    if (response.signupstatus) {
      req.body.userid = response.insertedId
      req.session.userdata = req.body
      session = req.session;
      session.user = response.insertedId
      session.loggedfalse = false
      session.loggedIN = true
      res.redirect('/')
    } else {
      req.session.signupstatusfalse = true
      res.redirect('/signup/')
    }
  })
})

router.get('/login', function (req, res) {
  console.log(req.session);
  if (req.session.loggedIN) {
    res.redirect('/users/')
  }
  if (req.session.loggedfalse) {
    res.render('login', { err: true });
  } else {
    res.render('login');
  }
});


router.post('/login', (req, res) => {
  console.log(req.body);

  fun.doLogin(req.body).then((response) => {
  console.log(response);

    if (response.status) {
      response.user.userid = String(response.user._id)
      req.session.userdata = response.user

      req.session.user = String(response.user._id)
      req.session.loggedfalse = false
      req.session.loggedIN = true
      res.redirect('/users/')
    } else {
      req.session.loggedfalse = true
      res.redirect('/users/login');
    }
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/');
});

module.exports = router;
