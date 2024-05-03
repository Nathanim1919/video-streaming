import React from 'react';

const AudioPlayer = () => {
  return (
    <div>
      <h2>Join in Audio</h2>
      <audio controls>
        <source src="audio.mp3" type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;