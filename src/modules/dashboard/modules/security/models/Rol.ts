import type { Permission } from './Permission';

export interface Rol {
    id: string;
    name: string;
    permissions: Permission[];
}
export interface RolToSave {
    id: string;
    name: string;
    permissions: string[];
}
