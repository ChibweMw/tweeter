$(document).ready(function () {
  $('textarea').on('keyup', function () {
    var counter = $(this).closest(".container").find('.counter');
    var charLimit = 140;
    var charCount = charLimit - this.value.length;
    (charCount < 0) ? counter.addClass("red") : counter.removeClass("red");
    counter.text(charCount);
  });
});