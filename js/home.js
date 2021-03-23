$(function () {
  $(".wrapper").height($(document).height());
  let toggleNum = 0;

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
      if (toggleNum == 0) {
        $(this).children("a").animate({ color: "#ffffff" }, 300);
      } else {
        $(this).children("a").animate({ color: "#181818" }, 300);
      }
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
      if (toggleNum == 0) {
        $(this).children("a").animate({ color: "#383838" }, 300);
      } else {
        $(this).children("a").animate({ color: "#d0d0d0" }, 300);
      }
    }
  );

  //перемикач тем

  $(".night-toggle").click(function () {
    if (toggleNum == 0) {
      $(this).css("background", "#606060");
      $(".toggle").css({ left: "28px", background: "#303030" });
      $(".wrapper").css("background", "#181818");
      $("header").css("border-bottom", "1px solid #303030");
      $(".logo span").css("color", "#f5f5f5");
      $(".content .hello").css("color", "#f5f5f5");
      $(".content a").css("color", "#d0d0d0");
      $("footer").css("border-top", "1px solid #303030");
      $(".copy").css("color", "#f5f5f5");
      toggleNum = 1;
    } else {
      $(this).css("background", "#d3d3d3");
      $(".toggle").css({ left: "2px", background: "#f5f5f5" });
      $(".wrapper").css("background", "#fff");
      $("header").css("border-bottom", "1px solid #f0f0f0");
      $(".logo span").css("color", "#181818");
      $(".content .hello").css("color", "#181818");
      $(".content a").css("color", "#383838");
      $("footer").css("border-top", "1px solid #f0f0f0");
      $(".copy").css("color", "#181818");
      toggleNum = 0;
    }
  });
});
