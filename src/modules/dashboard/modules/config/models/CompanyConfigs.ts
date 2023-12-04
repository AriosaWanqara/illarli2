export interface CompanyConfigs {
    id: string;
    domain: string; //
    ruc: string;
    email: string;
    phone: string;
    address: string;
    businessname: string; //?
    commercialname: string; //?
    is_force_accounting: number;
    is_withholding_agent: number;
    withholding_agent_resolution: null;
    is_artisan: number;
    expiration_date: null;
    receipt_quantity: number;
    artisan_resolution: null;
    is_rimpe: number;
    is_active: number;
    path_sign_electronic: null;
    key_sign_electronic: null;
    sign_expiration_date: null;
    decimal_quantity: number;
    quantity_digits_search_weight: number;
    is_electronic_sign_configurated: number;
    is_active_drawer_opening: number;
    is_active_search_products_match: number;
    is_active_search_products_code_dafault: number;
    is_active_search_products_observation: number;
    is_active_inventory_managment: number;
    created_at: Date;
    updated_at: Date;
}
