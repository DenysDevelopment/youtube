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
      id: ["UC_x5XG1OV2P6uZZ5FSM9Ttw"],
    })
    .then(
      function (response) {
        document.getElementById("id").innerHTML =
          JSON.stringify(response.result.items[0].snippet.title) +
          " " +
          JSON.stringify(response.result.items[0].snippet.publishedAt) +
          " " +
          JSON.stringify(response.result.items[0].statistics.subscriberCount) +
          " " +
          JSON.stringify(response.result.items[0].statistics.videoCount) +
          " " +
          JSON.stringify(response.result.items[0].statistics.viewCount);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});
