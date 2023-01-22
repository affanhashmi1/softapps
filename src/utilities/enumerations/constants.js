const url = 'http://localhost'
const port = '3001'

export const apiUrl = `${url}:${port}/api`

export const userUrl = `${apiUrl}/user`

export const roleOptions = [
  { value: 'creator', label: 'Creator' },
  { value: 'viewer', label: 'Viewer' }
]