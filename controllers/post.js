const postWrapper = require('../wrappers/post')

module.exports = (router) => {
  router.post('/post', async (req, res) => {
    res.json(await postWrapper.createPost(req.body))
  })

  router.put('/post', async (req, res) => {
    res.json(await postWrapper.updatePost(req.body))
  })

  router.delete('/post/:id', async (req, res) => {
    res.json(await postWrapper.deletePost(req.params.id))
  })

  router.get('/posts', async (req, res) => {
    res.json(await postWrapper.getPosts(req.query))
  })

  router.get('/post', async (req, res) => {
    res.json(await postWrapper.getPost(req.query.id))
  })

  router.post('/post/approve', async (req, res) => {
    res.json(await postWrapper.approvePost(req.body._id))
  })
}
