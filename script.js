const iconData = {
  "clear-day": "./assets/sunny.svg",
  "partly-cloudy-day": "./assets/sunny-cloudy.svg",
  cloudy: "./assets/sunny-cloudy.svg",
  rain: "./assets/rainy.svg",
  snow: "./assets/snowy.svg",
};
const settings = {
  f2c: (t) => ((t - 32) * 5) / 9,
  c2f: (t) => (t * 9) / 5 + 32,
  m2k: (mph) => mph * 1.60934,
  k2m: (kmh) => kmh / 1.60934,
};
const body = document.querySelector("body");

async function fetchData(place) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&key=9HQEAQQB74RDKPHQEX4WUU8G9&contentType=json`;
    let response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetch:", error);
  }
}
async function main(place) {
  try {
    const data = await fetchData(place);
    const nextdays = data.days.slice(1, 8);
    console.log("fetched");
    console.log(data);
    display2ddata(data.days[0], data);
    display7Data(nextdays);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

(function takeInput() {
  const input = document.querySelector("form");

  input.addEventListener("submit", (e) => {
    e.preventDefault();
    body.classList.remove("inactive");
    const place = document.querySelector("input").value;
    main(place);
  });
})();

function display7Data(nextdays) {
  const days = document.getElementById("nextdays");
  days.innerHTML = "";

  nextdays.forEach((day) => {
    const dayCard = document.createElement("div");
    dayCard.className = "day";

    const weekday = document.createElement("p");
    const ndate = new Date(day.datetime);
    weekday.innerText = ndate.toLocaleDateString("en-US", { weekday: "long" });
    dayCard.appendChild(weekday);

    const icon = document.createElement("img");
    icon.className = "icon";
    icon.src = iconData[day.icon];
    icon.alt = day.icon;
    dayCard.appendChild(icon);

    const temp = document.createElement("p");
    temp.innerText = day.temp;
    dayCard.appendChild(temp);

    const cond = document.createElement("p");
    cond.innerText = day.conditions;
    dayCard.appendChild(cond);

    days.appendChild(dayCard);
    console.log("displayed");
  });
}
function display2ddata(data, full) {
  const temp = document.getElementById("t");
  temp.innerText = data.temp;
  const unit = document.getElementById("f");
  unit.innerText = "°F";
  const fl = document.getElementById("fl");
  fl.innerText = `Feels Like : ${data.feelslike}`;
  const hum = document.getElementById("hum");
  hum.innerText = `Wind : ${data.humidity}`;
  const wind = document.getElementById("wind");
  wind.innerText = `Humidity : ${data.windspeed}mph`;
  const icon2d = document.getElementById("icon2d");
  icon2d.src = iconData[data.icon];
  icon2d.alt = data.icon;
  const place = document.getElementById("place");
  place.innerText = full.address;
  const wday = document.getElementById("weekday");
  const ndate = new Date(data.datetime);
  wday.innerText = ndate.toLocaleDateString("en-US", { weekday: "long" });
  const cond = document.getElementById("cond");
  cond.innerText = data.conditions + "\n" + full.description;
}

(function handleSettings() {
  const settings = document.getElementById("settings");
  const menu = document.getElementById("menu");
  settings.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
  const mode = document.getElementById("mode");
  mode.addEventListener("click", () => {
    body.classList.toggle("light");
  });
})();
