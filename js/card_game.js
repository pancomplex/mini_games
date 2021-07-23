$.ajax({
  url: "../data/card_game/animal.json",
  success: function (res) {
    const path = res.path;
    let cards = res.cards;
    cards = cards.concat(cards);
    cards.sort(function () {
      return Math.random() - Math.random();
    });

    $.each(cards, function (i, item) {
      $(".cardList").append(`<li>
        <div class="front">
          <img src="${path + item.img}" alt="${item.name}">
          <h4 class="title">${item.name}</h4>
        </div>
        <div class="back face"></div>
      </li>`);
    });

    let score = 0;
    let failTime = null;
    let selected = new Array();
    let delay = false;
    $(".cardList li").on("click", function () {
      let opened = $(this).find(".front").hasClass("face");
      if (!delay && !opened) {
        console.log("clicked");

        let i = $(this).index();
        select(i);
      }
    });

    function select(i) {
      if (!selected[1]) {
        clearTimeout(failTime);

        selected.push(i);
        $(".cardList li").eq(i).find(".front").addClass("face").siblings().removeClass("face");

        if (selected[1]) {
          if (cards[selected[0]].name == cards[selected[1]].name) {
            console.log("일치");
            score++;
            emptySelected();
          } else {
            console.log("불일치");
            delay = true;

            new Promise(function (resolve, reject) {
              failTime = setTimeout(function () {
                $.each(selected, function (i, item) {
                  $(".cardList li")
                    .eq(item)
                    .find(".back")
                    .addClass("face")
                    .siblings()
                    .removeClass("face");
                });
              }, 1000);
              resolve();
            }).then(() => {
              emptySelected();
            }); // Promise 문법 공부 필요... 그전까진 오작동
          }
          function emptySelected() {
            if (selected[1]) selected = [];
            delay = false;
          }
        }
      }
    }
  },
});
