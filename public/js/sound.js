// Function to load sound and play sound

export const loadSound = (
  value,
  audioElement,
  playContainer,
  playButton,
  pauseButton
) => {
  const wordFromData = value[0];
  const audioSrcs = [];

  wordFromData.phonetics.forEach((audio) => {
    if (audio.audio !== "") {
      audioSrcs.push(audio);
    }
  });

  if (audioSrcs.length > 0) {
    audioElement.src = audioSrcs[0].audio;
    audioElement.load();
  } else {
    console.error("no audio sources found");
  }
  playContainer.addEventListener("click", () => {
    audioElement.play();
  });

  audioElement.addEventListener("playing", () => {
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
  });

  audioElement.addEventListener("ended", () => {
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
  });
};
