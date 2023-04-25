// Access to input
const alermSetInput = document.querySelector("#alarmSet");
// Access to span for showing timer
const timeRemaining = document.querySelector(".timeRange");

let intervalID;
let intervalColor;

function setAlarm() {
  if (alermSetInput.value === "") {
    alert("Please enter the proper input");
  } else {
    // Turn string value to number
    let totalSeconds = alermSetInput.value;
    // convert sec to 00:00 form
    let timer = convertSecondsToMinutesAndSeconds(totalSeconds);
    // Show timer in time remaining
    timeRemaining.textContent = timer;
    document.body.style.backgroundColor = "green";

    // Set interval for timer
    intervalID = setInterval(() => {
      // Decrease time by 1 sec
      timer = decrementByOneSec(timer);
      if (timer === "00:00") {
        // timeRemaining.textContent = timer;
        document.body.style.backgroundColor = "red";
        // Deactive interval
        clearInterval(intervalID);
        // Active alarm
        playAlarm();
        // stop alarm after 100 s
        setTimeout(() => {
          stopAlerm();
        }, 100000);
        intervalColor = setInterval(() => {
          if (document.body.style.backgroundColor === "red") {
            document.body.style.backgroundColor = "white";
          } else {
            document.body.style.backgroundColor = "red";
          }
        }, 500);
      }
    }, 1000);
  }
}

// Convert number to a form of 00:00
function convertSecondsToMinutesAndSeconds(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  minutes.toString().padStart(2, "0");
  seconds.toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Decrease the timer by one second
function decrementByOneSec(time) {
  let [minutes, seconds] = time.split(":");
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  // back number to 00:00
  time = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  timeRemaining.textContent = time;
  return time;
}

// Stop alerm and reset input value
function stopAlerm() {
  clearInterval(intervalID);
  clearInterval(intervalColor);
  document.body.style.backgroundColor = "white";
  alermSetInput.value = "";
  timeRemaining.innerText = "00:00";
}

// DO NOT EDIT BELOW HERE

var audio = new Audio("alarmsound.mp3");

function setup() {
  document.getElementById("set").addEventListener("click", () => {
    setAlarm();
  });

  document.getElementById("stop").addEventListener("click", () => {
    pauseAlarm();
    stopAlerm();
  });
}

function playAlarm() {
  audio.play();
}

function pauseAlarm() {
  audio.pause();
}

window.onload = setup;
