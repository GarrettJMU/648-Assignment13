const express = require('express')
const app = express()

app.get('/product/get/', (req, res) => res.send('foo'))
app.post('/product/create', (req, res) => res.send('id'))
app.put('/product/update/:id', (req, res) => res.send(req.params))
app.delete('/product/delete/:id', (req, res) => res.send(req.params))
app.listen(3001)
