import { Outlet } from "react-router";
import OverlayHeader from "../components/molecules/OverlayHeader";
import ExpandeHeader from "../components/molecules/ExpandeHeader";
import useScreenMode from "../hooks/useScreenMode";
import useScreenStore from "../stores/useScreenStore";
import Stripes from "./background/Stripes";

const Header = () => {
  useScreenMode();
  const mode = useScreenStore((state) => state.mode);

  return (
    <>
      {mode !== "mobile" ? <ExpandeHeader /> : <OverlayHeader />}
      <Stripes />
      <Outlet />
    </>
  );
};

export default Header;
