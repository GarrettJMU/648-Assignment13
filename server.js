const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const DB_URL = 'mongodb+srv://Garrett:user@nodefinalproject-apdpv.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => console.log("mongoose error", err))

const Product = mongoose.model('product', {
  productId: Number,
  category: String,
  price: Number,
  name: String,
  instock: Boolean
})

app.use(cors())
app.use(express.urlencoded())

app.get('/product/get/', (req, res) => {
  Product.find({}, (err, products) => {
    res.send(products)
  })
})

app.post('/product/create', (req, res) => {
  const { id, price, name, instock, category } = req.body
  let product = new Product({ productId: id, price, name, category, instock })

  product.save((err) => {
    if (err) {
      console.log("error saving", err)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

app.put('/product/update/:productId', (req, res) => res.send(req.params))

app.delete('/product/delete/:productId', (req, res) => {
  console.log(req.params)

  Product.deleteOne({ productId: req.params.productId }, (err) => {
    console.log("deleting error", err)
  })

  res.send(req.params)
})

app.listen(3001)
