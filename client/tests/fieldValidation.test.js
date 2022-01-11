import { validateEmail } from "../src/utils/fieldValidation.js";

// test valid email addresses:
test.each`
  testData                                  | expected
  ${"example@example.com"}                  | ${true}
  ${"example_example@example.com"}          | ${true}
  ${"example.example@example.com"}          | ${true}
  ${"example.example+example@example.com"}  | ${true}
`('validateEmail($testData), expected return value: $expected.', ({ testData, expected }) => {
    expect(validateEmail(testData)).toBe(expected);
});

// test invalid email addresses:
test.each`
  testData                      | expected
  ${"example@"}                 | ${false}
  ${"example.example+example@"} | ${false}
  ${"@"}                        | ${false}
  ${"@example"}                 | ${false}
`('validateEmail($testData), expected return value: $expected.', ({ testData, expected }) => {
    expect(validateEmail(testData)).toBe(expected);
});
