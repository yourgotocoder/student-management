import { textSanitizer } from "../helpers/text-sanitizer";

test("' This text/word ' should give This text_word", () => {
  expect(textSanitizer("  This     text/word ")).toBe("THIS TEXT_WORD");
});
