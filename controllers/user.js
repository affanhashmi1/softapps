const userWrapper = require('../wrappers/user')

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
    res.json(await userWrapper.login(req.body))
  })

  router.post('/user/logout', async (req, res) => {
    res.json(await userWrapper.logout(req.body))
  })

  router.post('/user/confirm', async (req, res) => {
    res.json(await userWrapper.confirm(req.body))
  })

  router.post('/user/forgot', async (req, res) => {
    res.json(await userWrapper.forgot(req.body))
  })

  router.put('/user/forgot', async (req, res) => {
    res.json(await userWrapper.updatePassword(req.body))
  })
}
