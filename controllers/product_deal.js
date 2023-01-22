const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const productDealWrapper = require('../../wrappers/product_deal')

module.exports = (router) => {
  router.post('/product_deal', middlewares.authentication, async (req, res) => {
    res.json(await productDealWrapper.createProductDeal(connection, req.body))
  })

  router.put('/product_deal', middlewares.authentication, async (req, res) => {
    res.json(await productDealWrapper.updateProductDeal(connection, req.body))
  })

  router.delete('/product_deal/:id', middlewares.authentication, async (req, res) => {
    res.json(await productDealWrapper.deleteProductDeal(connection, parseInt(req.params.id)))
  })

  router.get('/product_deals', middlewares.authentication, async (req, res) => {
    res.json(await productDealWrapper.getProductDeals(connection, req.query))
  })

  router.get('/product_deal', middlewares.authentication, async (req, res) => {
    res.json(await productDealWrapper.getProductDeal(connection, parseInt(req.query.id)))
  })
}
