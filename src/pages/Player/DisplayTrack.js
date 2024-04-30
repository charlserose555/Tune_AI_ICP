import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;

    setDuration(parseInt(seconds, 10));
    progressBarRef.current.max = seconds;
  };

  return (
    <div>
      <audio
        src={currentTrack?.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};
export default DisplayTrack;