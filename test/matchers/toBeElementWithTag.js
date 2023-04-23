import { matcherHint, printExpected } from "jest-matcher-utils";

export const toBeElementWithTag = (element, expectedTagName) => {
  const pass = element?.tagName === expectedTagName.toUpperCase();

  const sourceHint = matcherHint(
    "toBeElementWithTag",
    "element",
    printExpected(expectedTagName),
    { isNot: pass }
  );

  const hintText = !element
    ? "element was not found"
    : `<${element.tagName.toLowerCase()}>`;
  const actualHint = `Actual: ${hintText}`;

  const message = () => [sourceHint, actualHint].join("\n\n");

  return { pass, message };
};
