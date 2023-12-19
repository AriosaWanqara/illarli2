<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import useLayoutState from "../../composable/useLayoutState";
import Logo from "../Logo.vue";
import NavCollapse from "./NavCollapse/NavCollapse.vue";
import NavGroup from "./NavGroup/index.vue";
import NavItem from "./NavItem/index.vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import navigationsItems from "../navigationItems";
import { shallowRef } from "vue";
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";
import Isotipo from "../Isotipo.vue";

const { mdAndDown } = useDisplay();
const { layoutState } = useLayoutState();
const sidebarMenu = shallowRef(navigationsItems);
const el = ref(null);
const { width } = useElementSize(el);
</script>

<template>
  <VNavigationDrawer
    floating
    :mobile-breakpoint="600"
    class="tw-pl-[1vw] tw-py-[2vh] leftSidebar"
    elevation="0"
    rail-width="68"
    :class="mdAndDown || layoutState.isRail ? 'mini-asidebar' : ''"
    expand-on-hover
    color="background"
    :rail="mdAndDown || layoutState.isRail"
  >
    <div
      ref="el"
      class="tw-w-full tw-h-full tw-rounded-[10px] tw-overflow-hidden bg-primary tw-py-4"
    >
      <Logo v-if="width > 63" />
      <Isotipo v-else />
      <PerfectScrollbar class="tw-mt-2 scrollnavbar tw-px-0">
        <v-list bg-color="primary">
          <template v-for="(item, i) in sidebarMenu">
            <!---Item Sub Header -->
            <NavGroup :item="item" v-if="item.header" :key="item.title" />
            <!---If Has Child -->
            <NavCollapse
              class="leftPadding"
              :item="item"
              :level="0"
              v-else-if="item.children"
            />
            <!---Single Item-->
            <NavItem :item="item" v-else class="leftPadding" />
            <!---End Single Item-->
          </template>
        </v-list>
      </PerfectScrollbar>
    </div>
  </VNavigationDrawer>
</template>

<style scoped></style>
