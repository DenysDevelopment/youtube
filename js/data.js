let data;

window.onload = function loadClient() {
  gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
        setTimeout(() => {
          document.querySelector(".search__btn").classList.remove("lock");
        }, 4000);
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
};
let valueInput = "";

document.querySelector(".search__input").addEventListener("input", function () {
  valueInput = this.value;
});

function execute() {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      forUsername: valueInput,
    })
    .then(
      function (response) {
        data = JSON.parse(response.body);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});

document.querySelector(".search__btn").addEventListener("click", execute);
