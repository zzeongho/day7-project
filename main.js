function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();

  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  if (seconds.toString().length === 1) {
    seconds = "0" + seconds;
  }

  time.innerHTML = `${hours}:${minutes}:${seconds}`;
}

getTime();

setInterval(getTime, 1000);
