import { required, helpers } from "@vuelidate/validators";

const promotionRules = {
  name: {
    required,
  },
  type: {
    required,
  },
};

const usePromotionRules = () => {
  return {
    promotionRules,
  };
};

export default usePromotionRules;
