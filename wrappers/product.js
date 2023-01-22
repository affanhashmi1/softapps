const constants = require('../utilities/constants')
const Product = require('../models/Product.model')

const createProduct = async (connection, payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['title', 'description', 'quantity', 'price', 'thumbnail', 'user_id'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    const product = await Product(connection)
    const response = await product.create(payload)

    return {
      status: true,
      product: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateProduct = async (connection, payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const product = await Product(connection)
    const productResponse = await product.findOne({
      where: { id: payload.id }
    })
    if (!productResponse) throw new Error('product not found')

    if (payload.title) productResponse.title = payload.title
    if (payload.description) productResponse.description = payload.description
    if (payload.quantity) productResponse.quantity = payload.quantity
    if (payload.price) productResponse.price = payload.price
    if (payload.thumbnail) productResponse.thumbnail = payload.thumbnail
    if (payload.image1) productResponse.image1 = payload.image1
    if (payload.image2) productResponse.image2 = payload.image2
    if (payload.image3) productResponse.image3 = payload.image3

    const response = await productResponse.save()

    return {
      status: true,
      product: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteProduct = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const product = await Product(connection)
    const response = await product.destroy({
      where: { id }
    })

    return {
      status: true,
      product: response
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
  if (params.title) where.title = {
    [Op.like]: `${params.title}%`
  }
  if (params.quantity) where.quantity = params.quantity
  if (params.price) where.price = params.price
  if (params.from && params.to) where.price = {
    [Op.between]: [params.from, params.to]
  }

  return where
}

const getProducts = async (connection, params) => {
  try {
    const product = await Product(connection)
    const response = await product.findAll({
      where: getParams(params)
    })

    return {
      status: true,
      products: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getProduct = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const product = await Product(connection)
    const response = await product.findOne({
      where: { id }
    })
    if (!response) throw new Error('product not found')

    return {
      status: true,
      product: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProduct }