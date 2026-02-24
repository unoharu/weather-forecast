export function startClock(element, intervalMs = 60000) {
  if (!element) {
    throw new Error('Clock element not found.');
  }

  function update() {
    const nowTime = new Date();
    const nowHour = nowTime.getHours().toString().padStart(2, '0');
    const nowMin = nowTime.getMinutes().toString().padStart(2, '0');
    element.textContent = `${nowHour}:${nowMin}`;
  }

  update();
  return setInterval(update, intervalMs);
}
