/**
 * @type { { quiz?: string } }
 */
const parmas = location.search.split(/[?&]/).slice(1).map(paramPair => paramPair.split(/=(.+)?/).slice(0,2)).reduce((obj, pairArray) => {
  obj[pairArray[0]] = pairArray[1];
  return obj;
}, {});

$(`.list`).load("./quiz_list.js", (txt, status) => {
  if (status == "error") {
    $(`.main`).html(`<h1>파일을 불러올수 없음</h1>`);
  } else {
    /**
     * @type { { [key: string]: { desc: string; complite: number; start: boolean; } } }
     */
    let quiz_list = {};
    if (parmas.quiz) {
      let quizName = decodeURIComponent(parmas.quiz);
      quiz_list = eval(txt)[0];
      if (Object.keys(quiz_list).includes(quizName)) {
        $(`.list`).load(`./sounds/${parmas.quiz}/list.js`, (txt2, status2) => {
          if (status2 == "error") {
            $(`.main`).html(`<h1>${quizName} 퀴즈정보를 불러올수 없음</h1>`);
          } else {
            /**
             * @type { { desc: string; complite: number; start: boolean; } }
             */
            let quiz = quiz_list[quizName];
            /**
             * @type { string[] }
             */
            let sound_list = eval(txt2);
            var text = `<div class="back"><a href="/">돌아가기</a></div></div><div class="info"><div class="title">${quizName}</div><div class="desc">설명 : ${quiz.desc}</div><div class="complite">완성도 : ${quiz.complite}%</div><div class="start">시작가능여부 : ${quiz.start ? "TRUE" : "FALSE"}</div><div class="length">문제수 : ${sound_list.length}개</div></div>\n`;
            for (let i of sound_list) {
              text += `<div class="sound"><div class="name">${i}</div><div class="audio"><audio src="./sounds/${parmas.quiz}/file/${encodeURIComponent(i)}.mp3" controls>오디오를 재생할수 없는 기기입니다.</audio></div></div>`;
            }
            $(`.main`).html(text);
          }
        });
      } else {
        $(`.main`).html(`<h1>${quizName} 퀴즈정보를 찾을수 없음</h1>`);
      }
    } else {
      quiz_list = eval(txt)[0];
      var text = `<div class="title">퀴즈 목록</div>\n`;
      for (let i in quiz_list) {
        text += `<div class="quiz"><a class="text" href="?quiz=${i}">${i}</a></div>\n`;
      }
      $(`.main`).html(text);
    }
  }
});