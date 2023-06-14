// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PrivacyLevelValues = ["public", "private"] as const;
const PrivacyLevelSchema = z.enum(PrivacyLevelValues);
type PrivacyLevel = z.infer<typeof PrivacyLevelSchema>;

const Form = z.object({
  repoName: z.string(),
  privacyLevel: PrivacyLevelSchema,
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    })
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel
  ).toEqual("public");
});
