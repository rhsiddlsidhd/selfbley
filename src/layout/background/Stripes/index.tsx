import styled, { css } from "styled-components";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";

const Stripes = () => {
  const mode = useScreenStore((state) => state.mode);
  return (
    <Container>
      {Array.from({ length: mode !== "mobile" ? 6 : 4 }, (_, i) => {
        return (
          <Stripe
            key={i}
            $borderRemoveItem={mode !== "mobile" ? i === 1 || i === 3 : false}
            $mode={mode}
          />
        );
      })}
    </Container>
  );
};

export default Stripes;

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  pointer-events: none;
  z-index: 2;
`;

const Stripe = styled.section<{
  $borderRemoveItem: boolean;
  $mode: Mode;
}>`
  border-right: ${({ $borderRemoveItem }) =>
    !$borderRemoveItem && "3px solid #7178852b "};
  flex: 1;
  &:first-child,
  &:last-child {
    ${({ $mode }) =>
      $mode === "mobile" &&
      css`
        flex: 0.5;
      `}
  }
`;
