// Timer Utility

export function startTimer(
  duration,
  onTick,
  onTimeUp
) {

  let timeLeft = duration;

  const timerInterval = setInterval(() => {

    timeLeft--;

    onTick(timeLeft);

    if (timeLeft <= 0) {

      clearInterval(timerInterval);

      onTimeUp();

    }

  }, 1000);

  return timerInterval;
}



// Format Time (mm:ss)

export function formatTime(seconds) {

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return (
    `${minutes}:` +
    `${remainingSeconds < 10 ? "0" : ""}` +
    remainingSeconds
  );

}