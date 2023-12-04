import type { Cashdrawer } from './Cashdrawer';
import type { CompanyConfigs } from './CompanyConfigs';
import type { DocumentType } from './DocumentType';
import type { Subsidiary } from './Subsidiary';
import type { WareHouse } from './WareHouse';

export interface SubsidiariesApiResponse {
    data: Subsidiary[];
    links: Links;
    meta: Meta;
}

export interface SubsidiaryApiResponse {
    data: Subsidiary;
    links: Links;
    meta: Meta;
}
export interface CompanyApiResponse {
    data: CompanyConfigs;
    links: Links;
    meta: Meta;
}
export interface CashdrawersApiResponse {
    data: Cashdrawer[];
    links: Links;
    meta: Meta;
}

export interface CashdrawerApiResponse {
    data: Cashdrawer;
    links: Links;
    meta: Meta;
}
export interface WhareHousesApiResponse {
    data: WareHouse[];
    links: Links;
    meta: Meta;
}

export interface WhareHouseApiResponse {
    data: WareHouse;
    links: Links;
    meta: Meta;
}

export interface DocumentTypeApiResponse {
    data: DocumentType[];
}

export interface Links {
    first: string;
    last: string;
    prev: null;
    next: null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}
