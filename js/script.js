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
  viewAr = new Array(),
  comentAr = new Array(),
  token,
  click = 0,
  comCount = 0;
//Глобальна інформація=============

$("#globalInfo,#sortingInfo").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        $("#idChanel").val("");
        let x = 0;
        let $tbody = $("#tbody");
        let postTemplate = $("#order-template").html();
        if (localStorage.getItem("settingCache") == "true") {
          let posts = JSON.parse(sessionStorage.getItem("posts"));
          for (let i = 0; i < posts.length; i++) {
            if (posts[i].title == response.result.items[0].snippet.title) {
              x = 1;
              $tbody.append(Mustache.render(postTemplate, posts[i]));
              $(".table").show(300);
              return;
            }
          }
          if (x != 1) {
            let post = {
              title: response.result.items[0].snippet.title,
              date: response.result.items[0].snippet.publishedAt,
              subscriber: response.result.items[0].statistics.subscriberCount,
              video: response.result.items[0].statistics.videoCount,
              view: response.result.items[0].statistics.viewCount,
            };
            posts.push(post);
            sessionStorage.setItem("posts", JSON.stringify(posts));

            $tbody.append(Mustache.render(postTemplate, post));
            $(".table").show(300);
          }
        } else {
          let post = {
            title: response.result.items[0].snippet.title,
            date: response.result.items[0].snippet.publishedAt,
            subscriber: response.result.items[0].statistics.subscriberCount,
            video: response.result.items[0].statistics.videoCount,
            view: response.result.items[0].statistics.viewCount,
          };

          $tbody.append(Mustache.render(postTemplate, post));
          $(".table").show(300);
        }
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});

// порівняння==================

$("#compare").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        $("#idChanel").val("");
        let x = 0,
          post,
          $tbody = $("#tbody"),
          postTemplate = $("#order-template").html();
        if (localStorage.getItem("settingCache") == "true") {
          let posts = JSON.parse(sessionStorage.getItem("posts"));
          for (let i = 0; i < posts.length; i++) {
            if (posts[i].title == response.result.items[0].snippet.title) {
              x = 1;
              post = posts[i];
              $tbody.append(Mustache.render(postTemplate, post));
              $(".table").show(300);
            }
          }
          if (x != 1) {
            post = {
              title: response.result.items[0].snippet.title,
              date: response.result.items[0].snippet.publishedAt,
              subscriber: response.result.items[0].statistics.subscriberCount,
              video: response.result.items[0].statistics.videoCount,
              view: response.result.items[0].statistics.viewCount,
            };
            posts.push(post);
            sessionStorage.setItem("posts", JSON.stringify(posts));

            $tbody.append(Mustache.render(postTemplate, post));
            $(".table").show(300);
          }
        } else {
          post = {
            title: response.result.items[0].snippet.title,
            date: response.result.items[0].snippet.publishedAt,
            subscriber: response.result.items[0].statistics.subscriberCount,
            video: response.result.items[0].statistics.videoCount,
            view: response.result.items[0].statistics.viewCount,
          };

          $tbody.append(Mustache.render(postTemplate, post));
          $(".table").show(300);
        }

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

//медіа резонанс==============

