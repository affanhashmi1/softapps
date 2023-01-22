// const middlewares = require('../utilities/middlewares')
const userWrapper = require('../wrappers/user')
// const sessionWrapper = require('../wrappers/session')

module.exports = (router) => {
  // Basic

  router.post('/user', async (req, res) => {
    res.json(await userWrapper.createUser(req.body))
  })

  router.put('/user', async (req, res) => {
    res.json(await userWrapper.updateUser(req.body))
  })

  router.delete('/user/:id', async (req, res) => {
    res.json(await userWrapper.deleteUser(req.params.id))
  })

  router.get('/users', async (req, res) => {
    res.json(await userWrapper.getUsers(req.query))
  })

  router.get('/user', async (req, res) => {
    res.json(await userWrapper.getUser(req.query.id))
  })

  // Auth

  router.post('/user/login', async (req, res) => {
    const response = await userWrapper.login(req.body)
    req.session.user = response.user
    res.json(await userWrapper.login(req.body))
  })

  router.post('/user/logout', async (req, res) => {
    res.json(await userWrapper.logout(req.body))
  })

  // router.post('/user/validate', async (req, res) => {
  //   res.json(await sessionWrapper.validateSession(connection, req.body.token))
  // })
}
