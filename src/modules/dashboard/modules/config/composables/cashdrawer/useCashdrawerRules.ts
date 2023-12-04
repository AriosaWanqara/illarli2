import { required, helpers } from '@vuelidate/validators';

const cashdrawerRules = {
    code: {
        required: helpers.withMessage('El codigo es requerido', required)
    },
    observation: {
        required: helpers.withMessage('La observacion es requerida', required)
    },
    document_type: {
        required: helpers.withMessage('El tipo de documento es requerido', required)
    },
    subsidiary_id: {
        required: helpers.withMessage('La sucursal es requerida', required)
    }
};

const useCashdrawerRules = () => {
    return {
        cashdrawerRules
    };
};

export default useCashdrawerRules;
