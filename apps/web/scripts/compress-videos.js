const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '../public/videos');
const files = ['hero-ambuluwawa.mp4', 'sigiriya.mp4', 'elephant.mp4'];

for (const file of files) {
  const input = path.join(videosDir, file);
  const tempOutput = path.join(videosDir, 'opt-' + file);
  
  if (!fs.existsSync(input)) {
    console.log(`Skipping ${file}: not found`);
    continue;
  }
  
  const originalSize = fs.statSync(input).size / (1024 * 1024);
  console.log(`Compressing ${file} (original: ${originalSize.toFixed(2)} MB)...`);
  
  // 1280x720, crf 28, preset veryfast, strip audio (since muted background hero), movflags +faststart
  try {
    execSync(`"${ffmpeg.path}" -i "${input}" -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset veryfast -an -movflags +faststart "${tempOutput}" -y`, { stdio: 'pipe' });
    const newSize = fs.statSync(tempOutput).size / (1024 * 1024);
    console.log(`-> Compressed ${file}: ${newSize.toFixed(2)} MB`);
    
    // Replace original
    fs.renameSync(tempOutput, input);
  } catch (err) {
    console.error(`Error compressing ${file}:`, err.message);
    if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
  }
}

console.log('All videos processed.');
