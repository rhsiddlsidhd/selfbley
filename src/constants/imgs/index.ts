import flower_640 from "../../assets/loading_section/background/flower-640.webp";
import flower_320 from "../../assets/loading_section/background/flower-320.webp";
import flower_160 from "../../assets/loading_section/background/flower-160.webp";
import spring_640 from "../../assets/loading_section/background/spring-640.webp";
import spring_320 from "../../assets/loading_section/background/spring-320.webp";
import spring_160 from "../../assets/loading_section/background/spring-160.webp";
import summer_640 from "../../assets/loading_section/background/summer-640.webp";
import summer_320 from "../../assets/loading_section/background/summer-640.webp";
import summer_160 from "../../assets/loading_section/background/summer-640.webp";

export const weatherImgs = [
  { srcSet: `${flower_640} 640w,${flower_320} 320w, ${flower_160} 160w` },
  { srcSet: `${spring_640} 640w,${spring_320} 320w, ${spring_160} 160w` },
  { srcSet: `${summer_640} 640w,${summer_320} 320w, ${summer_160} 160w` },
] as const;
