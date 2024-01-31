import { required, helpers } from "@vuelidate/validators";

const comboPoductRules = {
  name: {
    required: helpers.withMessage("this field is required", required),
  },
  unit_id: {
    required: helpers.withMessage("this field is required", required),
  },
  product_type_id: {
    required: helpers.withMessage("this field is required", required),
  },
  products: {
    required: helpers.withMessage("this field is required", required),
  },
  skus: {
    required: helpers.withMessage("this field is required", required),
  },
  price: {
    required: helpers.withMessage("this field is required", required),
  },
};

const useComboPoductRules = () => {
  return {
    comboPoductRules,
  };
};

export default useComboPoductRules;
