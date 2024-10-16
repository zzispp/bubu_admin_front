import { ListRoleResponse } from "@/types/role";
import { request } from "@/shared/request";

export const listRole = (params: any): Promise<ListRoleResponse> => request.post('/v1/role/listRole', params);

export const createRole = (params: any): Promise<any> => request.post('/v1/role/createRole', params);

export const updateRole = (params: any, id: string): Promise<any> => request.put(`/v1/role/updateRole/${id}`, params);

export const getRoleByID = (id: string): Promise<any> => request.get(`/v1/role/getRoleByID/${id}`);

export const deleteRole = (id: string): Promise<any> => request.delete(`/v1/role/deleteRole/${id}`);
