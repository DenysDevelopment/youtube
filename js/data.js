let data;

window.onload = function loadClient() {
  gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        document.querySelector(".search__btn").classList.remove("lock");
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
      // id: ["UC_x5XG1OV2P6uZZ5FSM9Ttw"],
      id: [valueInput],
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
gapi.load("client:auth2");

document.querySelector(".search__btn").addEventListener("click", execute);
