const express = require('express');
const cors = require('cors'); // CORSモジュールをインポート
const fs = require('fs');
const https = require('https'); // HTTPSモジュールをインポート

const app = express();
let effectTriggered = false;

app.use(cors()); // CORSを全てのオリジンに対して許可する
app.use(express.json());

// 自己署名証明書または有効な証明書を指定
const options = {
  key: fs.readFileSync('C:/Users/gaava/sumahotest/server.key'), // 自己署名証明書の秘密鍵のパス
  cert: fs.readFileSync('C:/Users/gaava/sumahotest/server.crt') // 自己署名証明書の証明書のパス
};

app.post('/trigger', (req, res) => {
  effectTriggered = true;
  res.sendStatus(200);
});

app.get('/check', (req, res) => {
  if (effectTriggered) {
    res.send('triggered');
    effectTriggered = false; // リセットする
  } else {
    res.send('waiting');
  }
});

// HTTPSサーバーを起動
https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS Server is running on port 3000');
});
