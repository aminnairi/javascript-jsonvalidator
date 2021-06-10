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
  it("should return an error if validation fails for a number", () => {
    expect.assertions(1);
    expect(validate(number, "123")).toStrictEqual({error: "expected \"123\" to be of type \"number\""});
  });

  it("should return an error if validation fails for a boolean", () => {
    expect.assertions(1);
    expect(validate(boolean, "123")).toStrictEqual({error: "expected \"123\" to be of type \"boolean\""});
  });

  it("should return an error if validation fails for a null", () => {
    expect.assertions(1);
    expect(validate(nil, "123")).toStrictEqual({error: "expected \"123\" to be of type \"null\""});
  });

  it("should return an error if validation fails for a string", () => {
    expect.assertions(1);
    expect(validate(string, 123)).toStrictEqual({error: "expected 123 to be of type \"string\""});
  });

  it("should return an error if validation fails for an array", () => {
    expect.assertions(1);
    expect(validate(array(number), 123)).toStrictEqual({error: "expected 123 to be of type \"array\""});
  });

  it("should return an error if validation fails for the values of an array", () => {
    expect.assertions(1);
    expect(validate(array(number), ["123"])).toStrictEqual({error: "expected \"123\" to be of type \"number\", at index 0 of [\n  \"123\"\n]"});
  });

  it("should return an error if validation fails for an object", () => {
    expect.assertions(1);
    expect(validate(object([property("number", number)]), 123)).toStrictEqual({error: "expected 123 to be of type \"object\""});
  });

  it("should return an error if validation fails for missing properties of an object", () => {
    expect.assertions(1);
    expect(validate(object([property("number", number)]), {})).toStrictEqual({error: "expected {} to have a property \"number\""});
  });

  it("should return an error if validation fails for the properties of an object", () => {
    expect.assertions(1);
    expect(validate(object([property("number", number)]), {number: "123"})).toStrictEqual({error: "expected \"123\" to be of type \"number\", for property \"number\" of {\n  \"number\": \"123\"\n}"});
  });

  it("should return an error if validation fails for an optional property of an object", () => {
    expect.assertions(1);
    expect(validate(object([optionalProperty("number", number)]), {number: "123"})).toStrictEqual({error: "expected \"123\" to be of type \"number\", or nothing, for property \"number\" of {\n  \"number\": \"123\"\n}"});
  });

  it("should return an error when validating multiple properties in an object", () => {
    expect.assertions(1);
    expect(validate(object([property("x", number), property("y", number)]), {x: "1", y: 2})).toStrictEqual({error: "expected \"1\" to be of type \"number\", for property \"x\" of {\n  \"x\": \"1\",\n  \"y\": 2\n}"});
  });

  it("should return an error when validating multiple index in an array", () => {
    expect.assertions(1);
    expect(validate(array([index(0, string), index(1, number)]), [1, 2])).toStrictEqual({error: "expected 1 to be of type \"string\", at index 0 of [\n  1,\n  2\n]"});
  });

  it("should return an error when validating multiple elements in an array", () => {
    expect.assertions(1);
    expect(validate(array(number), ["1", 2])).toStrictEqual({error: "expected \"1\" to be of type \"number\", at index 0 of [\n  \"1\",\n  2\n]"});
  });

  it("should return an error if validation fails if none of the one of types is validated", () => {
    expect.assertions(1);
    expect(validate(oneOf([number, string]), null)).toStrictEqual({error: "expected null to be of type \"number\", or expected null to be of type \"string\""});
  });

  it("should return an error if validation fails for an index of an array", () => {
    expect.assertions(1);
    expect(validate(array([index(0, string)]), [])).toStrictEqual({error: "expected undefined to be of type \"string\", at index 0 of []"});
  });

  it("should succeed if validating a number", () => {
    expect.assertions(1);
    expect(validate(number, 123)).toStrictEqual({error: false});
  });

  it("should succeed if validating a string", () => {
    expect.assertions(1);
    expect(validate(string, "string")).toStrictEqual({error: false});
  });

  it("should succeed if validating a null", () => {
    expect.assertions(1);
    expect(validate(nil, null)).toStrictEqual({error: false});
  });

  it("should succeed if validating a boolean", () => {
    expect.assertions(1);
    expect(validate(boolean, false)).toStrictEqual({error: false});
  });

  it("should succeed if validating an array", () => {
    expect.assertions(1);
    expect(validate(array(number), [1, 2, 3])).toStrictEqual({error: false});
  });

  it("should succeed if validating an object", () => {
    expect.assertions(1);
    expect(validate(object([property("number", number)]), {number: 123})).toStrictEqual({error: false});
  });

  it("should succeed if validating one of the wanted types", () => {
    expect.assertions(1);
    expect(validate(oneOf([number, string]), 123)).toStrictEqual({error: false});
  });

  it("should succeed if validating an optional property", () => {
    expect.assertions(1);
    expect(validate(object([optionalProperty("id", number)]), {})).toStrictEqual({error: false});
  });

  it("should succeed if validating an array at specific indexes", () => {
    expect.assertions(1);
    expect(validate(array([index(0, number), index(2, string)]), [123, null, "456"])).toStrictEqual({error: false});
  });
});
