const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const productWrapper = require('../../wrappers/product')

module.exports = (router) => {
  router.post('/product', middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.createProduct(connection, req.body))
  })

  router.put('/product', middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.updateProduct(connection, req.body))
  })

  router.delete('/product/:id', middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.deleteProduct(connection, parseInt(req.params.id)))
  })

  router.get('/products', middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.getProducts(connection, req.query))
  })

  router.get('/product', middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.getProduct(connection, parseInt(req.query.id)))
  })
}
