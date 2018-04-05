//require
const chokidar = require("chokidar");
const exec = require('child_process').exec;

//chokidarの初期化
var watcher = chokidar.watch('./docs/**/*.mmd', {
  ignored: /[\/\\]\./,
  persistent: true
});

//イベント定義
watcher.on('ready', function() {

  //準備完了
  console.log("ready watching...");

  //ファイルの追加
  watcher.on('add', function(path) {
    console.log(path + " added.");
  });

  //ファイルの編集
  watcher.on('change', function(path) {
    console.log(path + " changed.");
    exec(`npx mmdc -i ${path} -o ${path}.png`, (err, stdout, stderr) => {
      if (err) { console.log(err); }
      console.log(stdout);
    });
  });
});
