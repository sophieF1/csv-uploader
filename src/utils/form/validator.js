/**
 * @param values The object to be validated
 * @param schema A validation schema
 * @returns An object with the keys being the field names and the values being the error messages 
 */

export function validate(values, schema) {
    const errors = {};
    
    Object.entries(schema).forEach(([key, validator]) => {
        const result = validator(values);

        if(result){
            if(isObject(result) && Object.keys(result).length === 0) return;
            errors[key] = result;
        }
    });
    return errors;
};