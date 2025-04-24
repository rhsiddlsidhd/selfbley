import html from "../assets/html.svg";
import css from "../assets/css.svg";
import styledComponents from "../assets/styled-components.svg";
import javascript from "../assets/javascript.svg";
import typescript from "../assets/typescript.svg";
import react from "../assets/react.svg";
import redux from "../assets/redux.svg";
import zustand from "../assets/zustand.svg";
import nodeJs from "../assets/nodeJs.svg";
import express from "../assets/express.svg";
import mongodb from "../assets/mongodb.svg";
import firebase from "../assets/firebase.svg";
import discord from "../assets/discord.svg";
import figma from "../assets/figma.svg";
import github from "../assets/github.svg";

export type TechnologyKey = keyof typeof technology;

export const VISIBLE_COUNT = 3;
export const centerOffset = Math.floor(VISIBLE_COUNT / 2);
const language = [
  { name: "html", icon: html },
  { name: "css", icon: css },
  {
    name: "javascript",
    icon: javascript,
  },
  { name: "typescript", icon: typescript },
];

const frontend = [
  { name: "styled-components", icon: styledComponents },
  { name: "react", icon: react },
  { name: "redux", icon: redux },
  { name: "zustand", icon: zustand },
];

const backend = [
  { name: "nodeJs", icon: nodeJs },
  { name: "express", icon: express },
  { name: "mongodb", icon: mongodb },
  { name: "firebase", icon: firebase },
];

const etc = [
  { name: "discord", icon: discord },
  { name: "figma", icon: figma },
  { name: "github", icon: github },
];

export const technology = {
  language,
  frontend,
  backend,
  etc,
} as const;

export const skillOverview = "Learned SKILLS ";
export const SKILL_ICON_DEFUALT_WIDTH = 5;

export const SKILL_ICON_MOBILE_WIDTH = 3;

export const SKILL_ICONS_DEFUALT_GAP = 1;

export const SKILL_ICONS_MOBILE_GAP = 0.5;

export const SKILL_CONTENT_TOTAL_COLUMNS = 6;

export const SKILL_CONTENT_MOBILE_COLUMNS = 4;

export const SKILL_CONTENT_DEFUALT_COLUMNS = 2;

export const OPEN_MODAL_TEXT = "View All SKILLS";

export const CLOSE_MODAL_TEXT = "Close All SKILLS";
