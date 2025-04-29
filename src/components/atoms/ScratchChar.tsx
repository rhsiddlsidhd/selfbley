import React from "react";

const ScratchChar = React.memo(
  ({ char, color }: { char: string; color: string }) => {
    return <span style={{ color }}>{char === " " ? "\u00A0" : char}</span>;
  }
);

export default ScratchChar;
