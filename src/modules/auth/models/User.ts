import type { Permission } from './Permission';
import type { Rol } from './Rol';

export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: boolean;
    roles: Rol[];
    permissions: Permission[];
}
