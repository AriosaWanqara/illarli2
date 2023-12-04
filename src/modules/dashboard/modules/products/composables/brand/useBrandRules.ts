import { helpers, required } from '@vuelidate/validators';

const brandRules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required)
    }
};

const useBrandRules = () => {
    return {
        brandRules
    };
};

export default useBrandRules;
