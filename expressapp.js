// 필요한 모듈을 불러옵니다.
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

// express 앱을 생성합니다.
const app = express();

// cors 미들웨어를 사용하여 CORS 문제를 해결합니다.
app.use(cors());

// AWS SDK를 설정합니다.
AWS.config.update({
    accessKeyId: 'AKIA4MTWIBMIHY4BMFTM',
    secretAccessKey: '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'
});

// S3 서비스 객체를 생성합니다.
const s3 = new AWS.S3();

// '/audioFiles/:folderNumber' 경로로 GET 요청이 오면 실행할 함수를 정의합니다.
app.get('/audioFiles/:folderNumber_mp3', (req, res) => {
    console.log(req.params.folderNumber);
    const params = {
        Bucket: 'myasmrvoice',
        Prefix: req.params.folderNumber
    };
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.error(err, err.stack);
            res.status(500).send('서버에서 오류가 발생했습니다');
        } else {
            const audioFiles = data.Contents.map(obj => obj.Key);
            console.log(audioFiles);
            console.log(req.params.folderNumber);
            res.json(audioFiles);
        }
    });
});



// 서버를 4000 포트에서 실행합니다.
app.listen(4000, () => console.log('서버가 4000포트에서 실행 중입니다.'));
