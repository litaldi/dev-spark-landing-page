
// Custom fireEvent implementation for testing
export const fireEvent = {
  mouseEnter: (element: Element) => {
    const event = new MouseEvent('mouseenter', { bubbles: true });
    element.dispatchEvent(event);
  },
  
  mouseOver: (element: Element) => {
    const event = new MouseEvent('mouseover', { bubbles: true });
    element.dispatchEvent(event);
  },
  
  focus: (element: Element) => {
    if (element instanceof HTMLElement) {
      element.focus();
    }
  },
  
  click: (element: Element) => {
    const event = new MouseEvent('click', { bubbles: true });
    element.dispatchEvent(event);
  },
  
  change: (element: Element, eventOptions?: { target: { value: string | number } }) => {
    const event = new Event('change', { bubbles: true });
    if (eventOptions?.target && 'value' in element) {
      (element as any).value = eventOptions.target.value;
    }
    element.dispatchEvent(event);
  },
  
  submit: (element: Element) => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
  },
  
  keyDown: (element: Element, eventOptions?: { key: string; code?: string; keyCode?: number }) => {
    const event = new KeyboardEvent('keydown', {
      key: eventOptions?.key || '',
      code: eventOptions?.code || '',
      keyCode: eventOptions?.keyCode || 0,
      bubbles: true
    });
    element.dispatchEvent(event);
  },
  
  keyUp: (element: Element, eventOptions?: { key: string; code?: string; keyCode?: number }) => {
    const event = new KeyboardEvent('keyup', {
      key: eventOptions?.key || '',
      code: eventOptions?.code || '',
      keyCode: eventOptions?.keyCode || 0,
      bubbles: true
    });
    element.dispatchEvent(event);
  },
  
  blur: (element: Element) => {
    if (element instanceof HTMLElement) {
      element.blur();
    }
  }
};
