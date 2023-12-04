import type { User } from './User';

export interface LoginApiResponse {
    token: string;
    user: User;
}
