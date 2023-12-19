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
        icon: "arcticons:purchased-apps",
        to: "purchase-list",
      },
    ],
  },
  { header: " " },
];

export default navigationsItems;
