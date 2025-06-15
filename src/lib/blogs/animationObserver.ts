// lib/observers/SharedIntersectionObserver.ts
class SharedIntersectionObserver {
  private static instance: SharedIntersectionObserver;
  private observer: IntersectionObserver;
  private callbacks: Map<Element, () => void> = new Map();

  private constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback();
              this.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
      }
    );
  }

  static getInstance(): SharedIntersectionObserver {
    if (!SharedIntersectionObserver.instance) {
      SharedIntersectionObserver.instance = new SharedIntersectionObserver();
    }
    return SharedIntersectionObserver.instance;
  }

  observe(element: Element, callback: () => void): void {
    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observer.unobserve(element);
  }

  disconnect(): void {
    this.observer.disconnect();
    this.callbacks.clear();
  }
}

export const sharedObserver = SharedIntersectionObserver.getInstance();