
// Custom screen implementation for testing
export const createScreen = () => ({
  getByRole: (role: string, options?: any) => {
    const elements = Array.from(document.querySelectorAll(`[role="${role}"]`)) as HTMLElement[];
    if (options?.name) {
      const element = elements.find(el => 
        el.textContent?.includes(options.name) || 
        el.getAttribute('aria-label')?.includes(options.name)
      );
      if (!element) throw new Error(`Unable to find role: ${role} with name: ${options.name}`);
      return element;
    }
    const element = elements[0];
    if (!element) throw new Error(`Unable to find role: ${role}`);
    return element;
  },
  
  getAllByRole: (role: string, options?: any) => {
    const elements = Array.from(document.querySelectorAll(`[role="${role}"]`)) as HTMLElement[];
    if (elements.length === 0) {
      throw new Error(`Unable to find role: ${role}`);
    }
    return elements;
  },
  
  queryByRole: (role: string, options?: any) => {
    try {
      return createScreen().getByRole(role, options);
    } catch {
      return null;
    }
  },
  
  findByRole: async (role: string, options?: any) => {
    return new Promise<HTMLElement>((resolve, reject) => {
      const attempt = () => {
        try {
          resolve(createScreen().getByRole(role, options));
        } catch {
          setTimeout(attempt, 10);
        }
      };
      attempt();
      setTimeout(() => reject(new Error(`Unable to find role: ${role}`)), 1000);
    });
  },

  getByText: (text: string | RegExp) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    
    let node;
    while (node = walker.nextNode()) {
      const content = node.textContent || '';
      if (typeof text === 'string' ? content.includes(text) : text.test(content)) {
        return node.parentElement as HTMLElement;
      }
    }
    throw new Error(`Unable to find text: ${text}`);
  },
  
  getAllByText: (text: string | RegExp) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    
    const results: HTMLElement[] = [];
    let node;
    while (node = walker.nextNode()) {
      const content = node.textContent || '';
      if (typeof text === 'string' ? content.includes(text) : text.test(content)) {
        const element = node.parentElement as HTMLElement;
        if (element && !results.includes(element)) {
          results.push(element);
        }
      }
    }
    if (results.length === 0) {
      throw new Error(`Unable to find text: ${text}`);
    }
    return results;
  },
  
  queryByText: (text: string | RegExp) => {
    try {
      return createScreen().getByText(text);
    } catch {
      return null;
    }
  },
  
  findByText: async (text: string | RegExp) => {
    return new Promise<HTMLElement>((resolve, reject) => {
      const attempt = () => {
        try {
          resolve(createScreen().getByText(text));
        } catch {
          setTimeout(attempt, 10);
        }
      };
      attempt();
      setTimeout(() => reject(new Error(`Unable to find text: ${text}`)), 1000);
    });
  },

  getByLabelText: (text: string | RegExp) => {
    const labels = Array.from(document.querySelectorAll('label'));
    for (const label of labels) {
      const content = label.textContent || '';
      if (typeof text === 'string' ? content.includes(text) : text.test(content)) {
        const forAttr = label.getAttribute('for');
        if (forAttr) {
          return document.getElementById(forAttr) as HTMLElement;
        }
        return label.querySelector('input, textarea, select') as HTMLElement;
      }
    }
    throw new Error(`Unable to find label: ${text}`);
  },
  
  findByLabelText: async (text: string | RegExp) => {
    return new Promise<HTMLElement>((resolve, reject) => {
      const attempt = () => {
        try {
          resolve(createScreen().getByLabelText(text));
        } catch {
          setTimeout(attempt, 10);
        }
      };
      attempt();
      setTimeout(() => reject(new Error(`Unable to find label: ${text}`)), 1000);
    });
  },

  getByTestId: (testId: string) => {
    const element = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
    if (!element) throw new Error(`Unable to find testId: ${testId}`);
    return element;
  },
  
  queryByTestId: (testId: string) => document.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null,
  
  getByPlaceholderText: (text: string | RegExp) => {
    const elements = Array.from(document.querySelectorAll('input, textarea'));
    for (const element of elements) {
      const placeholder = element.getAttribute('placeholder') || '';
      if (typeof text === 'string' ? placeholder.includes(text) : text.test(placeholder)) {
        return element as HTMLElement;
      }
    }
    throw new Error(`Unable to find placeholder text: ${text}`);
  },
  
  getByDisplayValue: (value: string | RegExp) => {
    const elements = Array.from(document.querySelectorAll('input, textarea, select'));
    for (const element of elements) {
      const elementValue = (element as HTMLInputElement).value || '';
      if (typeof value === 'string' ? elementValue === value : value.test(elementValue)) {
        return element as HTMLElement;
      }
    }
    throw new Error(`Unable to find display value: ${value}`);
  }
});

export const screen = createScreen();
