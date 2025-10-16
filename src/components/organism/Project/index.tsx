import styled from "styled-components";

import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import Badge from "../../atoms/Badge";
import { motion } from "motion/react";
import Link from "../../atoms/Link";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import Thumbnail from "../../molecules/Thumbnail";
import TechCategoryList from "../../molecules/TechCategoryList";
import useProjectStore, { ProjectModel } from "../../../stores/projectStore";
import { project, slideInUp } from "../../../styles/variants";

const ProjectOverview = ({
  mode,
  index,
  socialLinks,
}: {
  mode: ProjectModel["mode"];
  socialLinks: ProjectModel["socialLinks"];
  index: number;
}) => {
  const screenMode = useScreenStore((state) => state.mode);
  const animationProgress = useProjectStore((state) => state.animationProgress);
  return (
    <Overview
      initial="hidden"
      animate={animationProgress === "PENDING" ? "show" : "hidden"}
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
    </Overview>
  );
};

const ProjectDetail = ({
  title,
  overView,
  deployUrl,
  technologies,
  thumbnail,
  description,
}: {
  technologies: ProjectModel["technologies"];
  title: ProjectModel["title"];
  overView: ProjectModel["overView"];
  deployUrl: ProjectModel["deployUrl"];
  thumbnail: ProjectModel["thumbnail"];
  description: ProjectModel["description"];
}) => {
  const animationProgress = useProjectStore((state) => state.animationProgress);
  return (
    <Detail
      initial="hidden"
      animate={animationProgress === "PENDING" ? "show" : "hidden"}
      variants={project}
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

const Project = ({ index, data }: { index: number; data: ProjectModel }) => {
  const screenMode = useScreenStore((state) => state.mode);

  return (
    <Container $screenMode={screenMode}>
      <ProjectOverview
        index={index}
        mode={data.mode}
        socialLinks={data.socialLinks}
      />
      <ProjectDetail
        title={data.title}
        overView={data.overView}
        deployUrl={data.deployUrl}
        technologies={data.technologies}
        thumbnail={data.thumbnail}
        description={data.description}
      />
    </Container>
  );
};

export default Project;

const Container = styled.main<{ $screenMode: Mode }>`
  width: ${({ $screenMode }) => ($screenMode === "mobile" ? "100%" : "75%")};
  display: flex;
  flex-direction: ${({ $screenMode }) =>
    $screenMode === "mobile" ? "column" : "row"};
  gap: ${({ $screenMode }) => ($screenMode === "mobile" ? "1rem" : 0)};
  color: ${({ theme }) => theme.COLORS.black};
`;

const Overview = styled(motion.aside)`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
`;

const Detail = styled(motion.div)`
  flex: 1;
  & > * {
    margin-bottom: 1rem;
  }
`;
