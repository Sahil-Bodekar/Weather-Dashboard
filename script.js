//selecting html elements
let container = document.querySelector(".weather-container");
let btn = document.querySelector("#search-button");
let disData = document.querySelector(".display-data");

function getWeather() {
  const apiKey = "cc9a0a3b3bdd4835bc662044252605";
  const city = document.querySelector("#input-box").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      let temp_c = data.current.temp_c;
      let temp_f = data.current.temp_f;
      let name = data.location.name;
      let condition = data.current.condition.text;
      let icon = data.current.condition.icon;

      showData(name, temp_c, temp_f, condition, icon);
    })
    .catch((error) => {
      console.log("Error occurred", error);
      disData.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

function showData(name, temp_c, temp_f, condition, icon) {
  // Clear previous content
  disData.innerHTML = "";

  // Create and append elements
  const cityName = document.createElement("h3");
  cityName.textContent = `${name}`;
  cityName.className = "city-name";

  const temperatureC = document.createElement("h4");
  temperatureC.textContent = `Temperature: ${temp_c}°C`;

  const temperatureF = document.createElement("h4");
  temperatureF.textContent = `Temperature: ${temp_f}°F`;

  const weatherCondition = document.createElement("p");
  weatherCondition.textContent = `Condition: ${condition}`;

  const weatherIcon = document.createElement("img");
  weatherIcon.src = `https:${icon}`;
  weatherIcon.alt = condition;

  // Append all elements
  disData.appendChild(cityName);
  disData.appendChild(temperatureC);
  disData.appendChild(temperatureF);
  disData.appendChild(weatherCondition);
  disData.appendChild(weatherIcon);
}

btn.addEventListener("click", getWeather);

// Optional: Add event listener for Enter key
document.querySelector("#input-box").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});
