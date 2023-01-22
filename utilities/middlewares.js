const connection = require('./connection')
const constants = require('./constants')
const sessionWrapper = require('../wrappers/session')
const userWrapper = require('../wrappers/user')

const authentication = async (req, res, next) => {
  try {
    if (!req.get('Token')) throw new Error('login to continue')

    const response = await sessionWrapper.validateSession(connection, req.get('Token'))
    if (!response.status) throw new Error(response.message)
    if (!response.session) throw new Error('login to continue')

    sessionWrapper.updateSessionTimestamps(connection, response.session.id)

    req.user_id = response.session.id

    next()
  } catch (error) {
    res.json({
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    })
  }
}

const authorization = async (req, res, next) => {
  try {
    const response = await userWrapper.getUserStatus(connection, req.user_id)
    if (!response.status) throw new Error(response.message)

    next()
  } catch (error) {
    res.json({
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    })
  }
}

const validate = async (req, res, next) => {
  try {
    if (!req.get('Token')) throw new Error('login to continue')

    const response = await sessionWrapper.validateSession(connection, req.get('Token'))
    if (!response.status) throw new Error(response.message)
    if (!response.session) throw new Error('login to continue')

    sessionWrapper.updateSessionTimestamps(connection, response.session.id)

    req.user_id = response.session.id

    next()
  } catch (error) {
    req.user_id = null

    next()
  }
}

module.exports = { authentication, authorization, validate }