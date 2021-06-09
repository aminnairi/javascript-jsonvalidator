export interface StringSchema {
  type: "string";
}

export interface BooleanSchema {
  type: "boolean";
}

export interface NumberSchema {
  type: "number";
}

export interface NullSchema {
  type: "null";
}

export interface ArraySchema {
  type: "array";
  values: Schema | Array<IndexSchema>;
}

export interface IndexSchema {
  type: "index";
  index: number;
  schema: Schema;
}

export interface PropertySchema {
  type: "property";
  key: string;
  schema: Schema;
}

export interface OptionalPropertySchema {
  type: "optionalProperty";
  key: string;
  schema: Schema;
}

export interface ObjectSchema {
  type: "object";
  properties: Array<PropertySchema | OptionalPropertySchema>;
}

export interface OneOfSchema {
  type: "oneOf";
  schemas: Array<Schema>;
}

export type Schema
  = StringSchema
  | NumberSchema
  | BooleanSchema
  | NullSchema
  | ArraySchema
  | ObjectSchema
  | OneOfSchema

export interface SucceededValidation {
  error: false
}

export interface FailedValidation {
  error: string;
}

export type Validation = SucceededValidation | FailedValidation;

export const string: StringSchema = {
  type: "string"
};

export const number: NumberSchema = {
  type: "number"
};

export const boolean: BooleanSchema = {
  type: "boolean"
};

export const nil: NullSchema = {
  type: "null"
};

export const array = (schema: Schema | Array<IndexSchema>): ArraySchema => {
  return {
    type: "array",
    values: schema
  };
};

export const index = (i: number, schema: Schema): IndexSchema => {
  return {
    type: "index",
    index: i,
    schema
  };
};

export const object = (properties: Array<PropertySchema | OptionalPropertySchema>): ObjectSchema => {
  return {
    type: "object",
    properties
  };
};

export const property = (key: string, schema: Schema): PropertySchema => {
  return {
    type: "property",
    key,
    schema
  };
};

export const optionalProperty = (key: string, schema: Schema): OptionalPropertySchema => {
  return {
    type: "optionalProperty",
    key,
    schema
  };
};

export const oneOf = (schemas: Array<Schema>): OneOfSchema => {
  return {
    type: "oneOf",
    schemas
  };
};

export const validate = (schema: Schema, input: unknown): Validation => {
  const getType = (something: unknown): string => {
    return Object.prototype.toString.call(something).replace(/\[object\s+(\w+)]/, "$1").toLowerCase();
  };

  const toString = (something: unknown): string => {
    return JSON.stringify(something, null, 2);
  };

  const inputType: string = getType(input);
  const inputToString: string = toString(input);
  const schemaTypeToString: string = toString(schema.type);
  const initialValidation: Validation = {error: false};

  if (schema.type === "oneOf") {
    const errors: Array<string> = schema.schemas.reduce((previousErrors: Array<string>, oneOfSchema: Schema): Array<string> => {
      const newValidation: Validation = validate(oneOfSchema, input);

      if (newValidation.error) {
        return [...previousErrors, newValidation.error];
      }

      return previousErrors;
    }, []);

    if (errors.length === schema.schemas.length) {
      return {error: errors.join(", or ")};
    }

    return {error: false};
  }

  if (schema.type === "object") {
    if (inputType !== schema.type) {
      return {error: `expected ${inputToString} to be of type ${schemaTypeToString}`};
    }

    const object = input as unknown as {[key: string]: unknown};

    return schema.properties.reduce((previousValidation: Validation, {type: propertySchemaType, key: propertyKey, schema: propertySchema}, propertySchemaIndex: number): Validation => {
      if (propertySchemaIndex !== 0 && previousValidation.error) {
        return previousValidation;
      }

      const propertyKeyToString: string = toString(propertyKey);

      if (!Object.prototype.hasOwnProperty.call(object, propertyKey)) {
        if (propertySchemaType === "optionalProperty") {
          return previousValidation;
        }

        return {error: `expected ${inputToString} to have a property ${propertyKeyToString}`};
      }

      const newValidation: Validation = validate(propertySchema, object[propertyKey]);

      if (newValidation.error) {
        if (propertySchemaType === "optionalProperty") {
          return {error: `${newValidation.error}, or nothing, for property ${propertyKeyToString} of ${inputToString}`};
        }

        return {error: `${newValidation.error}, for property ${propertyKeyToString} of ${inputToString}`};
      }

      return previousValidation;
    }, initialValidation);
  }

  if (schema.type === "array") {
    if (inputType !== schema.type) {
      return {error: `expected ${inputToString} to be of type ${schemaTypeToString}`};
    }

    const array = input as unknown as Array<unknown>;

    if (Array.isArray(schema.values)) {
      return schema.values.reduce((previousValidation: Validation, {index, schema: indexSchema}, indexSchemaIndex: number): Validation => {
        if (indexSchemaIndex !== 0 && previousValidation.error) {
          return previousValidation;
        }

        const newValidation: Validation = validate(indexSchema, array[index]);

        if (newValidation.error) {
          return {error: `${newValidation.error}, at index ${index} of ${inputToString}`};
        }

        return previousValidation;
      }, initialValidation);
    }

    return array.reduce((previousValidation: Validation, item: unknown, itemIndex: number): Validation => {
      if (previousValidation.error) {
        return previousValidation;
      }

      const newValidation: Validation = validate(schema.values as Schema, item);

      if (newValidation.error) {
        return {error: `${newValidation.error}, at index ${itemIndex} of ${inputToString}`};
      }

      return previousValidation;
    }, initialValidation) as Validation;
  }

  if (inputType !== schema.type) {
    return {error: `expected ${inputToString} to be of type ${schemaTypeToString}`};
  }

  return {error: false};
};
