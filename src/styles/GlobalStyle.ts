import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        ::-webkit-scrollbar{
            display: none;
        }
    }
    body{
        background-color: transparent;
        color: white;
    }
    p{
        word-break: keep-all;
    }
    h1 {
  font-size: clamp(3rem, 8vw, 10rem);
}
h2 {
  font-size: clamp(2.4rem, 6.4vw, 8rem);
}
h3 {
  font-size: clamp(1.92rem, 5.12vw, 6.4rem);
}
h4 {
  font-size: clamp(1.54rem, 4.1vw, 5.12rem);
}
h5 {
  font-size: clamp(1.23rem, 3.28vw, 4.1rem);
}
h6 {
  font-size: clamp(0.98rem, 2.62vw, 3.28rem);
}
`;
export default GlobalStyle;
