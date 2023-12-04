import { required, helpers } from '@vuelidate/validators';

const clientRules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required)
    }
};

const useClientRules = () => {
    return {
        clientRules
    };
};

export default useClientRules;
