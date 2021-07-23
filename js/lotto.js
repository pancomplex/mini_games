function select() {
  let lotto = [];
  for (let i = 1; i < 46; i++) lotto.push(i);

  lotto.sort(function () {
    return Math.random() - Math.random();
  });

  let selectedLotto = lotto.slice(0, 6);

  selectedLotto.sort(function (a, b) {
    return a - b;
  });

  $("#result").append(`<ul></ul>`);
  $.each(selectedLotto, function (i, item) {
    $("#result ul").last().append(`<li>${item}</li>`);
  });
}
select();

$(".reset").on("click", function () {
  reset();
});

function reset() {
  $("#result").html("");
  //$("#selectGame").val(1);
  select();
}

$("#selectGame").on("change", function () {
  $("#result").html("");
  for (let j = 0; j < $(this).val(); j++) {
    select();
  }
});
