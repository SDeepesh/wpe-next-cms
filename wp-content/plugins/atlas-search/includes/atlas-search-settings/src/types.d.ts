import '@emotion/react';
import { Theme as CustomTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}

declare module '@mui/material/styles' {
  interface Theme {
    wpColors: {
      tiffany: string;
    };
  }

  interface ThemeOptions {
    wpColors?: {
      tiffany?: string;
    };
  }
}

export declare global {
  interface Window {
    wpApiSettings: {
      root: string;
      nonce: string;
    };
  }
}
