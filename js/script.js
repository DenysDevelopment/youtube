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

function execute() {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
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
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});
