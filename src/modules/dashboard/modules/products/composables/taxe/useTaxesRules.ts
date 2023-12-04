import { required, helpers } from '@vuelidate/validators';

const taxesRules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required)
    }
};

const useTaxesRules = () => {
    return {
        taxesRules
    };
};

export default useTaxesRules;
