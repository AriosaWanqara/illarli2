import type { Client } from './Client';
import type { Provider } from './Provider';

export interface ClientsApiResponse {
    data: Client[];
    links: Links;
    meta: Meta;
}
export interface ClientApiResponse {
    data: Client;
    links: Links;
    meta: Meta;
}
export interface ProvidersApiResponse {
    data: Provider[];
    links: Links;
    meta: Meta;
}
export interface ProviderApiResponse {
    data: Provider;
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
