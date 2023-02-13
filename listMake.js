const fs = require("fs");

/**
 * list.js 파일 자동생성기
 * @param {string} FOLDER 폴더 이름을 입력해주세요.
 */
module.exports = function(FOLDER) {
  console.log(`\n\n\n${FOLDER}/file 폴더에 .mp3 파일들 확인중...`);
  const item = fs.readdirSync(`./sounds/${FOLDER}/file`).map(val => val.replace(".mp3",""));
  console.log(`${FOLDER}/file 폴더에 .mp3 파일들 확인완료`);
  console.log(`${FOLDER} 폴더에 list.js 파일 생성중...`);
  fs.writeFileSync(`./sounds/${FOLDER}/list.js`, `/**\n * 파일이름은 정답으로 설정해주세요.\n[\n  "파일이름",\n  "파일이름"\n]\n*/\n\n`+JSON.stringify(item, undefined, 2), "utf-8");
  console.log(`${FOLDER} 폴더에 list.js 파일 생성완료\n\n`);
  
}