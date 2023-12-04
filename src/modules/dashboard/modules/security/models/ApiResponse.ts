import type { Permission } from './Permission';
import type { Rol } from './Rol';
import type { User } from './User';

export interface PermissionsApiResponse {
    data: Permission[];
    links: Links;
    meta: Meta;
}
export interface PermissionApiResponse {
    data: Permission;
    links: Links;
    meta: Meta;
}
export interface RolesApiResponse {
    data: Rol[];
    links: Links;
    meta: Meta;
}
export interface RolApiResponse {
    data: Rol;
    links: Links;
    meta: Meta;
}
export interface UsersApiResponse {
    data: User[];
    links: Links;
    meta: Meta;
}

export interface UserApiResponse {
    data: User;
    links: Links;
    meta: Meta;
}

interface Links {
    first: string;
    last: string;
    prev: null;
    next: null;
}

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface Link {
    url: null | string;
    label: string;
    active: boolean;
}
