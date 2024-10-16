export interface ListRoleResponse {
    roles: Role[];
}


export interface Role {
    id: string;           // 唯一ID
    code: string;         // 角色代码（唯一）
    name: string;         // 角色显示名称
    description: string;  // 角色详细描述
    sequence: number;     // 排序序列
    status: string;       // 角色状态（禁用，启用）
    created_at: Date;     // 创建时间
    updated_at: Date;     // 更新时间
}