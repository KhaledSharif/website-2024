import '@testing-library/jest-dom';

// Common test setup and utilities

/**
 * Create a mock ref object
 */
export const createMockRef = <T extends HTMLElement>(): React.RefObject<T> => {
  const element = document.createElement('div') as unknown as T;
  return { current: element };
};

/**
 * Setup common DOM elements with getBoundingClientRect
 */
export const setupMockDOMElement = (
  tag: string = 'div',
  rect: Partial<DOMRect> = {}
): HTMLElement => {
  const element = document.createElement(tag);
  const defaultRect = {
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    right: 100,
    bottom: 100,
    x: 0,
    y: 0,
    toJSON: jest.fn(),
  };
  
  element.getBoundingClientRect = jest.fn(() => ({
    ...defaultRect,
    ...rect,
  }));
  
  return element;
};

/**
 * Setup mock intersection observer
 */
export const setupIntersectionObserver = () => {
  global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: () => [],
  }));
};

/**
 * Setup mock mutation observer
 */
export const setupMutationObserver = () => {
  global.MutationObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: () => [],
  }));
};

/**
 * Setup localStorage mock
 */
export const setupLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    length: 0,
  };
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
  
  return localStorageMock;
};

/**
 * Setup matchMedia mock
 */
export const setupMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

/**
 * Wait for async updates
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Create mock event
 */
export const createMockEvent = (type: string, options: any = {}) => {
  const event = new Event(type, { bubbles: true, cancelable: true, ...options });
  Object.assign(event, options);
  return event;
};

/**
 * Mock console methods for cleaner test output
 */
export const mockConsole = () => {
  const originalConsole = { ...console };
  
  beforeAll(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
    console.log = jest.fn();
  });
  
  afterAll(() => {
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.log = originalConsole.log;
  });
  
  return {
    error: console.error as jest.Mock,
    warn: console.warn as jest.Mock,
    log: console.log as jest.Mock,
  };
};