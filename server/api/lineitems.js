const router = require('express').Router()
const {LineItem, Product} = require('../db/models')
module.exports = router

// get all lineitems
router.get('/', (req, res, next) => {
  LineItem.findAll({
    where: {
      orderId: req.session.orderId
    },
    include:[Product]
  })
    .then((lineitem) => {
      res.json(lineitem)
    }).catch(next)
})

// get a line item by id
router.get('/item/:itemId', (req, res, next) => {
  LineItem.findOne({
    where: {
      id: req.params.itemId
    }
  })
    .then((lineitem) => {
      res.json(lineitem)
    }).catch(next)
})


// add a line item (post)
router.post('/', (req, res, next) => {
  const lineItem = {
    price: req.session.product.price,
    quantity: 1,
    orderId: req.session.orderId,
    productId: req.session.product.id
  }
  LineItem.create(lineItem)
    .then((created) => {
      res.json(created)
    }).catch(next)
})


// update a line item (quantities)(put)
router.put('/', (req, res, next) => {

  LineItem.update({quantity: req.body.quantity}, {
    where: {
      id: req.body.id
    }
  }
  ).then(updated => {
    res.json(updated)
  }).catch(next)
})

// delete a line item (destroy)
router.delete('/:itemId', (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.params.itemId
    }
  }).then((destroyed) => {
    res.json(destroyed)
  }).catch(next)
})
