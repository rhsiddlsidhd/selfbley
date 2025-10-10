import SignSVGContainer from "../../SignSVGContainer";
import ParallaxImages from "../../../molecules/ParallaxImages";

const ParallaxBackground = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <>
      <SignSVGContainer
        isView={true}
        section="parallaxSection"
        $position="absolute"
      />
      <ParallaxImages activeIndex={activeIndex} />
    </>
  );
};

export default ParallaxBackground;