$("#globalMedia,#sortingMedia").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        //вивід коментарів========
        let t = 0,
          timer;
        function execute() {
          if (click == 0) {
            return gapi.client.youtube.commentThreads
              .list({
                part: ["snippet,replies"],
                allThreadsRelatedToChannelId: $("#idChanel").val(),
                maxResults: 100,
              })
              .then(
                function (response) {
                  $("#animEl").addClass("animate");
                  token = response.result.nextPageToken;
                  comCount += response.result.pageInfo.totalResults;

                  if (localStorage.getItem("settingTime") == "true") {
                    timer = setInterval(() => {
                      t += 10;
                      $(".timer").text(t + "ms");
                    }, 10);
                  }

                  click = 1;
                  execute();
                },
                function (err) {
                  console.error("Execute error", err);
                }
              );
          } else {
            if (token == null) {
              $("#animEl").removeClass("animate");
              comment(comCount);

              clearInterval(timer);
              setTimeout(() => {
                $(".timer").text("");
              }, 4000);

              token = null;
              click = 0;
              comCount = 0;
              return;
            } else {
              if (comCount > 1000) {
                comCount = ">1000";
                $("#animEl").removeClass("animate");
                comment(comCount);

                clearInterval(timer);
                setTimeout(() => {
                  $(".timer").text("");
                }, 4000);

                token = null;
                click = 0;
                comCount = 0;
                return;
              } else {
                return gapi.client.youtube.commentThreads
                  .list({
                    part: ["snippet,replies"],
                    allThreadsRelatedToChannelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
                    maxResults: 100,
                    pageToken: token,
                  })
                  .then(
                    function (response) {
                      token = response.result.nextPageToken;
                      comCount += response.result.pageInfo.totalResults;
                      execute();
                    },
                    function (err) {
                      console.error("Execute error", err);
                    }
                  );
              }
            }
          }
        }

        //=========================
        let x = 0;
        if (localStorage.getItem("settingCache") == "true") {
          let posts = JSON.parse(sessionStorage.getItem("posts"));
          for (let i = 0; i < posts.length; i++) {
            if (
              posts[i].title == response.result.items[0].snippet.title &&
              posts[i].coment
            ) {
              $("#idChanel").val("");
              let $tbody = $("#tbody");
              let postTemplate = $("#order-template").html();
              x = 1;
              $tbody.append(Mustache.render(postTemplate, posts[i]));
              $(".table").show(300);
              return;
            }
          }
          if (x != 1) {
            execute();
          }
        } else {
          execute();
        }

        function comment(comCount) {
          $("#idChanel").val("");
          let $tbody = $("#tbody");
          let postTemplate = $("#order-template").html();
          let post = {
            title: response.result.items[0].snippet.title,
            date: response.result.items[0].snippet.publishedAt,
            subscriber: response.result.items[0].statistics.subscriberCount,
            video: response.result.items[0].statistics.videoCount,
            view: response.result.items[0].statistics.viewCount,
            coment: comCount,
          };

          if (localStorage.getItem("settingCache") == "true") {
            let posts = JSON.parse(sessionStorage.getItem("posts"));
            for (let i = 0; i < posts.length; i++) {
              if (posts[i].title == response.result.items[0].snippet.title) {
                posts.splice(i, 1);
              }
            }
            posts.push(post);
            sessionStorage.setItem("posts", JSON.stringify(posts));
          }

          $tbody.append(Mustache.render(postTemplate, post));
          $(".table").show(300);
        }
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});

gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});

