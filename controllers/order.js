const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const orderWrapper = require('../../wrappers/order')

module.exports = (router) => {
  router.post('/order', middlewares.authentication, async (req, res) => {
    res.json(await orderWrapper.createOrder(connection, req.body))
  })
}
