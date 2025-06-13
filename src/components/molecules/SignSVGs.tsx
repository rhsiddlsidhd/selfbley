import { Fragment } from "react";
import SignSVG from "../atoms/SignSVG";
import { paths } from "../../constants/svg/sign-paths";

const SignSVGs = () => {
  type PathKeys = keyof typeof paths;

  const Paths: PathKeys[] = [0, 1, 2, 3];

  return (
    <>
      {Paths.map((path, i) => {
        return (
          <Fragment key={i}>
            <SignSVG type={path} />
          </Fragment>
        );
      })}
    </>
  );
};

export default SignSVGs;
