import styled from "styled-components";
import { ProjectData } from "../../../pages/TheProjects";
import { AnimationProgressTypes } from "../../../pages/Main";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import Badge from "../../atoms/Badge";
import { motion } from "motion/react";
import Link from "../../atoms/Link";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import Badges from "../../molecules/Badges";
import { BADGE_COLORS_KEY } from "../../../types/style";
import Thumbnail from "../../molecules/Thumbnail";

const Project = ({
  data,
  index,
  state,
}: {
  data: ProjectData;
  index: number;
  state: AnimationProgressTypes;
}) => {
  console.log("data", data);
  const {
    description,
    mode,
    overView,
    socialLinks,
    technologies,
    thumbnail,
    title,
    deployUrl,
  } = data;
  const screenMode = useScreenStore((state) => state.mode);
  const entries = Object.entries(technologies) as [
    BADGE_COLORS_KEY,
    string[]
  ][];

  return (
    <ProjectContainer $screenMode={screenMode}>
      <motion.section
        className="project_overview"
        initial="hidden"
        animate={state === "SLIDE" ? "show" : "hidden"}
        variants={slideInUp}
      >
        <Text $fontSize="clamp1" $fontWeight="bold">
          {index}
        </Text>
        <Badge
          name={mode}
          $key={mode}
          $width={screenMode === "mobile" ? "100%" : "80%"}
        />
        <aside style={{ display: "flex", gap: "1rem" }}>
          {socialLinks.map(({ name, href }) => {
            const isDisabled = href === "#";
            return (
              <Link
                href={href}
                key={name}
                $isDisabled={isDisabled}
                $width="clamp(2rem, 2.5vw, 5rem)"
              >
                <Image src={`skills/${name}.svg`} alt={name} />
              </Link>
            );
          })}
        </aside>
      </motion.section>
      <ProjectDetail
        initial="hidden"
        animate={state === "SLIDE" ? "show" : "hidden"}
        variants={container}
        className="project_detail"
        style={{ color: "black" }}
      >
        <motion.section variants={slideInUp}>
          <Text $fontSize="clamp4" $fontWeight="bold">
            {title}
          </Text>
          <Text $fontSize="clamp6">{overView}</Text>
        </motion.section>
        <Thumbnail
          $aspectRatio="16/9"
          $width="100%"
          target="_blank"
          href={deployUrl}
          onHoverStart={() => true}
          variants={slideInUp}
        >
          <Image src={`/${thumbnail}`} alt="썸네일이미지" />
        </Thumbnail>
        {/* </motion.a> */}
        <motion.section variants={slideInUp}>
          <Text $fontSize="clamp4" $fontWeight="bold">
            Technologies & Tools
          </Text>
          {entries.map(([category, techList], i) => {
            return <Badges key={i} category={category} techList={techList} />;
          })}
        </motion.section>
        <motion.section variants={slideInUp}>
          <Text $fontSize="clamp4" $fontWeight="bold">
            Description
          </Text>
          <Text $fontSize="clamp6">{description}</Text>
        </motion.section>
      </ProjectDetail>
    </ProjectContainer>
  );
};

export default Project;
const ProjectDetail = styled(motion.div)`
  & > * {
    margin-bottom: 3rem;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideInUp = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: [0, 0, 1],
    y: 0,
    transition: { type: "tween", duration: 0.5 },
  },
};

const ProjectContainer = styled.main<{ $screenMode: Mode }>`
  width: ${({ $screenMode }) => ($screenMode === "mobile" ? "100%" : "75%")};
  display: flex;
  flex-direction: ${({ $screenMode }) =>
    $screenMode === "mobile" ? "column" : "row"};
  gap: ${({ $screenMode }) => ($screenMode === "mobile" ? "1rem" : 0)};
  margin-bottom: 10rem;
  color: ${({ theme }) => theme.COLORS.black};

  .project_overview {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .project_detail {
    flex: 1;
  }
`;
