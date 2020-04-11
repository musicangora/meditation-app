const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");

  // Sound
  const sounds = document.querySelectorAll(".sound-picker button");
  // Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  // Get the length of the outline
  const outlineLength = outline.getTotalLength();
  // Durarion
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  // play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      let minutes = Math.floor(fakeDuration / 60);
      let seconds = Math.floor(fakeDuration % 60);
      let zminutes = ("0" + minutes).slice(-2);
      let zseconds = ("0" + seconds).slice(-2);
      timeDisplay.textContent = `${zminutes}:${zseconds}`;
    });
  });

  // Create a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // we can animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    let zminutes = ("0" + minutes).slice(-2);
    let zseconds = ("0" + seconds).slice(-2);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animete the text
    timeDisplay.textContent = `${zminutes}:${zseconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
