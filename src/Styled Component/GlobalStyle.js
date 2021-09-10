/** @format */

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => (props.whiteColor ? 'white' : 'black')};
    background-color: #f1f1f1;
  }
`;
