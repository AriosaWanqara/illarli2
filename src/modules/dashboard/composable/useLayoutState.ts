import { ref } from "vue";

interface layoutConfig {
  isRail: boolean;
  isMobileNavDrawerShowing: boolean;
}

const layoutState = ref<layoutConfig>({
  isRail: false,
  isMobileNavDrawerShowing: false,
});

const useLayoutState = () => {
  return {
    layoutState,
  };
};

export default useLayoutState;
