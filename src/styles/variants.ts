export const project = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const slideInUp = {
  hidden: { opacity: 0, y: "10px" },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
