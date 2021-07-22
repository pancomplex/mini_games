let computerSel = 0;
let humanSel = 0;
let random = function () {};
let isRoll = false;
let checked = false;
let score = [];

function play() {
  random = setInterval(function () {
    isRoll = true;
    computerSel = Math.floor(Math.random() * 3);
    $("#computer img").eq(computerSel).show().siblings().hide();
  }, 100);
}
play();

$("#human img").on("click", function () {
  if (checked == false) {
    clearInterval(random);
    isRoll = false;
    humanSel = $(this).index();

    let who_win = (computerSel - humanSel + 3) % 3;

    switch (who_win) {
      case 0: // 비겼을 때
        $("#result").append(`<span class="draw">D</span>`);
        checked = true;
        score.push(0);
        break;
      case 1: // 휴먼이 졌을 때
        $("#result").append(`<span class="lose">L</span>`);
        checked = true;
        score.push(-1);
        break;
      case 2: // 휴먼이 이겼을 때
        $("#result").append(`<span class="win">W</span>`);
        checked = true;
        score.push(1);
        break;
      default:
        alert("뭔가가 잘못된거같아요.. 다시 실행해주세요.");
        console.log("computer" + computerSel, "human" + humanSel);
        reset();
    }

    if (score.length == 3) {
      let sum = score[0] + score[1] + score[2];
      let final = "";
      if (sum > 0) {
        final = "승리";
      } else if (sum < 0) {
        final = "패배";
      } else {
        final = "무승부";
      }

      $(".modal").addClass("on").children(".txt").text(final);
    }

    if (isRoll == false) {
      setTimeout(replay, 1500);
    }
  }
});

function replay() {
  checked = false;
  play();
}

function reset() {
  score = [];
  $("#result").html("");
  $(".modal").removeClass("on").children(".txt").text("");
}

$(".reset").on("click", reset);
