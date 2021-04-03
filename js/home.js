$(function () {
  $(".wrapper").height($(document).height());
  //сховати таблицю показу
  $(".table").hide(0);
  //=====================
  let toggleNum = 0;

  //анімація кнопок

  $("button").hover(
    function (event) {
      let scale = $(this).width();
      if ($(this).attr("class") == "task") {
        $(this)
          .children(".hover-btn")
          .css({
            left: -10,
            top: $(this).height() / 2 - 10,
            width: "20px",
            height: "20px",
          })
          .animate(
            {
              height: scale,
              width: scale,
              top: -scale / 2 + $(this).height() / 2,
            },
            300
          );
      } else {
        $(this)
          .children(".hover-btn")
          .css({
            left: event.pageX - $(this).position().left - 10 + "px",
            top: event.pageY - $(this).position().top - 10 + "px",
            width: "20px",
            height: "20px",
          })
          .animate(
            {
              height: 700,
              width: 700,
              left: "-=340",
              top: "-=340",
            },
            300
          );
      }

      if (toggleNum == 0) {
        $(this).children("a").animate({ color: "#ffffff" }, 300);
      } else {
        $(this).children("a").animate({ color: "#181818" }, 300);
      }
    },

    function (event) {
      let scale = $(this).width();
      if ($(this).attr("class") == "task") {
        $(this)
          .children(".hover-btn")
          .animate(
            {
              height: "0px",
              width: "0px",
              top: $(this).height() / 2,
            },
            300
          );
      } else {
        $(this)
          .children(".hover-btn")
          .css({
            left: event.pageX - $(this).position().left - 240 + "px",
            top: event.pageY - $(this).position().top - 240 + "px",
          })
          .animate(
            {
              height: "0px",
              width: "0px",
              left: "+=240",
              top: "+=240",
            },
            300
          );
      }

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
      $(".content-analitics__title").css("color", "#f5f5f5");
      $(".task a").css("color", "#d0d0d0");
      $(".back a").css("color", "#f5f5f5");
      $("#arrow path").css("fill", "#f5f5f5");
      $(".task-container").css("color", "#f5f5f5");

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
      $(".content-analitics__title").css("color", "#181818");
      $(".task a").css("color", "#383838");
      $(".back a").css("color", "#181818");
      $("#arrow path").css("fill", "#181818");
      $(".task-container").css("color", "#181818");

      toggleNum = 0;
    }
  });
 
});
