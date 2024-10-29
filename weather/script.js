import { fetchWeatherApi } from 'openmeteo';
	
const params = {
	"latitude": 46.2022,
	"longitude": 6.1457,
	"hourly": ["temperature_2m", "apparent_temperature", "precipitation", "rain", "snowfall", "wind_speed_180m"],
	"daily": ["weather_code", "sunrise", "sunset", "uv_index_max", "rain_sum", "snowfall_sum", "wind_speed_10m_max"],
	"timezone": "Europe/Berlin"
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {

	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
		apparentTemperature: hourly.variables(1)!.valuesArray()!,
		precipitation: hourly.variables(2)!.valuesArray()!,
		rain: hourly.variables(3)!.valuesArray()!,
		snowfall: hourly.variables(4)!.valuesArray()!,
		windSpeed180m: hourly.variables(5)!.valuesArray()!,
	},
	daily: {
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		weatherCode: daily.variables(0)!.valuesArray()!,
		sunrise: daily.variables(1)!.valuesArray()!,
		sunset: daily.variables(2)!.valuesArray()!,
		uvIndexMax: daily.variables(3)!.valuesArray()!,
		rainSum: daily.variables(4)!.valuesArray()!,
		snowfallSum: daily.variables(5)!.valuesArray()!,
		windSpeed10mMax: daily.variables(6)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toISOString(),
		weatherData.hourly.temperature2m[i],
		weatherData.hourly.apparentTemperature[i],
		weatherData.hourly.precipitation[i],
		weatherData.hourly.rain[i],
		weatherData.hourly.snowfall[i],
		weatherData.hourly.windSpeed180m[i]
	);
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		weatherData.daily.time[i].toISOString(),
		weatherData.daily.weatherCode[i],
		weatherData.daily.sunrise[i],
		weatherData.daily.sunset[i],
		weatherData.daily.uvIndexMax[i],
		weatherData.daily.rainSum[i],
		weatherData.daily.snowfallSum[i],
		weatherData.daily.windSpeed10mMax[i]
	);
}