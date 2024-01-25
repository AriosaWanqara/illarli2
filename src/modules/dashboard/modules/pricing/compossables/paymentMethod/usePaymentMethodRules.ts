import { required, helpers } from "@vuelidate/validators";

const paymentMethodRules = {
  name: {
    required: helpers.withMessage("This field is required", required),
  },
  code_sri: {
    required: helpers.withMessage("This field is required", required),
  },
};

const usePaymentMethodRules = () => {
  return {
    paymentMethodRules,
  };
};

export default usePaymentMethodRules;
