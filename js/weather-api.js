function buildWeatherApiUrl(lat, lon, apiKey) {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lon));
  url.searchParams.set('lang', 'ja');
  url.searchParams.set('units', 'metric');
  url.searchParams.set('appid', apiKey);
  return url.toString();
}

export async function fetchWeather({ lat, lon, apiKey, timeoutMs = 8000, signal }) {
  if (!apiKey) {
    throw new Error('Missing OpenWeather API key.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(buildWeatherApiUrl(lat, lon, apiKey), {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
