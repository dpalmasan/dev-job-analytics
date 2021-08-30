import { techMapping } from "./tech-mapping";

test("Tech mapping", () => {
  expect(techMapping.get("angular")).toEqual("Angular.js");
  expect(techMapping.get("php")).toEqual("PHP");
  expect(techMapping.get("Angular.js")).toEqual("Angular.js");
});