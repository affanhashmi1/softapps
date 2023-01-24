const express = require('express')
const router = express.Router()

require('../controllers/user')(router)
require('../controllers/post')(router)

module.exports = router
