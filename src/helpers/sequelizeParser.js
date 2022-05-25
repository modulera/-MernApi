import { ValidationError } from 'sequelize';

export default (err) => {
    const messages = {};
    if (err instanceof ValidationError) {
        err.errors.forEach((error) => {
            let message;
            switch (error.validatorKey) {
                case 'isEmail':
                    message = 'Please enter a valid email';
                    break;
                case 'isDate':
                    message = 'Please enter a valid date';
                    break;
                case 'len':
                    if (error.validatorArgs[0] === error.validatorArgs[1]) {
                        message = 'Use ' + error.validatorArgs[0] + ' characters';
                    } else {
                        message = 'Use between ' + error.validatorArgs[0] + ' and ' + error.validatorArgs[1] + ' characters';
                    }
                    break;
                case 'min':
                    message = 'Use a number greater or equal to ' + error.validatorArgs[0];
                    break;
                case 'max':
                    message = 'Use a number less or equal to ' + error.validatorArgs[0];
                    break;
                case 'isInt':
                    message = 'Please use an integer number';
                    break;
                case 'is_null':
                    message = `${error.message}`;
                    break;
                case 'not_unique':
                    message = {
                        text: error.message,
                        type: error.type,
                        path: error.path,
                        value: error.value,
                    };
                    error.path = error.path.replace("_UNIQUE", "");
            }
            messages[error.path] = message;
        });

        return messages;
    }

    return error;
}