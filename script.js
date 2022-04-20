var map = L.map("map").setView([34.0614, -118.08162], 13);
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: "pk.eyJ1IjoibXVoYW1tYWRhZmlmanByIiwiYSI6ImNsMjV6M2RpaTAwY3UzZm42ZTh4aXFkbWoifQ.xGZjQL1nip0ajAIUQmapwQ",
}).addTo(map);
var marker = L.marker([34.0614, -118.08162]).addTo(map);

const btn = document.querySelector(".button-finding");
btn.addEventListener("click", async function () {
  try {
    const pencarian = document.querySelector(".finding").value;
    const Ip = await getIp(pencarian);

    updateUI(Ip);
  } catch (err) {
    console.log(err);
  }
});

function getIp(pencarian) {
  return fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_i8i4syDRGKyLEbiALEhSp392XnPKH&ipAddress=" + pencarian)
    .then(response => {
      if (response.ok === false) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => response);
}

function updateUI(response) {
  const ip = document.querySelector(".ip-result");
  const location = document.querySelector(".location-result");
  const timezone = document.querySelector(".timezone-result");
  const isp = document.querySelector(".isp-result");
  ip.innerHTML = response.ip;
  location.innerHTML = `${response.location.city} , ${response.location.region}`;
  timezone.innerHTML = `UTC ${response.location.timezone}`;
  isp.innerHTML = response.isp;
}
