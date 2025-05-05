import { useEffect, useRef } from "react";
import styled from "styled-components";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { motion } from "motion/react";

interface SkillsList {
  name: string;
  icon: string;
}

const Card = ({
  category,
  skillsList,
}: {
  category: string;
  skillsList: SkillsList[];
}) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const mode = useScreenStore((state) => state.mode);

  useEffect(() => {
    if (!itemRef.current) return;
  }, []);

  return (
    <CardItem $mode={mode}>
      <InfoWrapper>
        {skillsList.map(({ name, icon }, _, arr) => {
          return (
            <SkillsIcon
              key={name}
              src={icon}
              $count={arr.length}
              whileHover={{ scale: 1.2 }}
            />
          );
        })}
      </InfoWrapper>
      <TitleWrapper>
        <h6>{category}</h6>
      </TitleWrapper>
    </CardItem>
  );
};

export default Card;

const CardItem = styled.div<{ $mode: Mode }>``;

const TitleWrapper = styled.div`
  height: min-content;
  display: flex;
  border-top: 1px solid #cccccc;
  height: 20%;
  padding: 1rem;
  & > h6 {
    color: black;
    height: fit-content;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
`;

const SkillsIcon = styled(motion.img)<{ $count: number }>`
  max-width: 80%;
  height: ${({ $count }) =>
    $count && `calc((100% - ${2 * $count}rem) / ${$count})`};
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #dddcdc;
  border-radius: 1rem;
  cursor: pointer;
  filter: drop-shadow(0px 0px 5px rgba(243, 241, 241, 0.555));
`;
