export interface Promotion {
    id: string;
    name: string;
    description: string;
    product_id: null | string;
    category_id: null | string;
    type: string;
    min_quantity: null;
    max_quantity: null;
    price: null;
    percentage_discount: null;
    start_date: null;
    end_date: null;
    weekday: null;
    every_week: number;
}
