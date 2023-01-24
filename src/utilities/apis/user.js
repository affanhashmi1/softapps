import axios from 'axios'
import { apiUrl } from '../enumerations/constants'

export const createUser = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user`, payload)
  return response
}

export const updateUser = async (payload) => {
  const { data: response } = await axios.put(`${apiUrl}/user`, payload)
  return response
}

export const deleteUser = async (id) => {
  const { data: response } = await axios.delete(`${apiUrl}/user/${id}`)
  return response
}

export const getUsers = async (params) => {
  const query = new URLSearchParams(params)
  const { data: response } = await axios.get(`${apiUrl}/users?${query.toString()}`)
  return response
}

export const getUser = async (id) => {
  const { data: response } = await axios.get(`${apiUrl}/user?id=${id}`)
  return response
}

export const verifyUser = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/verify`, payload)
  return response
}

export const login = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/login`, payload)
  return response
}

export const logout = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/logout`, payload)
  return response
}

export const confirm = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/confirm`, payload)
  return response
}

export const forgot = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/forgot`, payload)
  return response
}

export const updatePassword = async (payload) => {
  const { data: response } = await axios.put(`${apiUrl}/user/forgot`, payload)
  return response
}