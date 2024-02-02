<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import type { Product } from "@/modules/dashboard/modules/products/models/products/Product";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import PurchaseDetails from "../PurchaseDetails.vue";

interface props {
  products: Product[];
}

const product = ref<Partial<Product>[]>([
  {
    id: "1",
    amount: 1,
    name: "primero",
    skus: [{ id: "asdj1", code: "asa10" }],
    price: "2",
    taxes: [
      {
        id: "asd",
        name: "IVA 12%",
        rate: 12,
        rate_tax_code: "1",
        tax: 12,
        tax_base: 12,
        tax_code: "12",
      },
    ],
  },
  {
    id: "2",
    amount: 1,
    name: "segundo",
    skus: [{ id: "ssas1", code: "asa11" }],
    price: "4",
    taxes: [
      {
        id: "asd",
        name: "IVA 12%",
        rate: 12,
        rate_tax_code: "1",
        tax: 12,
        tax_base: 12,
        tax_code: "12",
      },
    ],
  },
  {
    id: "3",
    amount: 2,
    name: "tercero",
    skus: [{ id: "asdj21", code: "asa12" }],
    price: "1.5",
    taxes: [
      {
        id: "asd",
        name: "IVA 12%",
        rate: 12,
        rate_tax_code: "1",
        tax: 12,
        tax_base: 12,
        tax_code: "12",
      },
    ],
  },
  {
    id: "4",
    amount: 5,
    name: "cuarto",
    skus: [{ id: "asdj51", code: "asa13" }],
    price: "10",
    taxes: [
      {
        id: "asd",
        name: "IVA 12%",
        rate: 12,
        rate_tax_code: "1",
        tax: 12,
        tax_base: 12,
        tax_code: "12",
      },
    ],
  },
  {
    id: "5",
    amount: 12,
    name: "quitno",
    skus: [{ id: "lasdj1", code: "asa14" }],
    price: "11",
    taxes: [
      {
        id: "asd",
        name: "IVA 12%",
        rate: 12,
        rate_tax_code: "1",
        tax: 12,
        tax_base: 12,
        tax_code: "12",
      },
    ],
  },
]);

const onItemDelete = (id: string) => {
  product.value = product.value.filter((x) => x.id != id);
};
</script>

<template>
  <FormSeccion title="Compras añadidas" border>
    <v-table density="compact" fixed-header class="custome">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cod</th>
          <th>Precio/uni</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>total</th>
          <th class="px-0 pr-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in product" :key="item.id">
          <td>{{ item.name }}</td>
          <td class="tw-text-gray-400">
            {{ item.skus![0].code }}
          </td>
          <td>${{ item.price }}</td>
          <td class="tw-text-red-500">{{ item.amount }}</td>
          <td class="tw-text-gray-400">${{ item.price }}</td>
          <td>${{ item.price }}</td>
          <td class="px-0 pr-2">
            <div
              v-ripple
              class="tw-border-[1px] tw-rounded-xl tw-flex tw-justify-center tw-items-center tw-cursor-pointer"
              @click="onItemDelete(item.id!)"
            >
              <Icon
                icon="material-symbols:close-small-rounded"
                height="18"
                class="tw-text-red-500"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="tw-flex tw-justify-end tw-w-full">
      <PurchaseDetails :products="product" />
    </div>
  </FormSeccion>
</template>

<style scoped lang="scss">
.custome {
  border: 1px solid rgba(var(--v-theme-borderColor));
  border-radius: 10px;
  background-color: rgba(var(--v-theme-containerBg));
  & thead th {
    background-color: rgba(var(--v-theme-containerBg)) !important;
    box-shadow: none !important;
    text-align: center !important;
    padding-top: 4px !important;
  }
  & thead th:first-child {
    padding-left: 5px;
  }
  & tbody > tr:not(:last-child) > td {
    border-bottom: 1px solid rgba(var(--v-theme-borderColor)) !important;
  }
  & tbody > tr > td {
    text-align: center;
  }
  & tbody > tr > td:first-child {
    padding-left: 0;
  }
}
.pr-2 {
  padding-right: 10px !important;
}
</style>
