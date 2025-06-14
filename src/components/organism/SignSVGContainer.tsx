import { styled } from "styled-components";
import SignSVG from "../atoms/SignSVG";
import {
  parallaxSignSVGPosition,
  topMarqueeSignSVGPositions,
  videoSectionSignSGVPositions,
} from "../../constants/svg/sign-positions";

type Sections = "videoSection" | "topMarqueeSection" | "parallaxSection";

interface SignSVGContainerProps {
  isView: boolean;
  section: Sections;
  $position?: string;
  $color?: string;
}

const SignSVGContainer = ({
  isView,
  section,
  $position,
  $color,
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
      case "parallaxSection":
        return parallaxSignSVGPosition;
    }
  };

  return (
    <>
      {isView &&
        getSignSGVPositions(section).map(
          ({ id, top, left, right, bottom, transform, width = 1 }) => {
            return (
              <SVGWrapper
                key={`${id}-${Math.random()}`}
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
                <SignSVG color={$color} type={id}></SignSVG>
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
