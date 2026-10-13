module.exports = {
  apps: [
    {
      name: 'anthony-holidays-cms',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      cwd: './apps/cms', // or './' if running from cms standalone root
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: '/var/log/pm2/anthony-cms-error.log',
      out_file: '/var/log/pm2/anthony-cms-out.log',
      merge_logs: true,
      time: true,
    },
  ],
}
