const connection = require('../utilities/connection')
const middlewares = require('../utilities/middlewares')
const customerWrapper = require('../../wrappers/customer')

module.exports = (router) => {
  router.post('/customer', middlewares.authentication, async (req, res) => {
    res.json(await customerWrapper.createCustomer(connection, req.body))
  })

  router.put('/customer', middlewares.authentication, async (req, res) => {
    res.json(await customerWrapper.updateCustomer(connection, req.body))
  })

  router.delete('/customer/:id', middlewares.authentication, async (req, res) => {
    res.json(await customerWrapper.deleteCustomer(connection, parseInt(req.params.id)))
  })

  router.get('/customers', middlewares.authentication, async (req, res) => {
    res.json(await customerWrapper.getCustomers(connection, req.query))
  })

  router.get('/customer', middlewares.authentication, async (req, res) => {
    res.json(await customerWrapper.getCustomer(connection, parseInt(req.query.id)))
  })
}
