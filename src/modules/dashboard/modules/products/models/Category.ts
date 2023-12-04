export interface Category {
    id: string;
    name: string;
    slug: string;
    description: null | string;
    parent_id: null;
    image: null;
    order: null;
    created_at: Date;
    updated_at: Date;
    products: any[];
}
