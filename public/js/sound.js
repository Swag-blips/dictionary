// Function to load sound and play sound
export const loadSound = (value, audioElement, playContainer, playButton, pauseButton) => {
    var _a;
    const wordFromData = value[0];
    const audioSrcs = [];
    (_a = wordFromData === null || wordFromData === void 0 ? void 0 : wordFromData.phonetics) === null || _a === void 0 ? void 0 : _a.forEach((audio) => {
        if (audio.audio && audio.audio.trim() !== "") {
            audioSrcs.push(audio.audio);
        }
    });
    if (audioSrcs.length > 0) {
        audioElement.src = audioSrcs[0];
        audioElement.load();
    }
    else {
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
