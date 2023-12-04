<script setup lang="ts">
import ViewScaffold from "@dashboard/components/shared/ViewScaffold.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { PerfectScrollbar } from "vue3-perfect-scrollbar";

const route = useRoute();
const router = useRouter();
const ProductType = ref([
  {
    label: "Estandar",
    to: "product-add-standar",
    icon: "",
  },
  // {
  //     label: 'Serie',
  //     to: 'product-add-serie',
  //     icon: ''
  // },
  {
    label: "Combo",
    to: "product-add-combo",
    icon: "",
  },
  // {
  //     label: 'Tallas y Colores',
  //     to: 'product-add-size-color',
  //     icon: ''
  // },
  {
    label: "Subproducto",
    to: "product-add-subproduct",
    icon: "",
  },
  // {
  //     label: 'Receta',
  //     to: 'product-add-recipe',
  //     icon: ''
  // },
  // {
  //     label: 'Lote',
  //     to: 'product-add-lote',
  //     icon: ''
  // },
  // {
  //     label: 'Servicio',
  //     to: 'product-add-service',
  //     icon: ''
  // }
]);
const navegate = (to: string) => {
  router.push({ name: to });
};
</script>

<template>
  <ViewScaffold title="Agregar Producto">
    <template v-slot:actionBack>
      <RouterLink :to="{ name: 'product-list' }" class="d-sm-flex align-center">
        <ArrowLeftIcon size="18" class="mr-2" />
      </RouterLink>
    </template>

    <VRow>
      <VCol cols="12">
        <PerfectScrollbar class="card-container">
          <VCard
            variant="outlined"
            class="text-center card-item"
            v-for="item in ProductType"
            :class="{ 'item-selected': item.to == route.name }"
            @click="navegate(item.to)"
          >
            <v-card-item>
              {{ item.label }}
            </v-card-item>
          </VCard>
        </PerfectScrollbar>
      </VCol>
      <VCol cols="12">
        <router-view v-slot="{ Component }">
          <Transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </VCol>
    </VRow>
  </ViewScaffold>
</template>

<style scoped lang="scss">
.card-container {
  display: flex;
  overflow-x: auto;
  gap: 15px;
}
.card-item {
  width: 156px;
  min-width: 156px;
  cursor: pointer;
}
.item-selected {
  background-color: rgba(var(--v-theme-primary));
  color: white;
  font-weight: 600;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(120px);
  opacity: 0;
}
</style>
