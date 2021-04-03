window.onload = function () {
  loadClient();
};

function loadClient() {
  gapi.client.setApiKey("AIzaSyBDPJME8wEwB32AtXkKI6EcMIvXaQoDRaE");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

let subscriberAr = new Array(),
  videoAr = new Array(),
  viewAr = new Array();

$("#globalInfo").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        $("#idChanel").val("");
        let $table = $("#table");
        let postTemplate = $("#order-template").html();
        let post = {
          title: response.result.items[0].snippet.title,
          date: response.result.items[0].snippet.publishedAt,
          subscriber: response.result.items[0].statistics.subscriberCount,
          video: response.result.items[0].statistics.videoCount,
          view: response.result.items[0].statistics.viewCount,
        };

        $table.append(Mustache.render(postTemplate, post));
        $(".table").show(300);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});

$("#compare").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        $("#idChanel").val("");
        let $table = $("#table");
        let postTemplate = $("#order-template").html();
        let post = {
          title: response.result.items[0].snippet.title,
          date: response.result.items[0].snippet.publishedAt,
          subscriber: response.result.items[0].statistics.subscriberCount,
          video: response.result.items[0].statistics.videoCount,
          view: response.result.items[0].statistics.viewCount,
        };

        $table.append(Mustache.render(postTemplate, post));
        $(".table").show(300);

        subscriberAr.push(parseFloat(post.subscriber));
        videoAr.push(parseFloat(post.video));
        viewAr.push(parseFloat(post.view));

        if (subscriberAr.length > 1) {
          let subscriber = subscriberAr[0],
            video = videoAr[0],
            view = viewAr[0],
            subscriberNum = 0,
            videoNum = 0,
            viewNum = 0;

          for (let i = 0; i < subscriberAr.length; i++) {
            if (subscriber < subscriberAr[i]) {
              subscriber = subscriberAr[i];
              subscriberNum = i;
            }
          }
          for (let i = 0; i < videoAr.length; i++) {
            if (video < videoAr[i]) {
              video = videoAr[i];
              videoNum = i;
            }
          }
          for (let i = 0; i < viewAr.length; i++) {
            if (view < viewAr[i]) {
              view = viewAr[i];
              viewNum = i;
            }
          }
          $(".arTSub").css("display", "none");
          $(".arTVid").css("display", "none");
          $(".arTView").css("display", "none");

          $(".arTSub").eq(subscriberNum).css("display", "block");
          $(".arTVid").eq(videoNum).css("display", "block");
          $(".arTView").eq(viewNum).css("display", "block");
        }
        if (subscriberAr.length > 2) {
          let subscriber = subscriberAr[0],
            video = videoAr[0],
            view = viewAr[0],
            subscriberNum = 0,
            videoNum = 0,
            viewNum = 0;

          for (let i = 0; i < subscriberAr.length; i++) {
            if (subscriber > subscriberAr[i]) {
              subscriber = subscriberAr[i];
              subscriberNum = i;
            }
          }
          for (let i = 0; i < videoAr.length; i++) {
            if (video > videoAr[i]) {
              video = videoAr[i];
              videoNum = i;
            }
          }
          for (let i = 0; i < viewAr.length; i++) {
            if (view > viewAr[i]) {
              view = viewAr[i];
              viewNum = i;
            }
          }
          $(".arBSub").css("display", "none");
          $(".arBVid").css("display", "none");
          $(".arBView").css("display", "none");

          $(".arBSub").eq(subscriberNum).css("display", "block");
          $(".arBVid").eq(videoNum).css("display", "block");
          $(".arBView").eq(viewNum).css("display", "block");
        }
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});

$("#sortingInfo").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        $("#idChanel").val("");
        let $table = $("#table");
        let postTemplate = $("#order-template").html();
        let post = {
          title: response.result.items[0].snippet.title,
          date: response.result.items[0].snippet.publishedAt,
          subscriber: response.result.items[0].statistics.subscriberCount,
          video: response.result.items[0].statistics.videoCount,
          view: response.result.items[0].statistics.viewCount,
        };

        $table.append(Mustache.render(postTemplate, post));
        $(".table").show(300);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});

gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});
