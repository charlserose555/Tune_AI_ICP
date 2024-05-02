import { useEffect } from 'react';
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

  useEffect(() => {
    return () => {
      if(progressBarRef.current) {
        progressBarRef.current.max = 0;
      } 
      setDuration(0)
    } 
  }, [])

  return (
    <div>
      <audio
        controlsList="nodownload"
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}>
        <source src={currentTrack?.src} type="audio/mpeg" />
      </audio>
    </div>
  );
};
export default DisplayTrack;