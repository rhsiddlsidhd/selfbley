import styled, { css } from "styled-components";

import useScreenStore, { Mode } from "../../stores/useScreenStore";

const CardSlider = () => {
  const mode = useScreenStore((state) => state.mode);

  return (
    <CardWrapper $mode={mode}>
      {/* {Object.entries(skills).map(([category, skillsList], i) => {
        return <Card key={i} category={category} skillsList={skillsList} />;
      })} */}
    </CardWrapper>
  );
};

export default CardSlider;

const CardWrapper = styled.div<{ $mode: Mode }>``;
