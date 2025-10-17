import { motion } from "motion/react";
import styled from "styled-components";
interface LinkProps {
  href: string;
  $isDisabled: boolean;
  children: React.ReactNode;
  $width?: string;
}

const Link = ({ href, $isDisabled, children, $width }: LinkProps) => {
  return (
    <Index
      whileHover={{ scale: 1.1 }}
      href={href}
      $isDisabled={$isDisabled}
      $width={$width}
    >
      {children}
    </Index>
  );
};

export default Link;

const Index = styled(motion.a)<Pick<LinkProps, "$isDisabled" | "$width">>`
  ${({ $isDisabled }) =>
    $isDisabled &&
    `
     pointer-events:none;
     opacity:0.5;
     cursor:not-allowed;
   `}
  position:relative;
  width: ${({ $width }) => $width ?? "auto"};
  aspect-ratio: ${({ $width }) => ($width ? "1/1" : "auto")};
`;
