import { Html } from "@react-three/drei";
import { FC } from "react";

interface Props {
  index: number;
}

const LineTexts: FC<Props> = (props) => {
  return (
    <>
      {props.index === 84 ? (
        <Html position={[-5, 5, 1]}>
          <p className="texts stage-three when-routine-bites-hard">
             ONE WE NEED
          </p>
        </Html>
      ) : null}

      {props.index === 126 ? (
        <Html position={[-2, -2, 1]}>
          <p className="texts stage-three and-ambitions-are-low">
            BE THE ONE
          </p>
        </Html>
      ) : null}

      {props.index === 154 ? (
        <Html position={[-5, 12, 1]}>
          <p className="texts stage-three and-resentment-rides-high">
             WE NEED          </p>
        </Html>
      ) : null}

      {props.index === 0 ? (
        <Html position={[0, 1, 1]}>
          <p className="texts stage-four but-emotions-wont-grow">
            BE THE ONE 
          </p>
          <p className="texts stage-four and-were-changing-our-ways">
            WE NEED 
          </p>
          <p className="texts stage-four taking-different-roads">
            THE ONE
          </p>
        </Html>
      ) : null}

      {props.index === 0 ? (
        <Html position={[0, 0, 1.7]}>
          <p className="texts stage-five again">AGAIN</p>
        </Html>
      ) : null}

      {props.index === 0 ? (
        <Html position={[0, 0, 2]}>
          <p className="texts stage-five love">ONE</p>
        </Html>
      ) : null}
    </>
  );
};

export default LineTexts;
