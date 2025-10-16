import { Outlet } from "react-router";
import useScreenStore from "../../stores/useScreenStore";
import useScreenMode from "../../hooks/useScreenMode";
import Modal from "../../components/organism/Modal";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import useScrollBotom from "../../hooks/useScrollBotom";
import FixedButton from "../../components/molecules/FixedButton";
import { UpArrowIcon } from "../../components/atoms/Icon";

const Header = () => {
  useScreenMode();
  const mode = useScreenStore((state) => state.mode);
  const { reached } = useScrollBotom();

  return (
    <div>
      {mode !== "mobile" ? <DesktopHeader /> : <MobileHeader />}
      <Modal />
      {reached && (
        <FixedButton
          $bottom="6.25rem"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <UpArrowIcon color="white" />
        </FixedButton>
      )}
      <Outlet />
    </div>
  );
};

export default Header;
