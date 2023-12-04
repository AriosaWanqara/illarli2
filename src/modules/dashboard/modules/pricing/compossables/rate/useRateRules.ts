import { helpers, required } from '@vuelidate/validators';

const rateRules = {
    name: {
        required
    },
    operation: {
        required
    },
    type: {
        required
    },
    value: {
        required
    }
};

const useRateRules = () => {
    return {
        rateRules
    };
};

export default useRateRules;
