/// <reference types="react-scripts" />

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: any;
  }
}

declare module "*.svg";

type foo = CSSProp;

declare type PropsOf<TComponent> = TComponent extends React.ComponentType<infer P> ? P : never;
