import {validate, array, object, string, number, property} from "../sources";
import {getJson} from "./request";

const main = async () => {
  const json = await getJson("http://jsonplaceholder.typicode.com/users");

  const schema = array(object([
    property("id", number),
    property("name", string),
    property("username", string),
    property("email", string),
    property("phone", string),
    property("website", string),
    property("address", object([
      property("street", string),
      property("suite", string),
      property("city", string),
      property("zipcode", string),
      property("geo", object([
        property("lat", string),
        property("lng", string)
      ]))
    ])),
    property("company", object([
      property("name", string),
      property("catchPhrase", string),
      property("bs", string)
    ]))
  ]));

  const validatedJson = validate(schema, json);

  console.log("Validated JSON is the exact same data, just another reference, no copy or mutations.");
};

main().catch(error => {
  console.log("An error occurred, has the API changed?");
  console.error(error.message);
  process.exit(1);
});
