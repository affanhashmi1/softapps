const constants = require('../utilities/constants')
const Post = require('../models/Post.model')

const createPost = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['title', 'description'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    payload.status = constants.POST_STATUS.PENDING
    const response = await Post.create(payload)

    return {
      status: true,
      post: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updatePost = async (payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const post = await Post.findById(payload.id)
    if (!post) throw new Error('post not found')

    if (payload.title) post.title = payload.title
    if (payload.description) post.description = payload.description
    if (payload.thumbnail && payload.thumbnail === null) post.thumbnail = payload.thumbnail

    const response = await post.save()

    return {
      status: true,
      post: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deletePost = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const response = await Post.deleteOne({ _id: id })

    return {
      status: true,
      post: `${response.deletedCount} row(s) affected`
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

const getPosts = async (params) => {
  try {
    const response = await Post.find()

    return {
      status: true,
      posts: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getPost = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const response = await Post.findById(id)
    if (!response) throw new Error('post not found')

    return {
      status: true,
      post: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const approvePost = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const post = await Post.findById(id)
    if (!post) throw new Error('post not found')

    post.status = constants.POST_STATUS.APPROVED
    const response = await post.save()

    return {
      status: true,
      post: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createPost, updatePost, deletePost, getPosts, getPost, approvePost }