import useAnimationProgressStore from "../stores/useAnimationProgress";

const NotAvailable = () => {
  const { type } = useAnimationProgressStore();

  return (
    <>{type === "PAGE_TRANSITION" && <h1>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</h1>}</>
  );
};

export default NotAvailable;
