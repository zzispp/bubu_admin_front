import { ListMenuResponse } from "@/types/menu";
import { request } from "@/shared/request";

export const listMenu = (params: any): Promise<ListMenuResponse> => request.post('/v1/menu/listMenu', params);

export const createMenu = (params: any): Promise<any> => request.post('/v1/menu/createMenu', params);

export const updateMenu = (params: any, id: string): Promise<any> => request.put(`/v1/menu/updateMenu/${id}`, params);

export const getMenuByID = (id: string): Promise<any> => request.get(`/v1/menu/getMenuByID/${id}`);

export const deleteMenu = (id: string): Promise<any> => request.delete(`/v1/menu/deleteMenu/${id}`);
