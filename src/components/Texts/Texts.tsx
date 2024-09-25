import { useMemo, useRef } from "react";

import { useCursorHover, useCustomControls, useIsMobile } from "../../hooks";
import { useTextsAnimation } from "../../animations";
import useStore, { Stage } from "../../store";
import { Play, Repeat } from "../Icons";

function Texts() {
  // store and refs
  const stage = useStore((store) => store.stage);
  const setStage = useStore((store) => store.setStage);
  const isTrackPlaying = useStore((store) => store.isTrackPlaying);
  const setIsTrackPlaying = useStore((store) => store.setIsTrackPlaying);
  const audio = useStore((store) => store.refs.audio);
  const titleRef = useRef<HTMLHeadingElement>(null!);
  const descriptionRef = useRef<HTMLParagraphElement>(null!);
  const playButtonRef = useRef<HTMLDivElement>(null!);
  const footerRef = useRef<HTMLDivElement>(null!);

  // controls
  const controls = useCustomControls();

  // curosr
  const cursorHover = useCursorHover();

  // check if is mobile
  const isMobile = useIsMobile();

  // text fade-in and fade-out animations
  useTextsAnimation(
    titleRef.current,
    descriptionRef.current,
    playButtonRef.current,
    footerRef.current
  );

  // start button handler
  const handleStart = useMemo(
    () => () => {
      if (isTrackPlaying) return;

      setStage(Stage.One);

      audio.current?.play();
      audio.current?.pause();
      setIsTrackPlaying(true);
      setTimeout(() => {
        audio.current?.setVolume(controls.audio.volume);
        audio.current?.play();
      }, 1500);
    },
    [isTrackPlaying, setIsTrackPlaying, controls.audio.volume]
  );

  const handleAgain = useMemo(
    () => () => {
      setStage(Stage.Reset);
    },
    []
  );

  if (stage === Stage.Loading) return null;

  return (
    <>
      {/* cursor */}
      {!isMobile && stage === Stage.Zero ? <div id="cursor" /> : null}

      {/* intro texts */}
      <div id="intro">
        <h1 ref={titleRef} {...cursorHover.text}>
          FULLSCREEN HEAVYWEIGHT
        </h1>
        <p ref={descriptionRef} {...cursorHover.text}>
          a glorius track visualization.
        </p>
      </div>
      <div ref={playButtonRef} id="start">
        <button
          className={isTrackPlaying ? "playing" : ""}
          {...cursorHover.link}
          onClick={handleStart}
        >
          <Play />
          <span>ENABLE FULLSCREEN</span>
        </button>
      </div>
      <footer ref={footerRef}>
        <div id="credits">
          <p {...cursorHover.text}> DJ Fresh - Heavyweight Side A</p>
          <p {...cursorHover.text}>DIGITAL SOUNDBOY PRESENTS</p>
        </div>
        <div id="source">
          <p>
            made by{" "}
            <a
              href="https://github.com/ksachikonye"
              title="pouria.dev"
              target="_blank"
              {...cursorHover.link}
            >
              FULLSCREEN TRIANGLE
            </a>
            .
          </p>
          <p>
            source available on{" "}
            <a
              href="https://github.com/poeti8/unknown-pleasures"
              title="github"
              target="_blank"
              {...cursorHover.link}
            >
              github
            </a>
            .
          </p>
        </div>
      </footer>

      {/*
       * texts for the animation (lyrics)
       * most texts for lyrics are on the line component, some are here because
       * it was easier to put them on screen as independet html element
       * rather than assign it to a three.js object (line)
       */}
      <p className="texts stage-five then-love">BE THE ONE</p>
      <p className="texts stage-five love-will-tear-us-aprat">
        ONE
      </p>
      <div className="stage-five-wrapper">
        <p className="texts stage-five love-will-tear-us-aprat-2">
ONE        </p>
        <div id="again-btn-wrapper">
          <button {...cursorHover.link} onClick={handleAgain}>
            <Repeat />
            <span>AGAIN</span>
          </button>
        </div>
      </div>
      <div className="reset-overlay" />
    </>
  );
}

export default Texts;
