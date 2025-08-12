import { screen } from '@testing-library/react';
import React from 'react';

/**
 * Common assertion for testing className merging
 */
export const testClassNameMerging = (
  element: HTMLElement,
  customClass: string,
  defaultClasses: string[]
) => {
  expect(element).toHaveClass(customClass);
  defaultClasses.forEach(cls => {
    expect(element).toHaveClass(cls);
  });
};

/**
 * Common assertion for testing ref forwarding
 */
export const testRefForwarding = (ref: React.RefObject<any>, ElementType: any) => {
  expect(ref.current).toBeInstanceOf(ElementType);
};

/**
 * Common assertion for testing prop forwarding
 */
export const testPropForwarding = (element: HTMLElement, propName: string, propValue: string) => {
  expect(element).toHaveAttribute(propName, propValue);
};

/**
 * Common assertion for testing variant styles
 */
export const testVariantStyles = (
  element: HTMLElement,
  variant: string,
  expectedClasses: string[]
) => {
  expectedClasses.forEach(cls => {
    expect(element).toHaveClass(cls);
  });
};

/**
 * Common assertion for testing component rendering
 */
export const testComponentRenders = (testId: string) => {
  const element = screen.getByTestId(testId);
  expect(element).toBeInTheDocument();
  return element;
};

/**
 * Common assertion for testing text content
 */
export const testTextContent = (element: HTMLElement, expectedText: string | RegExp) => {
  if (typeof expectedText === 'string') {
    expect(element).toHaveTextContent(expectedText);
  } else {
    expect(element.textContent).toMatch(expectedText);
  }
};

/**
 * Common assertion for testing disabled state
 */
export const testDisabledState = (element: HTMLElement, shouldBeDisabled: boolean) => {
  if (shouldBeDisabled) {
    expect(element).toBeDisabled();
    expect(element).toHaveClass('disabled:opacity-50');
  } else {
    expect(element).not.toBeDisabled();
  }
};

/**
 * Common assertion for testing ARIA attributes
 */
export const testAriaAttributes = (
  element: HTMLElement,
  attributes: Record<string, string>
) => {
  Object.entries(attributes).forEach(([attr, value]) => {
    expect(element).toHaveAttribute(attr, value);
  });
};

/**
 * Common assertion for testing component structure
 */
export const testComponentStructure = (
  container: HTMLElement,
  selectors: Record<string, number>
) => {
  Object.entries(selectors).forEach(([selector, expectedCount]) => {
    const elements = container.querySelectorAll(selector);
    expect(elements).toHaveLength(expectedCount);
  });
};

/**
 * Common assertion for testing font classes
 */
export const testFontClasses = (element: HTMLElement, fontClass: 'font-sans' | 'font-display' | 'font-accent') => {
  expect(element).toHaveClass(fontClass);
};

/**
 * Common assertion for testing responsive classes
 */
export const testResponsiveClasses = (
  element: HTMLElement,
  breakpoint: 'sm' | 'md' | 'lg' | 'xl',
  classes: string[]
) => {
  classes.forEach(cls => {
    const responsiveClass = `${breakpoint}:${cls}`;
    expect(element.className).toContain(responsiveClass);
  });
};

/**
 * Batch test multiple elements for the same condition
 */
export const batchTestElements = (
  elements: HTMLElement[],
  testFn: (element: HTMLElement) => void
) => {
  elements.forEach(testFn);
};

/**
 * Test component children rendering
 */
export const testChildrenRendering = (container: HTMLElement, expectedChildCount: number) => {
  expect(container.children).toHaveLength(expectedChildCount);
};

/**
 * Test link navigation
 */
export const testLinkNavigation = (linkElement: HTMLElement, expectedHref: string) => {
  expect(linkElement).toHaveAttribute('href', expectedHref);
};

/**
 * Test button interaction
 */
export const testButtonInteraction = (
  button: HTMLElement,
  onClick: jest.Mock,
  expectedCalls: number = 1
) => {
  button.click();
  expect(onClick).toHaveBeenCalledTimes(expectedCalls);
};