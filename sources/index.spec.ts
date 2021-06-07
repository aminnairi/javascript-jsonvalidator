/*!
 * Copyright 2021 Amin NAIRI
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import {validate, number, boolean, nil, string, array, object, property, oneOf, optionalProperty, index} from "./index";

describe("jsonvalidator", () => {
  it("should throw if validation fails for a number", () => {
    expect(() => validate(number, "123")).toThrow(new Error('expected "123" to be of type "number"'));
  });

  it("should throw if validation fails for a boolean", () => {
    expect(() => validate(boolean, "123")).toThrow(new Error('expected "123" to be of type "boolean"'));
  });

  it("should throw if validation fails for a null", () => {
    expect(() => validate(nil, "123")).toThrow(new Error('expected "123" to be of type "null"'));
  });

  it("should throw if validation fails for a string", () => {
    expect(() => validate(string, 123)).toThrow(new Error('expected 123 to be of type "string"'));
  });

  it("should throw if validation fails for an array", () => {
    expect(() => validate(array(number), 123)).toThrow(new Error('expected 123 to be of type "array"'));
  });

  it("should throw if validation fails for the values of an array", () => {
    expect(() => validate(array(number), ["123"])).toThrow(new Error('expected "123" to be of type "number", at index 0 of [\n  "123"\n]'));
  });

  it("should throw if validation fails for an object", () => {
    expect(() => validate(object([property("number", number)]), 123)).toThrow(new Error('expected 123 to be of type "object"'));
  });

  it("should throw if validation fails for missing properties of an object", () => {
    expect(() => validate(object([property("number", number)]), {})).toThrow(new Error('expected {} to have a property "number"'));
  });

  it("should throw if validation fails for the properties of an object", () => {
    expect(() => validate(object([property("number", number)]), {number: "123"})).toThrow(new Error('expected "123" to be of type "number", for property "number" of {\n  "number": "123"\n}'));
  });

  it("should throw if validation fails for an optional property of an object", () => {
    expect(() => validate(object([optionalProperty("number", number)]), {number: "123"})).toThrow(new Error('expected "123" to be of type "number", or nothing, for property "number" of {\n  "number": "123"\n}'));
  });

  it("should throw if validation fails if none of the one of types is validated", () => {
    expect(() => validate(oneOf([number, string]), null)).toThrow(new Error(`expected null to be of type "number", or expected null to be of type "string"`));
  });

  it("should throw if validation fails for an index of an array", () => {
    expect(() => validate(array([index(0, string)]), [])).toThrow(`expected undefined to be of type "string", at index 0 of []`);
  });

  it("should succeed if validating a number", () => {
    expect(validate(number, 123)).toEqual(123);
  });

  it("should succeed if validating a string", () => {
    expect(validate(string, "string")).toEqual("string");
  });

  it("should succeed if validating a null", () => {
    expect(validate(nil, null)).toEqual(null);
  });

  it("should succeed if validating a boolean", () => {
    expect(validate(boolean, false)).toEqual(false);
  });

  it("should succeed if validating an array", () => {
    expect(validate(array(number), [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("should succeed if validating an object", () => {
    expect(validate(object([property("number", number)]), {number: 123})).toEqual({number: 123});
  });

  it("should succeed if validating one of the wanted types", () => {
    expect(validate(oneOf([number, string]), 123)).toEqual(123);
  });

  it("should succeed if validating an optional property", () => {
    expect(validate(object([optionalProperty("id", number)]), {})).toEqual({});
  });

  it("should succeed if validating an array at specific indexes", () => {
    expect(validate(array([index(0, number), index(2, string)]), [123, null, "456"])).toEqual([123, null, "456"]);
  });
});
