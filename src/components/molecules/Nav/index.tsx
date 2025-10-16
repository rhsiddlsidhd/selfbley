import styled from "styled-components";
import { useNavigate } from "react-router";
import useScreenStore, { Mode } from "../../../stores/useScreenStore";
import { NAV_PATHS } from "../../../constants/routes";
import { Fragment } from "react/jsx-runtime";
import Text from "../../atoms/Text";

const Nav = ({ onCloseMenu }: { onCloseMenu?: () => void }) => {
  const mode = useScreenStore((state) => state.mode);
  const navigate = useNavigate();

  const entries = Object.entries(NAV_PATHS);

  return (
    <Fragment>
      {entries.map(([label, path]) => (
        <NavItems key={label} $mode={mode}>
          <Text
            onClick={() => {
              if (path === "/threeJs") return alert("서비스 준비중입니다");
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
            {label}
          </Text>
        </NavItems>
      ))}
    </Fragment>
  );
};

export default Nav;

const NavItems = styled.a<{ $mode: Mode }>`
  & > p {
    position: relative;
    cursor: pointer;
    width: fit-content;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: ${(props) =>
      props.$mode !== "mobile" ? props.theme.FONT_SIZE.md : "10vw"};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.1rem;
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
  z-index: 99;
`;
