const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const dealWrapper = require('../../wrappers/deal')

module.exports = (router) => {
  router.post('/deal', middlewares.authentication, async (req, res) => {
    res.json(await dealWrapper.createDeal(connection, req.body))
  })

  router.put('/deal', middlewares.authentication, async (req, res) => {
    res.json(await dealWrapper.updateDeal(connection, req.body))
  })

  router.delete('/deal/:id', middlewares.authentication, async (req, res) => {
    res.json(await dealWrapper.deleteDeal(connection, parseInt(req.params.id)))
  })

  router.get('/deals', middlewares.authentication, async (req, res) => {
    res.json(await dealWrapper.getDeals(connection, req.query))
  })

  router.get('/deal', middlewares.authentication, async (req, res) => {
    res.json(await dealWrapper.getDeal(connection, parseInt(req.query.id)))
  })
}
