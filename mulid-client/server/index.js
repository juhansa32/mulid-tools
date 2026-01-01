const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload-and-convert', upload.single('file'), (req, res) => {
  if(!req.file) return res.status(400).send('file required');
  const target = req.body.target || 'mp4';
  const inPath = req.file.path;
  const outName = path.basename(req.file.originalname, path.extname(req.file.originalname)) + '.' + target;
  const outPath = path.join('uploads', 'out-' + Date.now() + '-' + outName);

  // Example ffmpeg command: adapt for your target / options
  const args = ['-i', inPath, '-c:v', 'libx264', '-crf', '23', '-preset', 'veryfast', outPath];
  if(target === 'mp3') args.splice(2, 0, '-vn', '-b:a', '192k'); // simple tweak for mp3

  const ff = spawn('ffmpeg', args);

  ff.stderr.on('data', d => console.log(String(d)));
  ff.on('error', err => {
    console.error(err); res.status(500).send('ffmpeg spawn error');
  });
  ff.on('close', code => {
    if(code !== 0) { res.status(500).send('ffmpeg failed'); cleanup(); return; }
    // stream file back
    res.download(outPath, outName, err => { cleanup(); });
  });

  function cleanup(){
    try{ fs.unlinkSync(inPath); }catch(e){}
    try{ fs.unlinkSync(outPath); }catch(e){}
  }
});

app.listen(3000, ()=> console.log('Server listening on :3000'));
