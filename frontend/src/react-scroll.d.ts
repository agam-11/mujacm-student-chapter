declare module 'react-scroll' {
  import { FC, ReactNode, ComponentType } from 'react';

  interface LinkProps {
    to: string;
    spy?: boolean;
    smooth?: boolean | string;
    offset?: number;
    duration?: number;
    onClick?: () => void;
    className?: string;
    activeClass?: string;
    style?: React.CSSProperties;
    children: ReactNode;
  }

  interface ElementProps {
    name: string;
    children: ReactNode;
  }

  interface ScrollerOptions {
    duration?: number;
    smooth?: boolean | string;
    offset?: number;
  }

  export const Link: FC<LinkProps>;
  export const Element: FC<ElementProps>;

  export const scroller: {
    scrollTo(
      target: string | HTMLElement,
      options?: ScrollerOptions
    ): void;
  };
}
