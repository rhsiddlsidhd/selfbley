import React from "react";
import { styled } from "styled-components";
import github from "../assets/github.svg";

const Footer = () => {
  return (
    <Container>
      {/* 이메일 전화번호 / comment / 아이콘 github , blog / 제작자, 제작일  */}
      <ContactSection>
        <address>rhsiddlsidhd1@gmail.com</address>
        <Icons>
          <li>
            <a href="https://github.com/rhsiddlsidhd/selfbley" target="_blank">
              <img src={github} />
            </a>
          </li>
          <li>
            <a href="https://endless-growth.tistory.com/" target="_blank">
              <img src="https://t1.daumcdn.net/cfile/tistory/9935084A5B9541D014" />
            </a>
          </li>
        </Icons>
      </ContactSection>
      <CopylightSection>
        <div>Copylight @ 2025, Shin YoungJae. All rights reserved. </div>
      </CopylightSection>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  width: calc(100% / 6 * 4);
  height: 50vh;
  display: flex;
  flex-direction: column;
  & > section {
    flex: 1 0 auto;
    flex-wrap: wrap;
  }
  & > section:first-child {
  }
`;

const ContactSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  & > address,
  ul {
    padding: 0.5rem;
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;

const Icons = styled.ul`
  list-style: none;
  & > li {
    width: 50px;
    height: 50px;
    & > a > img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: scale(1.15);
      transition: transform 0.3s ease-in-out;
    }
  }
`;

const CopylightSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    color: #616060;
    font-size: clamp(0.5rem, 2vw, 2rem);
  }
`;
