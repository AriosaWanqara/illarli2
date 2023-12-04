import type { Brand } from './Brand';
import type { Category } from './Category';
import type { Product } from './products/Product';
import type { Taxe } from './Taxe';

export interface CategoriesApiResponse {
    data: Category[];
    links: Links;
    meta: Meta;
}
export interface ProductsApiResponse {
    data: Product[];
    links: Links;
    meta: Meta;
}
export interface ProductApiResponse {
    data: Product;
    links: Links;
    meta: Meta;
}

export interface CategoryApiResponse {
    data: Category;
    links: Links;
    meta: Meta;
}

export interface BrandsApiResponse {
    data: Brand[];
    links: Links;
    meta: Meta;
}

export interface BrandApiResponse {
    data: Brand;
    links: Links;
    meta: Meta;
}
export interface TaxesApiResponse {
    data: Taxe[];
    links: Links;
    meta: Meta;
}

export interface TaxeApiResponse {
    data: Taxe;
    links: Links;
    meta: Meta;
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
