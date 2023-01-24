import axios from 'axios'
import { apiUrl } from '../enumerations/constants'

export const createPost = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/post`, payload)
  return response
}

export const updatePost = async (payload) => {
  const { data: response } = await axios.put(`${apiUrl}/post`, payload)
  return response
}

export const deletePost = async (id) => {
  const { data: response } = await axios.delete(`${apiUrl}/post/${id}`)
  return response
}

export const getPosts = async (params) => {
  const query = new URLSearchParams(params)
  const { data: response } = await axios.get(`${apiUrl}/posts?${query.toString()}`)
  return response
}

export const getPost = async (id) => {
  const { data: response } = await axios.get(`${apiUrl}/post?id=${id}`)
  return response
}

export const approvePost = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/post/approve`, payload)
  return response
}