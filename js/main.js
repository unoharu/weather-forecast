import { createJapanMap } from './map.js';
import { startClock } from './clock.js';
import { createWeatherView } from './weather-view.js';
import { fetchWeather } from './weather-api.js';
import { MAP_AREAS, findMarkerByAreaName } from './prefectures.js';
import { loadConfig } from './config.js';

function isPlaceholderKey(apiKey) {
  return !apiKey || apiKey.includes('YOUR_OPENWEATHER_API_KEY');
}

function normalizeLon(location) {
  return location.lon ?? location.lng;
}

async function init() {
  const config = await loadConfig();
  const view = createWeatherView();
  const clockElement = document.getElementById('RealtimeClockArea');

  startClock(clockElement);

  if (isPlaceholderKey(config.apiKey)) {
    view.setError('APIキーが設定されていません');
    return;
  }

  const map = createJapanMap({
    containerId: 'my-map',
    areas: MAP_AREAS,
    resolveMarker: findMarkerByAreaName,
    onSelect: ({ areaName, marker }) => {
      loadWeather(areaName, marker, config, view);
    },
    options: config.map
  });

  map.render();
  window.addEventListener('resize', map.handleResize);

  loadWeather(config.defaultLocation.name, config.defaultLocation, config, view);
}

let activeController = null;

async function loadWeather(areaName, location, config, view) {
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();
  view.setLoading();

  try {
    const data = await fetchWeather({
      lat: location.lat,
      lon: normalizeLon(location),
      apiKey: config.apiKey,
      timeoutMs: config.requestTimeoutMs,
      signal: activeController.signal
    });

    view.render(data, areaName);
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }
    console.error('天気情報の取得に失敗しました:', error);
    view.setError('天気情報の取得に失敗しました');
  } finally {
    activeController = null;
  }
}

init();
