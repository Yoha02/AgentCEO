export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize Datadog HTTP API client
    const { initDatadog } = await import('./src/lib/datadog');
    initDatadog();
  }
}
