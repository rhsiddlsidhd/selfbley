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

interface SkillArea {
  key: TechnologyKey;
  color: string;
}

const language = {
  title: "language",
  items: [
    { name: "html", icon: html },
    { name: "css", icon: css },
    {
      name: "javascript",
      icon: javascript,
    },
    { name: "typescript", icon: typescript },
  ],
} as const;

const frontend = {
  title: "frontend",
  items: [
    { name: "styled-components", icon: styledComponents },
    { name: "react", icon: react },
    { name: "redux", icon: redux },
    { name: "zustand", icon: zustand },
  ],
} as const;

const backend = {
  title: "backend",
  items: [
    { name: "nodeJs", icon: nodeJs },
    { name: "express", icon: express },
    { name: "mongodb", icon: mongodb },
    { name: "firebase", icon: firebase },
  ],
} as const;

const etc = {
  title: "etc",
  items: [
    { name: "discord", icon: discord },
    { name: "figma", icon: figma },
    { name: "github", icon: github },
  ],
} as const;

const overview = {
  title: "overview",
  description: "해당 섹션은 저의 기술들을 소개합니다.",
} as const;

export const skillAreas: SkillArea[] = [
  {
    key: "language",
    color: "rgb(162, 123, 92)",
  },
  {
    key: "frontend",
    color: "rgb(44, 54, 57)",
  },
  {
    key: "backend",
    color: "rgb(63, 78, 79)",
  },
  {
    key: "overview",
    color: "rgb(0,0,0)",
  },
  {
    key: "etc",
    color: "rgb(220, 215, 201)",
  },
];

export const technology = {
  language,
  frontend,
  backend,
  etc,
  overview,
} as const;
