const express = require('express')
const router = express.Router()

require('../controllers/user')(router)

module.exports = router
