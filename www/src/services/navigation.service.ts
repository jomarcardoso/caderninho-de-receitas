const STORAGE_KEY = 'app_nav_stack';
const EVENT_NAME = 'navchange';

/**
 * Service singleton com estado persistente em localStorage
 * e emissão de eventos globais a cada alteração.
 */
class NavigationServiceClass {
  private getStackInternal(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveStack(stack: string[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
      // 🔔 emite evento para avisar todos os listeners
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: stack }));
    } catch (err) {
      console.warn('NavigationService: failed to save stack', err);
    }
  }

  getStack() {
    return this.getStackInternal();
  }

  push(path: string) {
    const stack = this.getStackInternal();
    stack.push(path);
    this.saveStack(stack);
  }

  pop(): string | null {
    const stack = this.getStackInternal();
    stack.pop();
    this.saveStack(stack);
    return stack.at(-1) ?? null;
  }

  reset(path: string = '/') {
    this.saveStack([path]);
  }

  /**
   * Listener para mudanças externas na navegação.
   */
  onChange(callback: (stack: string[]) => void) {
    if (typeof window === 'undefined') return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string[]>).detail;
      callback(detail);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }
}

export const NavigationService = new NavigationServiceClass();
