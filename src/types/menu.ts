export interface ListMenuResponse {
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