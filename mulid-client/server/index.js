const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: uploadDir });

app.post('/upload-and-convert', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('file required');

  // 🔴 임시: 변환 안 하고 서버만 살아있는지 확인
  res.json({
    status: 'ok',
    filename: req.file.originalname,
    message: 'Server is alive. Conversion will be enabled later.'
  });

  // 파일 정리
  try { fs.unlinkSync(req.file.path); } catch (e) {}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening on :' + PORT);
});
