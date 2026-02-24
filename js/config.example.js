const config = {
  apiKey: 'YOUR_OPENWEATHER_API_KEY',
  defaultLocation: {
    name: '東京',
    lat: 35.6905,
    lon: 139.6995
  },
  requestTimeoutMs: 8000,
  map: {
    minWidth: 240,
    maxWidth: 700,
    padding: 12,
    resizeThreshold: 8,
    resizeDebounceMs: 120
  }
};

export default config;
