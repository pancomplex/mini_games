//임시
$("#main .inner").load(`./html/card_game.html`);

function changeHtml(nextGame) {
  $("#main .inner").html("").load(`./html/${nextGame}.html`);
}

function changeStyle(nextGame) {
  $("#changeStyle").attr("href", `./css/${nextGame}.css`);
}

function changeGame(nextGame) {
  changeHtml(nextGame);
  changeStyle(nextGame);
}

let gameList = ["rps", "card_game"]; // rps : rock-paper-scissors

$("#logo").on("click", function () {
  changeGame("home");
});

//gnb 제어
$.each(gameList, function (i, item) {
  $("#gnb").append(`<li>${item}</li>`);
});
$("#gnb li").on("click", function () {
  $(this).addClass("on").siblings().removeClass("on");
  changeGame($(this).text());
});
