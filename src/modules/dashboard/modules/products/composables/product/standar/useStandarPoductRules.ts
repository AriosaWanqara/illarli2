import { required, helpers } from '@vuelidate/validators';

const standarPoductRules = {
    name: {
        required: helpers.withMessage('this field is required', required)
    },
    sku: {
        required: helpers.withMessage('this field is required', required)
    },
    unit_id: {
        required: helpers.withMessage('this field is required', required)
    },
    product_type_id: {
        required: helpers.withMessage('this field is required', required)
    },
    price: {
        required: helpers.withMessage('this field is required', required)
    }
};

const useStandarPoductRules = () => {
    return {
        standarPoductRules
    };
};

export default useStandarPoductRules;
