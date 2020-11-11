/// <reference types="react-scripts" />

import { CSSProp } from "styled-components";

module "react" {
  interface Attributes {
    css?: CSSProp;
  }
}

declare module "*.svg";

declare type PropsOf<TComponent> = TComponent extends React.ComponentType<infer P> ? P : never;
