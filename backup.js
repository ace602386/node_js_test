const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('music'), (req, res) => {
  res.send('음악 파일이 업로드되었습니다.');
});

app.get('/audioFiles/:folder', (req, res) => {
    const folder = req.params.folder;
    const dirPath = path.join(__dirname, 'uploads', folder);
  
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error('디렉토리를 읽는 중 오류가 발생했습니다: ', err);
        res.status(500).send('서버 오류');
      } else {
        const audioFiles = files.filter(file => path.extname(file) === '.mp3');
        res.json(audioFiles);
      }
    });
  });

app.use(express.static('uploads'));

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
