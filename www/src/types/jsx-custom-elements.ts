// Global JSX typing for custom elements used in this project
// Ensures TS accepts <ion-icon ... /> in TSX files.
import type React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Minimal attribute support; expand if needed
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
        src?: string;
        icon?: string;
        size?: string;
        color?: string;
      };
    }
  }
}

export {};

