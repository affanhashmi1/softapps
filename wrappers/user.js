const omit = require('lodash/omit')
const dayjs = require('dayjs')
const constants = require('../utilities/constants')
const User = require('../models/User.model')
const emailService = require('../services/email')

const onRegister = async (user) => {
  const payload = {
    name: user.name,
    email: user.email,
    subject: 'Email Confirmation Link',
    message: `
      <p>Thank you for joining, we would like you to confirm your <strong>email address</strong> by clicking the link below</p>
      <a href="http://localhost:3000/confirm?email=${user.email}&e=${constants.LINK_EXPIRY()}">Confirm email address</a>
      <p>SoftApps &copy; ${new Date().getFullYear()}</p>
    `
  }
  return await emailService.send(payload)
}

const onForgotPassword = async (user) => {
  const payload = {
    name: user.name,
    email: 'affanhashmi1@yahoo.com',
    subject: 'Forgot Password Link',
    message: `
      <p><strong>Forgot your password</strong> by clicking the link below you will be able to change your account password</p>
      <a href="http://localhost:3000/forgot?email=${user.email}&e=${constants.LINK_EXPIRY()}">Change your password</a>
      <p>If you didn't initiate this request please ignore this message</p>
      <p>SoftApps &copy; ${new Date().getFullYear()}</p>
    `
  }
  return await emailService.send(payload)
}

const createUser = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['name', 'role', 'email', 'password'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    payload.password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)
    payload.status = constants.USER_STATUS.PENDING
    payload.email_verified = false
    const response = await User.create(payload)

    onRegister(response)

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateUser = async (payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const user = await User.findById(payload.id)
    if (!user) throw new Error('user not found')

    if (payload.name) user.name = payload.name
    if (payload.email) user.email = payload.email
    if (payload.password && payload.password !== user.password) user.password = constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)

    const response = await user.save()

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteUser = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const response = await User.deleteOne({ _id: id })

    return {
      status: true,
      user: `${response.deletedCount} row(s) affected`
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getParams = (params) => {
  const where = {}

  if (params.id) where.id = params.id
  if (params.ids) where.id = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.ids)
  }
  if (params.name) where.name = {
    [Op.like]: `${params.name}%`
  }

  return where
}

const getUsers = async (params) => {
  try {
    const response = await User.find()

    return {
      status: true,
      users: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getUser = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const response = await User.findById(id)
    if (!response) throw new Error('user not found')

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const login = async (payload) => {
  let response = null

  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['email', 'password'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    response = await User.findOne({ email: payload.email })
    if (!response) throw new Error('Invalid email or password')
    if (!response.email_verified) throw new Error('Email not verified, We\'ve send you a verification link please check your email')

    const comparison = await constants.GENERAL_FUNCTIONS.COMPARE_PASSWORD(payload.password, response.password)
    if (!comparison) throw new Error('Invalid email or password')

    return {
      status: true,
      user: response
    }
  } catch (error) {
    if (error.message === 'Email not verified, We\'ve send you a verification link please check your email') onRegister(response)

    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const logout = async (token) => {
  try {
    const sessionResponse = await sessionWrapper.deleteSession(token)
    if (!sessionResponse.status) throw new Error(sessionResponse.message)

    return {
      status: true,
      user: sessionResponse.session
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const confirm = async (payload) => {
  try {
    if (!payload.email) throw new Error('email missing from the request')

    const user = await User.findOne({ email: payload.email })
    if (!user) throw new Error('user not found')

    user.email_verified = true
    const response = await user.save()

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const forgot = async (payload) => {
  try {
    if (!payload.email) throw new Error('email missing from the request')

    const response = await User.findOne({ email: payload.email })
    if (!response) throw new Error('user not found')

    await onForgotPassword(response)

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updatePassword = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['email', 'password'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    const user = await User.findOne({ email: payload.email })
    if (!user) throw new Error('user not found')

    user.email_verified = true
    user.password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)
    const response = await user.save()

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createUser, updateUser, deleteUser, getUsers, getUser, login, logout, confirm, forgot, updatePassword }