export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize Datadog tracer for Node.js runtime
    const { initDatadog } = await import('./src/lib/datadog');
    initDatadog();
  }
}
