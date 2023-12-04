import { required, helpers } from '@vuelidate/validators';

const promotionRules = {
    product_id: {
        required
    },
    name: {
        required
    },
    type: {
        required
    }
};

const usePromotionRules = () => {
    return {
        promotionRules
    };
};

export default usePromotionRules;
