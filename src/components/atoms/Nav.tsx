import styled from "styled-components";
import { useNavigate } from "react-router";
import useScreenStore, { Mode } from "../../stores/useScreenStore";
import { NAV_PATHS } from "../../constants/routes";

const typedEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

const Nav = ({ onCloseMenu }: { onCloseMenu?: () => void }) => {
  const mode = useScreenStore((state) => state.mode);
  const navigate = useNavigate();

  const preloadPage = (tab: keyof typeof NAV_PATHS) => {
    switch (tab) {
      case "THESKILLS":
        import("../../pages/TheSkills");
        break;
      case "THEPROJECTS":
        import("../../pages/TheProjects");
        break;
      case "CONTACT":
        import("../../components/organism/ContactSection");
        break;
    }
  };

  return (
    <>
      {typedEntries(NAV_PATHS).map(([tab, path]) => {
        return (
          <NavItems key={tab} $mode={mode}>
            <p
              onMouseEnter={() => preloadPage(tab)}
              onClick={() => {
                if (onCloseMenu) {
                  onCloseMenu();
                  setTimeout(() => {
                    navigate(path);
                  }, 1000);
                } else {
                  navigate(path);
                }
              }}
            >
              {tab}
            </p>
          </NavItems>
        );
      })}
    </>
  );
};

export default Nav;

const NavItems = styled.a<{ $mode: Mode }>`
  font-size: ${(props) =>
    props.$mode !== "mobile" ? props.theme.fontSize.m : "10vw"};

  padding-left: ${({ $mode }) => ($mode !== "mobile" ? "1rem" : 0)};
  & > p {
    position: relative;
    cursor: pointer;
    width: fit-content;
    margin-bottom: 0.5rem;
    font-weight: bold;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5rem;
      height: 3px;
      width: 100%;
      background-color: white;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 1s ease-in-out;
    }
    &:hover {
      &::after {
        transform: scaleX(1);
      }
    }
  }
`;
