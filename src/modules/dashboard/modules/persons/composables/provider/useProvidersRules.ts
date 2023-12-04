import { required, helpers } from '@vuelidate/validators';

const providersRules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required)
    },
    gender: {
        required: helpers.withMessage('El genero es requerido', required)
    },
    phones: {
        required: helpers.withMessage('El telefono es requerido', required)
    },
    emails: {
        required: helpers.withMessage('El correo es requerido', required)
    },
    civil_status: {
        required: helpers.withMessage('El estado civil es requerido', required)
    },
    address: {
        required: helpers.withMessage('La direccion es requerida', required)
    },
    identity: {
        required: helpers.withMessage('La identificacion es requerida', required)
    }
};

const useProvidersRules = () => {
    return {
        providersRules
    };
};

export default useProvidersRules;
