import styled, { css } from "styled-components";
import Badge, { BadgeTypes } from "../atoms/Badge";
import { motion } from "motion/react";
import { ProjectData } from "../../pages/TheProjects";
import Badges from "../molecules/Badges";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import useAnimationProgressStore from "../../stores/useAnimationProgress";

const Project = ({ data, index }: { data: ProjectData; index: number }) => {
  const {
    description,
    mode,
    overView,
    socialLinks,
    technologies,
    thumnail,
    title,
  } = data;
  const screenMode = useScreenStore((state) => state.mode);

  const type = useAnimationProgressStore((state) => state.type);

  const isBadgeType = (category: string): category is BadgeTypes => {
    const validTypes = ["SINGLE", "TEAM", "FE", "BE", "ETC", "LANGUAGE"];
    return validTypes.includes(category);
  };

  return (
    <ProjectContainer $screenMode={screenMode}>
      <motion.section
        className="project_overview"
        initial="hidden"
        animate={type === "PROJECT_DISPLAY" ? "show" : "hidden"}
        variants={slideInUp}
      >
        <p>{index}</p>
        <Badge type={mode} name={mode} />
        <aside>
          {socialLinks.map(({ name, href, icon }) => {
            return (
              <motion.a
                href={href}
                id={name}
                key={name}
                whileHover={{ scale: 1.1 }}
              >
                <img src={icon} />
              </motion.a>
            );
          })}
        </aside>
      </motion.section>
      <motion.section
        initial="hidden"
        animate={type === "PROJECT_DISPLAY" ? "show" : "hidden"}
        variants={container}
        className="project_detail"
      >
        <motion.section variants={slideInUp} className="title">
          <h4>{title}</h4>
          <p>{overView}</p>
        </motion.section>
        <motion.section variants={slideInUp}>
          <article>
            <figure className="thumnail">
              <img src={thumnail} alt="썸네일이미지" />
            </figure>
          </article>
        </motion.section>
        <motion.section variants={slideInUp} className="technologies">
          <h6>Technologies & Tools</h6>
          {Object.entries(technologies).map(([category, techList], i) => {
            return (
              isBadgeType(category) && (
                <Badges key={i} category={category} techList={techList} />
              )
            );
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
      & > a > img {
        width: clamp(2rem, 2.5vw, 5rem);
        height: clamp(2rem, 2.5vw, 5rem);
      }
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

    .thumnail {
      background-color: red;
      margin: 3rem 0;
      height: 12rem;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
