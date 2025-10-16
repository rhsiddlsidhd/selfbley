import { Outlet } from "react-router";
import useScreenStore from "../../stores/useScreenStore";
import useScreenMode from "../../hooks/useScreenMode";
import Modal from "../../components/organism/Modal";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  useScreenMode();
  const mode = useScreenStore((state) => state.mode);

  return (
    <div>
      {mode !== "mobile" ? <DesktopHeader /> : <MobileHeader />}
      <Modal />
      <Outlet />
    </div>
  );
};

export default Header;
