<script setup lang="ts">
import FormSeccion from "@/modules/dashboard/components/shared/FormSeccion.vue";
import { ref } from "vue";
import { personRolEnum } from "../constant/personRolEnum";
import type { Provider } from "../models/Provider";
import InputSection from "@/modules/dashboard/components/shared/InputSection.vue";

interface props {
  person: Provider;
  personType: personRolEnum;
}

const props = defineProps<props>();

const title = ref("");
if (!props.person.phones) {
  props.person.phones = [];
}
if (!props.person.emails) {
  props.person.emails = [];
}

switch (props.personType) {
  case personRolEnum.CUSTOMER:
    title.value = "Datos del cliente";
    break;
  case personRolEnum.SUPPLIER:
    title.value = "Datos del proveedor";
    break;
  case personRolEnum.EMPLOYEE:
    title.value = "Datos del empleado";
    break;

  default:
    title.value = "Datos de la persona";
    break;
}
</script>

<template>
  <FormSeccion :title="title" border>
    <VRow>
      <VCol cols="12" class="py-1">
        <InputSection label-message="Nombre completo">
          <VTextField
            placeholder="Ingrese el nombre"
            v-model="props.person.name"
          />
        </InputSection>
      </VCol>
      <VCol cols="6" class="py-1">
        <InputSection label-message="# de identificación" required>
          <VTextField
            placeholder="Ingrese su identificacion"
            v-model="props.person.identity"
          />
        </InputSection>
      </VCol>
      <VCol cols="6" class="py-1">
        <InputSection label-message="Número de teléfono" required>
          <VTextField
            placeholder="Ingrese su telefono"
            v-model="props.person.phones[0]"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" class="py-1">
        <InputSection label-message="Dirección" required>
          <VTextField
            placeholder="Ingrese la direccion"
            v-model="props.person.address"
          />
        </InputSection>
      </VCol>
      <VCol cols="12" class="py-1">
        <InputSection label-message="correo electrónico" required>
          <VTextField
            placeholder="Ingrese el correo"
            v-model="props.person.emails[0]"
          />
        </InputSection>
      </VCol>
    </VRow>
  </FormSeccion>
</template>

<style scoped></style>
