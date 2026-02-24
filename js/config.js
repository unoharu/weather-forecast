export async function loadConfig() {
  try {
    const module = await import('./config.local.js');
    return module.default;
  } catch (error) {
    const module = await import('./config.example.js');
    return module.default;
  }
}
