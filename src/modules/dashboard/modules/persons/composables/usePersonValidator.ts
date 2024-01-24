import useVuelidate from "@vuelidate/core";
import useProvidersRules from "./provider/useProvidersRules";
import type { Provider } from "../models/Provider";
import { ref } from "vue";

const { providersRules } = useProvidersRules();
const person = ref<Provider>({} as Provider);
const usePersonValidator = () => {
  const personValidator = useVuelidate(providersRules, person);

  return {
    personValidator,
    person,
  };
};

export default usePersonValidator;
