import { motion } from "motion/react";
import styled from "styled-components";
interface LinkProps {
  href: string;
  $isDisabled: boolean;
  children: React.ReactNode;
}

const Link = ({ href, $isDisabled, children }: LinkProps) => {
  return (
    <Index whileHover={{ scale: 1.1 }} href={href} $isDisabled={$isDisabled}>
      {children}
    </Index>
  );
};

export default Link;

const Index = styled(motion.a)<Pick<LinkProps, "$isDisabled">>`
  ${({ $isDisabled }) =>
    $isDisabled &&
    `
     pointer-events:none;
     opacity:0.5;
     cursor:not-allowed;
   `}
`;
