import SignSVGContainer from "../../SignSVGContainer";
import Videos from "../../../../layout/background/Videos";

const HeroBackground = ({ isInView }: { isInView: boolean }) => {
  return (
    <>
      <SignSVGContainer isView={isInView} section="hero" />
      <Videos isInView={isInView} />
    </>
  );
};

export default HeroBackground;
