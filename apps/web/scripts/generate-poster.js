const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { execSync } = require('child_process');
const fs = require('fs');

execSync(`"${ffmpeg.path}" -i apps/web/public/images/hero-poster.jpg -c:v libwebp -quality 75 apps/web/public/images/hero-poster.webp -y`, { stdio: 'inherit' });

const stats = fs.statSync('apps/web/public/images/hero-poster.webp');
console.log('Webp poster size:', (stats.size / 1024).toFixed(1) + ' KB');
