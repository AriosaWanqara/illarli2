import { required, helpers } from "@vuelidate/validators";

const categoryRules = {
  name: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
};

const useCategoryRules = () => {
  return {
    categoryRules,
  };
};

export default useCategoryRules;
