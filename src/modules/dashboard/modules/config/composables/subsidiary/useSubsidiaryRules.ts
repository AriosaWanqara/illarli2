import { required, helpers } from '@vuelidate/validators';

const subsidiaryRules = {
    businessname: {
        required: helpers.withMessage('El nombre es requerido', required)
    },
    phone: {
        required: helpers.withMessage('El telefono es requerido', required)
    },
    address: {
        required: helpers.withMessage('La direccion es requerida', required)
    }
};

const useSubsidiaryRules = () => {
    return {
        subsidiaryRules
    };
};

export default useSubsidiaryRules;
