$(function () {
  $(".wrapper").height($(document).height());

  //анімація кнопок

  $("button").hover(
    function (event) {
      $(this)
        .children(".hover-btn")
        .css({
          left: event.pageX - $(this).position().left - 10 + "px",
          top: event.pageY - $(this).position().top - 10 + "px",
          width: "20px",
          height: "20px",
        })
        .animate(
          { height: "500px", width: "500px", left: "-=240px", top: "-=240px" },
          300
        );
    },

    function (event) {
      $(this)
        .children(".hover-btn")
        .css({
          left: event.pageX - $(this).position().left - 240 + "px",
          top: event.pageY - $(this).position().top - 240 + "px",
        })
        .animate(
          { height: "0px", width: "0px", left: "+=240px", top: "+=240px" },
          300
        );
    }
  );
});
