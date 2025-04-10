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

const skills = {
  LANGUAGE: [
    { name: "html", icon: html },
    { name: "css", icon: css },
    {
      name: "javascript",
      icon: javascript,
    },
    { name: "typescript", icon: typescript },
  ],
  FE: [
    { name: "styled-components", icon: styledComponents },
    { name: "react", icon: react },
    { name: "redux", icon: redux },
    { name: "zustand", icon: zustand },
  ],
  BE: [
    { name: "nodeJs", icon: nodeJs },
    { name: "express", icon: express },
    { name: "mongodb", icon: mongodb },
    { name: "firebase", icon: firebase },
  ],
  ETC: [
    { name: "discord", icon: discord },
    { name: "figma", icon: figma },
    { name: "github", icon: github },
  ],
};

export default skills;
