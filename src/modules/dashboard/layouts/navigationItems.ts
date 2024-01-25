export interface menu {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const navigationsItems: menu[] = [
  {
    title: "Mi Illarli",
    icon: "streamline:dashboard-3-solid",
    to: "dashboard-home",
  },
  {
    title: "Productos",
    icon: "material-symbols:production-quantity-limits-outline-rounded",
    to: "#",
    children: [
      {
        title: "Productos",
        icon: "streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products",
        to: "product-list",
      },
      {
        title: "Categorias",
        icon: "icon-park-solid:health-products",
        to: "product-category-list",
      },
      {
        title: "Marcas",
        icon: "streamline:money-graph-bar-increase-up-product-performance-increase-arrow-graph-business-chart",
        to: "product-brands-list",
      },
    ],
  },
  {
    title: "Inventario",
    icon: "material-symbols:inventory",
    to: "#",
    children: [
      {
        title: "Compras",
        icon: "carbon:purchase",
        to: "purchase-list",
      },
      {
        title: "Ajustes",
        icon: "bi:wrench-adjustable",
        to: "adjust-list",
      },
      {
        title: "Transferencias",
        icon: "ph:truck-fill",
        to: "transference-list",
      },
    ],
  },
  {
    title: "Seguridad",
    icon: "ic:outline-security",
    to: "#",
    children: [
      {
        title: "Usuarios",
        icon: "material-symbols:manage-accounts-rounded",
        to: "users-list",
      },
      {
        title: "Roles",
        icon: "eos-icons:role-binding",
        to: "roles-list",
      },
    ],
  },
  {
    title: "Person",
    icon: "material-symbols:supervisor-account",
    to: "#",
    children: [
      {
        title: "Clientes",
        icon: "material-symbols:person-add-rounded",
        to: "client-list",
      },
      {
        title: "proveedores",
        icon: "material-symbols-light:person-4-rounded",
        to: "provider-list",
      },
    ],
  },
  {
    title: "Pricing",
    icon: "ic:baseline-price-change",
    to: "#",
    children: [
      {
        title: "Tarifas",
        icon: "streamline:subscription-cashflow-solid",
        to: "rate-list",
      },
      {
        title: "Promotions",
        icon: "carbon:promote",
        to: "promotions-list",
      },
      {
        title: "Formas de pago",
        icon: "solar:hand-money-outline",
        to: "payment-method-list",
      },
    ],
  },
  {
    title: "config",
    icon: "material-symbols:settings-heart-outline-rounded",
    to: "#",
    children: [
      {
        title: "Cajas",
        icon: "fa6-solid:cash-register",
        to: "config-cashdrawer-list",
      },
      {
        title: "Sucursales",
        icon: "solar:buildings-3-bold",
        to: "config-subsidiaries-list",
      },
      {
        title: "Bodegas",
        icon: "ic:sharp-warehouse",
        to: "config-warehouses-list",
      },
      {
        title: "Mis datos",
        icon: "streamline:interface-file-folder-work-office-company-folder-supplies-file",
        to: "config-company-account",
      },
      {
        title: "Company",
        icon: "material-symbols:add-business",
        to: "config-company-list",
      },
    ],
  },
];

export default navigationsItems;
