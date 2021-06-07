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

export const validate = <Input>(schema: Schema, input: Input): Input => {
  const getType = (something: unknown): string => {
    return Object.prototype.toString.call(something).replace("[object ", "").replace("]", "").toLowerCase();
  };

  const toString = (something: unknown): string => {
    return JSON.stringify(something, null, 2);
  };

  const inputType = getType(input);
  const inputToString = toString(input);
  const inputTypeToString = toString(inputType);
  const schemaTypeToString = toString(schema.type);

  if (schema.type === "oneOf") {
    const errors = schema.schemas.map(oneOfSchema => {
      try {
        validate(oneOfSchema, input);
        return null;
      } catch (error) {
        return error;
      }
    }).filter(error => error !== null);

    if (errors.length === schema.schemas.length) {
      throw new Error(errors.map(error => error.message).join(", or "));
    }

    return input;
  }

  if (schema.type === "object") {
    if (inputType !== schema.type) {
      throw new Error(`expected ${inputToString} to be of type ${schemaTypeToString}`);
    }

    const object = input as unknown as {[key: string]: unknown};

    schema.properties.forEach(({type: propertySchemaType, key: propertyKey, schema: propertySchema}): void => {
      const propertyKeyToString = toString(propertyKey);

      if (!Object.prototype.hasOwnProperty.call(object, propertyKey)) {
        if (propertySchemaType === "optionalProperty") {
          return;
        }

        throw new Error(`expected ${inputToString} to have a property ${propertyKeyToString}`);
      }

      try {
        validate(propertySchema, object[propertyKey]);
      } catch (error) {
        if (propertySchemaType === "optionalProperty") {
          throw new Error(`${error.message}, or nothing, for property ${propertyKeyToString} of ${inputToString}`);
        }

        throw new Error(`${error.message}, for property ${propertyKeyToString} of ${inputToString}`);
      }
    });

    return input;
  }

  if (schema.type === "array") {
    if (inputType !== schema.type) {
      throw new Error(`expected ${inputToString} to be of type ${schemaTypeToString}`);
    }

    const array = input as unknown as Array<unknown>;

    if (Array.isArray(schema.values)) {
      schema.values.forEach(({index, schema: indexSchema}) => {
        try {
          validate(indexSchema, array[index]);
        } catch (error) {
          throw new Error(`${error.message}, at index ${index} of ${inputToString}`);
        }
      });

      return input;
    }

    array.forEach((item: unknown, itemIndex: number): void => {
      const itemIndexToString = toString(itemIndex);

      try {
        validate(schema.values as Schema, item)
      } catch (error) {
        throw new Error(`${error.message}, at index ${itemIndexToString} of ${inputToString}`);
      }
    });

    return input;
  }

  if (inputType !== schema.type) {
    throw new Error(`expected ${inputToString} to be of type ${schemaTypeToString}`);
  }

  return input;
};
