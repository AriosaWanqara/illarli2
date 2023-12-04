import type { Category } from '../Category';

export interface Product {
    id: string;
    slug: string;
    name: string;
    sku: string;
    upc: null | string;
    description: string;
    active: number;
    price: string;
    mmu: string;
    weight: null;
    width: null;
    height: null;
    depth: null;
    stock_min: string;
    stock_max: string;
    stock: number;
    show: number;
    unit_id: number;
    product_type_id: string;
    product_type_name: string;
    brand_id: string;
    categories: Category[];
    products: ProductChild[];
    inventory: Inventory[];
}

interface Inventory {
    id: string;
    warehouse_id: string;
    warehouse_name: string;
    stock_warehouse: string;
}

interface ProductChild {
    id: string;
    parent_product_id: string;
    child_product_id: string;
    relation_type: string;
    amount: string;
    price: string;
    created_at: Date;
    updated_at: Date;
    child: Child;
}

interface Child {
    id: string;
    slug: string;
    name: string;
    sku: string;
    upc: null;
    description: string;
    active: number;
    price: string;
    mmu: string;
    weight: null;
    width: null;
    height: null;
    depth: null;
    stock_min: string;
    stock_max: string;
    stock: number;
    show: number;
    taxes: null;
    assessment: string;
    cost: null | string;
    time: null;
    inventory: number;
    service: number;
    created_at: Date;
    updated_at: Date;
    unit_id: number;
    product_type_id: string;
    brand_id: null;
}
