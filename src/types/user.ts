export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
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


export interface Menu {
    id: string;
    code: string;
    name: string;
    description: string;
    sequence: number;
    type: string;
    path: string;
    redirect?: string;
    component: string;
    status: string;
    parent_id: string;
    children?: Menu[];
    created_at: string;
    updated_at: string;
    icon?: string;
}

export interface UserProfile {
    user_id: string;
    name: string;
    email: string;
    roles: string[] | null;
    menus: Menu[];
}
