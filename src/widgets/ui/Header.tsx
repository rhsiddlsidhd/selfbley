import styled from "styled-components";
import { Outlet, useNavigate } from "react-router";

import { ROUTES, ROUTESKeys } from "../../shared/routes/constants";
import { handleNavigate } from "../../features/navigation/model/models";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderWrapper>
        {Object.keys(ROUTES).map((tab) => {
          const __tab = tab as ROUTESKeys;
          return (
            <Text
              key={__tab}
              onClick={() =>
                handleNavigate({ routes: ROUTES, tab: __tab, navigate })
              }
            >
              {__tab}
            </Text>
          );
        })}
      </HeaderWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.header`
  position: fixed;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 11;
`;

const Text = styled.div`
  color: white;
  font-size: ${(props) => props.theme.fontSize.l};
  margin: 1rem 3rem;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.lightCyan};
    transition: color 0.5s ease-in-out;
  }
`;

const ContentWrapper = styled.div`
  min-width: 1024px;
`;
