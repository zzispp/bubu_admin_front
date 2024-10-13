import { request } from '@/shared/request'
import {  GetProfileResponse, LoginResponse } from '@/types/user'

export const login = (email: string, password: string): Promise<LoginResponse> => request.post('/v1/login', { email, password })

export const getProfile = (): Promise<GetProfileResponse> => request.get('/v1/user/getProfile')
