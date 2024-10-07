// Function to load sound and play sound

import { DictionaryResponse } from "./interface";

export const loadSound = (
  value: DictionaryResponse[],
  audioElement: HTMLAudioElement,
  playContainer: HTMLElement,
  playButton: HTMLImageElement,
  pauseButton: HTMLImageElement
) => {
  const wordFromData = value[0];
  const audioSrcs: string[] = [];

  wordFromData?.phonetics?.forEach((audio) => {
    if (audio.audio && audio.audio.trim() !== "") {
      audioSrcs.push(audio.audio);
    }
  });

  if (audioSrcs.length > 0) {
    audioElement.src = audioSrcs[0];
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
