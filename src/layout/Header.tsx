import { Outlet } from "react-router";
import OverlayHeader from "../components/molecules/OverlayHeader";
import ExpandeHeader from "../components/molecules/ExpandeHeader";
import useScreenMode from "../hooks/useScreenMode";
import useScreenStore from "../stores/useScreenStore";
import Modal from "../components/organism/Modal";

const Header = () => {
  useScreenMode();
  const mode = useScreenStore((state) => state.mode);

  return (
    <>
      {mode !== "mobile" ? <ExpandeHeader /> : <OverlayHeader />}
      <Modal />
      <Outlet />
    </>
  );
};

export default Header;
