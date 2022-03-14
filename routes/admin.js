var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId

router.get('/', async function (req, res) {
  if (req.session.admin) {
    let products = await db.get().collection('products').find().toArray()
    let users = await db.get().collection('users').find().toArray()
    console.log(products, users);
    res.render('admin', { products, users });
  } else {
    res.redirect('admin/login')
  }
});

router.get('/login', async function (req, res) {
  res.render('adminlogin');
});

router.post('/login', async function (req, res) {
  let data = req.body
  if (data.gmail === 'm@m',
    data.password === "m") {
    req.session.admin = true
    res.redirect('/admin');
  } else {
    res.redirect('/admin/login');
  }
});

// Products

router.get('/add-product', async function (req, res) {
  if (req.session.admin) {
    res.render('newproduct');
  } else {
    res.redirect('/admin/login')
  }
});


router.post('/add-product', async function (req, res) {
  let product = req.body
  console.log(product);
  db.get().collection('products').insertOne(product).then((response) => {
    console.log(response);
  })
  res.redirect('/admin')
});

// router.get('/delete/:id', (req, res) => {
//   id = req.params.id
//   db.get().collection('blogs').deleteOne({ _id: ObjectId(id) })
//   res.redirect('/admin')
// })

// router.get('/deleteuser/:id', (req, res) => {
//   id = req.params.id
//   db.get().collection('users').deleteOne({ _id: ObjectId(id) })
//   res.redirect('/admin')
// })

//   res.redirect('/admin/');
// });

// router.get('/edit-product/:id', async function (req, res) {
//   let id = req.params.id
//   let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
//   res.render('newproduct', {user }); 
// });

// router.post('/edit-product', async function (req, res) {
//   let product = req.body
//   console.log(product);
//   db.get().collection('products').insertOne(product).then((response) => {
//     console.log(response);
//   })

//   res.redirect('/');
// });


// router.delete('/product/:id',async (req, res) => {
//   let product = req.params.id
//   db.get().collection('products').removeOne({_id:ObjectId(product)}).then((response) => {
//     console.log(response);
//   })
//   res.redirect('/cart')
// })


module.exports = router;

