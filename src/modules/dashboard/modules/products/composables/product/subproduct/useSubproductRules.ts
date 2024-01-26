import { required, helpers } from "@vuelidate/validators";

const subproductRules = {
  name: {
    required: helpers.withMessage("this field is required", required),
  },
  unit_id: {
    required: helpers.withMessage("this field is required", required),
  },
  product_type_id: {
    required: helpers.withMessage("this field is required", required),
  },
  amount: {
    required: helpers.withMessage("this field is required", required),
  },
  price: {
    required: helpers.withMessage("this field is required", required),
  },
  sku: {
    required: helpers.withMessage("this field is required", required),
  },
};

const useSubproductRules = () => {
  return {
    subproductRules,
  };
};

export default useSubproductRules;
