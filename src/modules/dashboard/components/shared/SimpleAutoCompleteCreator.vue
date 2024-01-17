<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

interface props {
  placeholder: string;
  color: string;
  variant:
    | "solo-filled"
    | "outlined"
    | "plain"
    | "solo"
    | "solo-inverted"
    | "underlined"
    | "filled";
  isFlat?: boolean;
  items: Object[];
  isLoading: boolean;
  itemTitle: string;
  itemValue: string;
  value: any;
}

const props = defineProps<props>();
const emits = defineEmits(["model-update", "not-exist-item-create"]);

const search = ref();
const el = ref<HTMLElement>();
const value = ref(
  computed({
    get: () => props.value,
    set: (val) => emits("model-update", val),
  })
);
const canCreateWithEnter = ref(false);
const handleChange = (params: string) => {
  if (props.itemTitle != "") {
    if (
      props.items.filter((x) =>
        //@ts-ignore
        x[props.itemTitle].toLowerCase().includes(params.toLowerCase())
      ).length === 0
    ) {
      canCreateWithEnter.value = true;
    } else {
      canCreateWithEnter.value = false;
    }
  } else {
    if (
      props.items.filter((value) =>
        //@ts-ignore
        value.toLowerCase().includes(params.toLowerCase())
      ).length === 0
    ) {
      canCreateWithEnter.value = true;
    } else {
      canCreateWithEnter.value = false;
    }
  }
  search.value = params;
};
const handleValueChange = (params: any) => {
  emits("model-update", params);
};

const onItemCreate = () => {
  emits("not-exist-item-create", search.value);
};

const onKeyPress = (params: any) => {
  if (params.keyCode == 13) {
    if (canCreateWithEnter.value) {
      emits("not-exist-item-create", search.value);
    } else {
      if (props.itemTitle != "") {
        let x = props.items.filter((x) =>
          //@ts-ignore
          x[props.itemTitle].toLowerCase().includes(search.value.toLowerCase())
        );
        if (x.length == 1) {
          el.value?.blur();
          emits("model-update", x[0]);
        }
      } else {
        console.log(search.value);
        let x = props.items.filter((x) =>
          //@ts-ignore
          x.toLowerCase().includes(search.value.toLowerCase())
        );
        if (x.length == 1) {
          el.value?.blur();
          emits("model-update", x[0]);
        }
      }
    }
  }
};
</script>

<template>
  <v-autocomplete
    ref="el"
    @update:search="handleChange"
    @update:modelValue="handleValueChange"
    @keydown="onKeyPress"
    v-model="value"
    :placeholder="props.placeholder"
    :color="props.color"
    :variant="props.variant"
    :flat="props.isFlat"
    :items="props.items"
    :loading="props.isLoading"
    :item-title="props.itemTitle"
    :item-value="props.itemValue"
  >
    <template #no-data>
      <div
        class="tw-flex tw-w-full tw-cursor-pointer tw-px-2"
        @click="onItemCreate"
      >
        Click para añadir {{ search }}
      </div>
    </template>
  </v-autocomplete>
</template>

<style scoped></style>
