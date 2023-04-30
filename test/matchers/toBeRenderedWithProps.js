import { equals } from "@jest/expect-utils";
import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

const toBeRenderedWithSpecificProps = (
  mockedComponent,
  expectedProps,
  mockedCall,
  matcherName
) => {
  const actualProps = mockedCall ? mockedCall[0] : null;
  const pass = equals(actualProps, expectedProps);

  const sourceHint = () =>
    matcherHint(matcherName, "mockedComponent", printExpected(expectedProps), {
      isNot: pass,
    });

  const actualHint = () => {
    if (!mockedComponent || !mockedComponent.mock) {
      return `mockedComponent is not a mock`;
    }
    if (!mockedCall) {
      return `Mocked component was never rendered`;
    }
    if (!pass) {
      return `Rendered with props: ${printReceived(actualProps)}`;
    }
  };

  const message = () => [sourceHint(), actualHint()].join("\n\n");

  return { pass, message };
};

export const toBeRenderedWithProps = (mockedComponent, expectedProps) => {
  const lastCall = mockedComponent?.mock?.calls.at(-1);

  return toBeRenderedWithSpecificProps(
    mockedComponent,
    expectedProps,
    lastCall,
    "toBeRenderedWithProps"
  );
};

export const toBeRenderedFirstWithProps = (mockedComponent, expectedProps) => {
  const firstCall = mockedComponent?.mock?.calls[0];

  return toBeRenderedWithSpecificProps(
    mockedComponent,
    expectedProps,
    firstCall,
    "toBeRenderedFirstWithProps"
  );
};
