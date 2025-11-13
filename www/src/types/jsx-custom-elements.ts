// Global JSX typing for ion-icon custom element
import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
        ios?: string;
        md?: string;
        size?: string;
        color?: string;
        class?: string;
      };
    }
  }
}

export {};

