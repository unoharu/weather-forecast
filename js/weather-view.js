function getRequiredElement(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }
  return element;
}

function formatNumber(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '-';
  }
  return String(Math.round(value));
}

export function createWeatherView() {
  const dom = {
    cityName: getRequiredElement('#name'),
    weather: getRequiredElement('#weather'),
    temperature: getRequiredElement('#temperature'),
    temperatureMax: getRequiredElement('#temperatureMax'),
    temperatureMin: getRequiredElement('#temperatureMin'),
    humidity: getRequiredElement('#humidity'),
    feelsLike: getRequiredElement('#feels_like'),
    pressure: getRequiredElement('#pressure'),
    speed: getRequiredElement('#speed'),
    deg: getRequiredElement('#deg'),
    clouds: getRequiredElement('#clouds'),
    sunrise: getRequiredElement('#sunrise'),
    sunset: getRequiredElement('#sunset'),
    weatherIcon: getRequiredElement('#weatherIcon')
  };

  function clearIcon() {
    while (dom.weatherIcon.firstChild) {
      dom.weatherIcon.removeChild(dom.weatherIcon.firstChild);
    }
  }

  function setLoading() {
    dom.weather.textContent = '取得中...';
  }

  function setError(message) {
    dom.weather.textContent = message;
    clearIcon();
  }

  function render(data, areaName) {
    const weatherData = data?.weather?.[0];
    const mainData = data?.main;
    const windData = data?.wind;
    const cloudData = data?.clouds;
    const systemData = data?.sys;

    dom.cityName.textContent = areaName || '---';
    dom.weather.textContent = weatherData?.description ?? '不明';

    dom.temperature.textContent = formatNumber(mainData?.temp);
    dom.temperatureMax.textContent = formatNumber(mainData?.temp_max);
    dom.temperatureMin.textContent = formatNumber(mainData?.temp_min);
    dom.humidity.textContent = formatNumber(mainData?.humidity);
    dom.feelsLike.textContent = formatNumber(mainData?.feels_like);
    dom.pressure.textContent = formatNumber(mainData?.pressure);
    dom.speed.textContent = formatNumber(windData?.speed);
    dom.deg.textContent = formatNumber(windData?.deg);
    dom.clouds.textContent = formatNumber(cloudData?.all);

    dom.sunrise.textContent = systemData?.sunrise
      ? formatTime(systemData.sunrise)
      : '--:--';
    dom.sunset.textContent = systemData?.sunset
      ? formatTime(systemData.sunset)
      : '--:--';

    clearIcon();
    if (weatherData?.icon) {
      const img = document.createElement('img');
      img.src = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
      img.alt = weatherData?.description ?? 'Weather icon';
      dom.weatherIcon.appendChild(img);
    }
  }

  function formatTime(unixSeconds) {
    const date = new Date(unixSeconds * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return {
    setLoading,
    setError,
    render
  };
}
