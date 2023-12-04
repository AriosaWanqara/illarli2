import type { Cashdrawer } from './Cashdrawer';

export interface Subsidiary {
    id: string;
    businessname: string;
    code: null | string;
    address: string;
    phone: string;
    active: number;
    differentiated_billing: number;
    checkouts: Cashdrawer[];
    pos_route: null | string;
}
