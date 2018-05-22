$(document).ready(function () {
  $('textarea').on('keyup', function () {
    var counter = $(this).closest(".container").find('.counter');
    var charLimit = 140;
    var charCount = charLimit - this.value.length;
    counter.text(charCount);
  });
});