//порівняння медіа резонансу
$("#compareMedia").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        //вивід коментарів========
        let t = 0,
          timer;
        function execute() {
          if (click == 0) {
            return gapi.client.youtube.commentThreads
              .list({
                part: ["snippet,replies"],
                allThreadsRelatedToChannelId: $("#idChanel").val(),
                maxResults: 100,
              })
              .then(
                function (response) {
                  $("#animEl").addClass("animate");
                  token = response.result.nextPageToken;
                  comCount += response.result.pageInfo.totalResults;

                  if (localStorage.getItem("settingTime") == "true") {
                    timer = setInterval(() => {
                      t += 10;
                      $(".timer").text(t + "ms");
                    }, 10);
                  }

                  click = 1;
                  execute();
                },
                function (err) {
                  console.error("Execute error", err);
                }
              );
          } else {
            if (token == null) {
              $("#animEl").removeClass("animate");
              compare(comCount);

              clearInterval(timer);
              setTimeout(() => {
                $(".timer").text("");
              }, 4000);

              token = null;
              click = 0;
              comCount = 0;
              return;
            } else {
              if (comCount > 1000) {
                comCount = 1000;
                $("#animEl").removeClass("animate");
                compare(comCount);

                clearInterval(timer);
                setTimeout(() => {
                  $(".timer").text("");
                }, 4000);

                token = null;
                click = 0;
                comCount = 0;
                return;
              } else {
                return gapi.client.youtube.commentThreads
                  .list({
                    part: ["snippet,replies"],
                    allThreadsRelatedToChannelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
                    maxResults: 100,
                    pageToken: token,
                  })
                  .then(
                    function (response) {
                      token = response.result.nextPageToken;
                      comCount += response.result.pageInfo.totalResults;
                      execute();
                    },
                    function (err) {
                      console.error("Execute error", err);
                    }
                  );
              }
            }
          }
        }

        //=========================
        let x = 0;
        if (localStorage.getItem("settingCache") == "true") {
          let posts = JSON.parse(sessionStorage.getItem("posts"));
          for (let i = 0; i < posts.length; i++) {
            if (
              posts[i].title == response.result.items[0].snippet.title &&
              posts[i].coment
            ) {
              $("#idChanel").val("");
              let $tbody = $("#tbody");
              let postTemplate = $("#order-template").html();
              x = 1;
              $tbody.append(Mustache.render(postTemplate, posts[i]));
              $(".table").show(300);
              let ex = "true";
              compare(posts[i].coment, posts[i], ex);
              return;
            }
          }
          if (x != 1) {
            execute();
          }
        } else {
          execute();
        }

        function compare(comCount, exPost, ex) {
          $("#idChanel").val("");
          let $tbody = $("#tbody");
          let postTemplate = $("#order-template").html();
          let post;
          if (comCount == ">1000") comCount = 1000;
          comentAr.push(parseFloat(comCount));
          if (comCount == 1000) comCount = ">1000";

          if (ex == "true") {
            post = exPost;
          } else {
            post = {
              title: response.result.items[0].snippet.title,
              date: response.result.items[0].snippet.publishedAt,
              subscriber: response.result.items[0].statistics.subscriberCount,
              video: response.result.items[0].statistics.videoCount,
              view: response.result.items[0].statistics.viewCount,
              coment: comCount,
            };
            $tbody.append(Mustache.render(postTemplate, post));
            $(".table").show(300);
          }

          subscriberAr.push(parseFloat(post.subscriber));
          videoAr.push(parseFloat(post.video));
          viewAr.push(parseFloat(post.view));

          if (localStorage.getItem("settingCache") == "true") {
            let posts = JSON.parse(sessionStorage.getItem("posts"));
            for (let i = 0; i < posts.length; i++) {
              if (posts[i].title == response.result.items[0].snippet.title) {
                posts.splice(i, 1);
              }
            }
            posts.push(post);
            sessionStorage.setItem("posts", JSON.stringify(posts));
          }

          if (subscriberAr.length > 1) {
            let subscriber = subscriberAr[0],
              video = videoAr[0],
              view = viewAr[0],
              coment = comentAr[0],
              subscriberNum = 0,
              videoNum = 0,
              viewNum = 0,
              comentNum = 0;

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
            for (let i = 0; i < comentAr.length; i++) {
              if (coment < comentAr[i]) {
                coment = comentAr[i];
                comentNum = i;
              }
            }

            $(".arTSub").css("display", "none");
            $(".arTVid").css("display", "none");
            $(".arTView").css("display", "none");
            $(".arTCom").css("display", "none");

            $(".arTSub").eq(subscriberNum).css("display", "block");
            $(".arTVid").eq(videoNum).css("display", "block");
            $(".arTView").eq(viewNum).css("display", "block");
            $(".arTCom").eq(comentNum).css("display", "block");
          }
          if (subscriberAr.length > 2) {
            let subscriber = subscriberAr[0],
              video = videoAr[0],
              view = viewAr[0],
              coment = comentAr[0],
              subscriberNum = 0,
              videoNum = 0,
              viewNum = 0,
              comentNum = 0;

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
            for (let i = 0; i < comentAr.length; i++) {
              if (coment > comentAr[i]) {
                coment = comentAr[i];
                comentNum = i;
              }
            }
            $(".arBSub").css("display", "none");
            $(".arBVid").css("display", "none");
            $(".arBView").css("display", "none");
            $(".arBCom").css("display", "none");

            $(".arBSub").eq(subscriberNum).css("display", "block");
            $(".arBVid").eq(videoNum).css("display", "block");
            $(".arBView").eq(viewNum).css("display", "block");
            $(".arBCom").eq(comentNum).css("display", "block");
          }
        }
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});
