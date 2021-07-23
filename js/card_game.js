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
        selected.push(i);
        $(".cardList li").eq(i).find(".front").addClass("face").siblings().removeClass("face");

        if (cards[selected[0]].name == cards[selected[1]].name) {
          console.log("일치");
          score++;
          console.log("🚀 ~ file: card_game.js ~ line 22 ~ score", score);
          emptySelected();
        } else {
          console.log("불일치");
          setTimeout(function () {
            delay = true;
            $.each(selected, function (i, item) {
              $(".cardList li")
                .eq(item)
                .find(".back")
                .addClass("face")
                .siblings()
                .removeClass("face");
            });
            emptySelected();
          }, 1000);
        }
        function emptySelected() {
          if (selected[1]) selected = [];
          delay = false;
        }
      }
    }
  },
});
