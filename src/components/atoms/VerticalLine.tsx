import styled, { css } from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";

type Page = "MAIN" | "THEPROJECTS";

const VerticalLine = ({ page }: { page: Page }) => {
  const mode = useScreenStore((state) => state.mode);
  return (
    <VerticalLineContainer $page={page}>
      {Array.from({ length: mode !== "mobile" ? 6 : 4 }, (_, i) => {
        const borderRemoveItem = i === 1 || i === 3;
        return (
          <VerticalLineSection
            key={i}
            $borderRemoveItem={borderRemoveItem}
            $mode={mode}
          />
        );
      })}
    </VerticalLineContainer>
  );
};

export default VerticalLine;

const VerticalLineContainer = styled.div<{ $page: Page }>`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${({ $page }) =>
    $page === "THEPROJECTS" ? "#ffd34f" : "transparent"};
  display: flex;
  z-index: 1;
`;

// #abacaf #7178857a
const VerticalLineSection = styled.section<{
  $borderRemoveItem: boolean;
  $mode: Mode;
}>`
  border-right: ${({ $borderRemoveItem }) =>
    $borderRemoveItem ? "none" : "2px solid #7178852b"};
  flex: 1;
  z-index: 0;
  &:first-child,
  &:last-child {
    ${({ $mode }) =>
      $mode === "mobile" &&
      css`
        flex: 0.5;
      `}
  }
`;
