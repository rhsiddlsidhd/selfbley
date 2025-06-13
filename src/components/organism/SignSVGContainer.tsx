import { styled } from "styled-components";
import SignSVG from "../atoms/SignSVG";
import {
  topMarqueeSignSVGPositions,
  videoSectionSignSGVPositions,
} from "../../constants/svg/sign-positions";

type Sections = "videoSection" | "topMarqueeSection";

interface SignSVGContainerProps {
  isView: boolean;
  section: Sections;
  $position?: string;
}

const SignSVGContainer = ({
  isView,
  section,
  $position,
}: SignSVGContainerProps) => {
  /**
   * Props로 어떤 섹션인지 구분하고
   * 각 섹션에 맞는 Positions를 받아와서 각 렌더링
   */

  const getSignSGVPositions = (section: Sections) => {
    switch (section) {
      case "videoSection":
        return videoSectionSignSGVPositions;
      case "topMarqueeSection":
        return topMarqueeSignSVGPositions;
    }
  };

  return (
    <>
      {isView &&
        getSignSGVPositions(section).map(
          ({ id, top, left, right, bottom, transform, width = 1 }) => {
            return (
              <SVGWrapper
                key={id}
                style={{
                  top,
                  left,
                  right,
                  bottom,
                  transform: `${transform}`,
                  width: `calc(100% / 6 *${width})`,
                }}
                $position={$position || "fixed"}
              >
                <SignSVG type={id}></SignSVG>
              </SVGWrapper>
            );
          }
        )}
    </>
  );
};

export default SignSVGContainer;

const SVGWrapper = styled.div<{ $position: string }>`
  position: ${({ $position }) => $position};
  z-index: 99;
`;
