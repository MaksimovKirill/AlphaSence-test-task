const apps = [];

apps.push({
  name: 'server',
  script: 'bin/server.js',
  wait: true,
  watch: process.NODE_ENV !== 'production',
  instances: 1,
  max_memory_restart: '1G',
  kill_timeout: 30000,
  env: {
    NODE_PATH: './modules',
    NODE_ENV: 'production',
    PM2_GRACEFUL_TIMEOUT: 30000,
  },
});


for (const app of apps) {
  // env vars override any env
  for (const key in app.env) {
    if (process.env[key]) {
      app.env[key] = process.env[key];
    }
  }
}

module.exports = { apps };
