import styled, { css } from "styled-components";
import Badge, { BadgeTypes } from "../atoms/Badge";
import { motion } from "motion/react";
import { ProjectData } from "../../pages/TheProjects";
import Badges from "../molecules/Badges";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { AnimationProgressTypes } from "../../pages/Main";
import SocialSVGIcon from "../molecules/SocialIcon";
import Link from "../atoms/Link";

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
  const entries = Object.entries(technologies) as [BadgeTypes, string[]][];

  return (
    <ProjectContainer $screenMode={screenMode}>
      <motion.section
        className="project_overview"
        initial="hidden"
        animate={state === "SLIDE" ? "show" : "hidden"}
        variants={slideInUp}
      >
        <p>{index}</p>
        <Badge type={mode} name={mode} />
        <aside>
          {socialLinks.map(({ name, href }) => {
            const isDisabled = href === "#";
            return (
              <Link href={href} key={name} $isDisabled={isDisabled}>
                <SocialSVGIcon
                  $size="custom"
                  $custom="clamp(2rem, 2.5vw, 5rem)"
                  type={name}
                />
              </Link>
            );
          })}
        </aside>
      </motion.section>
      <motion.section
        initial="hidden"
        animate={state === "SLIDE" ? "show" : "hidden"}
        variants={container}
        className="project_detail"
      >
        <motion.section variants={slideInUp} className="title">
          <h4>{title}</h4>
          <p>{overView}</p>
        </motion.section>
        <Thumbnail variants={slideInUp} target="_blank" href={deployUrl}>
          <figure className="thumbnail">
            <img src={`/${thumbnail}`} alt="썸네일이미지" />
          </figure>
        </Thumbnail>
        <motion.section variants={slideInUp} className="technologies">
          <h6>Technologies & Tools</h6>
          {entries.map(([category, techList], i) => {
            return <Badges key={i} category={category} techList={techList} />;
          })}
        </motion.section>
        <motion.section variants={slideInUp} className="description">
          <h6>Description</h6>
          <p>{description}</p>
        </motion.section>
      </motion.section>
    </ProjectContainer>
  );
};

export default Project;
const Thumbnail = styled(motion.a)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  * {
    &:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
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
  width: 75%;
  margin-bottom: 10rem;
  display: flex;
  ${({ $screenMode }) =>
    $screenMode === "mobile" &&
    css`
      width: 100%;
      flex-direction: column;
    `}
  .project_overview {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

    & > * {
      margin-bottom: 1rem;
    }
    & > span {
      width: 80%;
      display: flex;
      justify-content: center;
      font-size: clamp(0.75rem, 1vw, 1.2rem);
    }
    & > p {
      font-size: clamp(8rem, 10vw, 12rem);
      font-weight: bold;
      display: flex;
      justify-content: center;
      color: black;
    }
    & > aside {
      display: flex;
      gap: 1rem;
    }
  }

  .project_detail {
    flex: 1;
    .title,
    .technologies,
    .description {
      & > * {
        margin-bottom: 1rem;
        color: black;
      }
    }

    .title > p {
      font-size: clamp(0.725rem, 2vw, 2.8rem);
    }

    .thumbnail {
      margin: 3rem 0;
      aspect-ratio: 16/9;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
