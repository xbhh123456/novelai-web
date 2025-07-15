import request from '@/utils/require'

export const userRequestServer = ({username,password,token}) =>
  request.post('/api/login',{username,password,token})

