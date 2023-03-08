let minute = document.getElementById("minute");
let second = document.getElementById("second");
let hour = document.getElementById("hour");
let alarmContainer = document.getElementById("alarmSet");
let timeContainer = document.getElementById("timerContainer");
let runTime = document.getElementById("reverseTime");
let clock = document.getElementById("clock");
let stop = document.getElementById("stop");
let audio = new Audio("sound/sound.mp3");

////////////////// Digital watch //////////////////////

setInterval(() => {
  let currentDate = new Date();

  let getHour = currentDate.getHours();
  let getMinute = currentDate.getMinutes();
  let getSecond = currentDate.getSeconds();

  hour.innerHTML = getHour;
  minute.innerHTML = getMinute;
  second.innerHTML = getSecond;

  if (getHour < 10) {
    hour.innerHTML = "0" + getHour;
  }
  if (getMinute < 10) {
    minute.innerHTML = "0" + getMinute;
  }
  if (getSecond < 10) {
    second.innerHTML = "0" + getSecond;
  }
}, 1000);

////////////////// alarm setting container ////////////////////////

alarmContainer.innerHTML = `<select name="" id="setHour" class="input"></select>
<select name="" id="SetMinute" class="input"></select>
<select name="" id="SetSeond" class="input"></select>
<button id="btn" >Set Alarm</button>`;

let setHour = document.getElementById("setHour");
let setMinute = document.getElementById("SetMinute");
let setSecond = document.getElementById("SetSeond");

for (let i = 0; i < 24; i++) {
  let createOption = document.createElement("option");
  if (i < 10) {
    createOption.innerHTML = "0" + i;
  } else {
    createOption.innerHTML = i;
  }
  setHour.appendChild(createOption);
}
for (let i = 0; i < 60; i++) {
  let createOption = document.createElement("option");
  if (i < 10) {
    createOption.innerHTML = "0" + i;
  } else {
    createOption.innerHTML = i;
  }
  setMinute.appendChild(createOption);
}
for (let i = 0; i < 60; i++) {
  let createOption = document.createElement("option");
  if (i < 10) {
    createOption.innerHTML = "0" + i;
  } else {
    createOption.innerHTML = i;
  }
  setSecond.appendChild(createOption);
}

///////////////// Alarm setting on set button ///////////////////

let button = document.getElementById("btn");

button.addEventListener("click", () => {
  let currentDate = new Date();

  let getHour = currentDate.getHours();
  let getMinute = currentDate.getMinutes();
  let getSecond = currentDate.getSeconds();

  let setHourValue = setHour.value;
  let setMinuteValue = setMinute.value;
  let setSecondValue = setSecond.value;

  /////// calculation for alarm ///////////

  let hourDiff = (parseInt(setHourValue) - parseInt(getHour)) * 3600;
  let minuteDiff = (parseInt(setMinuteValue) - parseInt(getMinute)) * 60;
  let secondDiff = parseInt(setSecondValue) - parseInt(getSecond);

  let alarmTime = hourDiff + minuteDiff + secondDiff;

  if (alarmTime < 0) {
    alert("Please select time greater than running time.");
    return;
  }

  ///////// disable alarm button //////

  button.style.cursor = "not-allowed";
  button.style.opacity = "0.6";

  ////////// alarm time counter ////////

  let i = alarmTime - 1;
  let counting = setInterval(() => {
    runTime.innerHTML = i;
    i--;
    if (i < 0) {
      clearInterval(counting);
    }
  }, 1000);

  ///////// Playing ring sound /////////

  setTimeout(() => {
    clock.classList.add("ring");
    stop.style.display = "flex";

    audio.loop = true;
    audio.play();
  }, alarmTime * 1000);
});

//////////////////// Alarm stop button //////////////////////

stop.addEventListener("click", () => {
  clock.classList.remove("ring");
  audio.pause();

  setTimeout(() => {
    stop.style.display = "none";
  }, 2000);
  
});
