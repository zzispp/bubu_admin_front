import { request } from '@/shared/request'
import {  GetProfileResponse, ListUserParams, ListUserResponse, LoginResponse } from '@/types/user'

export const login = (email: string, password: string): Promise<LoginResponse> => request.post('/v1/login', { email, password })

export const getProfile = (): Promise<GetProfileResponse> => request.get('/v1/user/getProfile')

export const listUser = (params: ListUserParams): Promise<ListUserResponse> => request.post('/v1/user/listUser', params)

export const deleteUser = (userId: string): Promise<void> => request.delete(`/v1/user/deleteUser/${userId}`)

export const getUserById = (userId: string): Promise<any> => request.get(`/v1/user/getUserByID/${userId}`)

export const updateUser = (userId: string, data: any): Promise<any> => request.put(`/v1/user/updateUser/${userId}`, data)