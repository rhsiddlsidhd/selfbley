import styled, { css } from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";

type Page = "MAIN" | "THEPROJECTS";

const VerticalLine = ({ page }: { page: Page }) => {
  const mode = useScreenStore((state) => state.mode);
  return (
    <VerticalLineContainer $page={page}>
      {Array.from({ length: mode !== "mobile" ? 6 : 4 }, (_, i) => {
        return (
          <VerticalLineSection
            key={i}
            $borderRemoveItem={mode === "mobile" ? false : i === 1 || i === 3}
            $mode={mode}
          />
        );
      })}
    </VerticalLineContainer>
  );
};

export default VerticalLine;

const VerticalLineContainer = styled.div<{ $page: Page }>`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  pointer-events: none;
  z-index: 80;
`;

const VerticalLineSection = styled.section<{
  $borderRemoveItem: boolean;
  $mode: Mode;
}>`
  border-right: ${({ $borderRemoveItem }) =>
    !$borderRemoveItem && "1px solid #7178852b "};
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
