import styled from "styled-components";
import { ProjectData } from "../../../pages/TheProjects";
import { AnimationProgressTypes } from "../../../pages/Main";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import Badge from "../../atoms/Badge";
import { motion } from "motion/react";
import Link from "../../atoms/Link";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import Thumbnail from "../../molecules/Thumbnail";
import TechCategoryList from "../../molecules/TechCategoryList";

const ProjectOverview = ({
  state,
  mode,
  index,
  socialLinks,
}: {
  state: AnimationProgressTypes;
  mode: ProjectData["mode"];
  index: number;
  socialLinks: ProjectData["socialLinks"];
}) => {
  const screenMode = useScreenStore((state) => state.mode);

  return (
    <motion.section
      className="project_overview"
      initial="hidden"
      animate={state === "SLIDE" ? "show" : "hidden"}
      variants={slideInUp}
    >
      <Text
        $fontSize={screenMode === "mobile" ? "clamp1" : "clamp5"}
        $fontWeight="bold"
      >
        {index}
      </Text>

      <Badge $key={mode} $width={screenMode === "mobile" ? "100%" : "80%"}>
        {mode}
      </Badge>
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
  );
};

const ProjectDetail = ({
  state,
  title,
  overView,
  deployUrl,
  technologies,
  thumbnail,
  description,
}: {
  state: AnimationProgressTypes;
  technologies: ProjectData["technologies"];
  title: ProjectData["title"];
  overView: ProjectData["overView"];
  deployUrl: ProjectData["deployUrl"];
  thumbnail: ProjectData["thumbnail"];
  description: ProjectData["description"];
}) => {
  return (
    <Detail
      initial="hidden"
      animate={state === "SLIDE" ? "show" : "hidden"}
      variants={container}
      className="project_detail"
      style={{ color: "black" }}
    >
      <motion.section variants={slideInUp}>
        <Text $fontSize="xl" $fontWeight="bold">
          {title}
        </Text>
        <Text $fontSize="sm">{overView}</Text>
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
      <motion.section variants={slideInUp}>
        <Text $fontSize="xl" $fontWeight="bold">
          Technologies & Tools
        </Text>

        <TechCategoryList technologies={technologies} />
      </motion.section>
      <motion.section variants={slideInUp}>
        <Text $fontSize="xl" $fontWeight="bold">
          Description
        </Text>
        <Text $fontSize="sm">{description}</Text>
      </motion.section>
    </Detail>
  );
};

const Project = ({
  data,
  index,
  state,
}: {
  data: ProjectData;
  index: number;
  state: AnimationProgressTypes;
}) => {
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
  return (
    <ProjectContainer $screenMode={screenMode}>
      <ProjectOverview
        index={index}
        state={state}
        socialLinks={socialLinks}
        mode={mode}
      />
      <ProjectDetail
        deployUrl={deployUrl}
        description={description}
        overView={overView}
        state={state}
        technologies={technologies}
        thumbnail={thumbnail}
        title={title}
      />
    </ProjectContainer>
  );
};

export default Project;
const Detail = styled(motion.div)`
  & > * {
    margin-bottom: 1rem;
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
  color: ${({ theme }) => theme.COLORS.black};

  .project_overview {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 1rem;
  }

  .project_detail {
    flex: 1;
  }
`;
