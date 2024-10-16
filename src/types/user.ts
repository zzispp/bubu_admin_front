import { Menu } from "./menu";
import { Role } from "./role";

export interface User {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    roles?: Role[];
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UserUpdateInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export interface UserWithoutPassword extends Omit<User, 'password'> { }

export interface UserWithToken extends User {
    accessToken: string;
}


export interface LoginResponse {
    accessToken: string;
}


export interface GetProfileResponse {
    user_id: string;
    name: string;
    email: string;
    roles: string[] | null;
    menus: Menu[];
}


export interface UserProfile {
    user_id: string;
    name: string;
    email: string;
    roles: string[] | null;
    menus: Menu[];
}


export interface ListUserParams {
    email?: string;
}

export interface ListUserResponse {
    users: User[];
}
