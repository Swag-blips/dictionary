// Function to load sound and play sound

export const loadSound = (value, element, container, play, pause) => {
  const wordFromData = value[0];
  const audioSrcs = [];

  wordFromData.phonetics.forEach((audio) => {
    if (audio.audio !== "") {
      audioSrcs.push(audio);
    }
  });

  if (audioSrcs.length > 0) {
    element.src = audioSrcs[0].audio;
    element.load();
  } else {
    console.error("no audio sources found");
  }
  container.addEventListener("click", () => {
    element.play();
  });

  element.addEventListener("playing", () => {
    play.classList.add("hidden");
    pause.classList.remove("hidden");
    console.log("your audio is playing");
  });

  element.addEventListener("ended", () => {
    console.log("Your audio has ended");
    play.classList.remove("hidden");
    pause.classList.add("hidden");
  });

  console.log(element);
};
