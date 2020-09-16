console.log('Hello! ya old fogey!');

//---------search Function---------//

function searchCity(cityname) {
	var queryURL =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		cityname +
		'&units=imperial&appid=f81bd4be101f2c042a4f1ac1156d8729';
	var queryURLforcast =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		cityname +
		'&units=imperial&appid=f81bd4be101f2c042a4f1ac1156d8729';
	$.ajax({
		url: queryURL,
		method: 'GET',
	}).then(function (response) {
		console.log(response);
		console.log(queryURL);
		$('#current').empty();
		var mainDate = moment().format('L');

		//--------HTML to put the information in-----//
		var cityNameEl = $('<h2>').text(response.name);
		var displayMainDate = cityNameEl.append(' ' + mainDate);
		var tempEL = $('<p>').text('Tempraturer: ' + response.main.temp);
		var humEl = $('<p>').text('Humidity: ' + response.main.humidity);
		var windEl = $('<p>').text('Wind Speed: ' + response.wind.speed);
		var currentweather = response.weather[0].main;

		if (currentweather === 'Rain') {
			var currentIcon = $('<img>').attr(
				'src',
				'http://openweathermap.org/img/wn/09d.png'
			);
			currentIcon.attr('style', 'height: 60px; width: 60px');
		} else if (currentweather === 'Clouds') {
			var currentIcon = $('<img>').attr(
				'src',
				'http://openweathermap.org/img/wn/03d.png'
			);
			currentIcon.attr('style', 'height: 60px; width: 60px');
		} else if (currentweather === 'snow') {
			var currentIcon = $('<img>').attr(
				'src',
				'http://openweathermap.org/img/wn/13d.png'
			);
		}
		var newDiv = $('<div>');
		newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);
		$('#current').html(newDiv);

		//-------UVindex call---------//

		var lat = response.data.lat;
		var lon = response.data.lon;
		var queryURLUV =
			'https://api.openweathermap.org/data/2.5/uvi?&appid=f81bd4be101f2c042a4f1ac1156d8729&lat=' +
			lat +
			'&lon=' +
			lon;

		$.ajax({
			url: queryURLUV,
			method: 'GET',
		}).then(function (response) {
			$('#uvl-display').empty();
			var uvlresults = response.value;
			var uvlEl = $("<button calss='btn bg-success'>").text(
				'UV Index: ' + response.value
			);
			$('#uvl-display').html(uvlEl);
		});
	});

	//--------Forecast Call-------//
	$.ajax({
		url: queryURLforcast,
		method: 'GET',
	}).then(function (response) {
		// Storing an array of results in the results variable
		var results = response.list;
		//empty 5day div--------
		$('#5day').empty();
		//create HTML for 5day forcast................
		for (var i = 0; i < results.length; i += 8) {
			// Creating a div
			var fiveDayDiv = $(
				"<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
			);

			//----storing the return of date temp humidity--
			var date = results[i].dt_txt;
			var setD = date.substr(0, 10);
			var temp = results[i].main.temp;
			var hum = results[i].main.humidity;

			//-----vars for item info-----//
			var h5date = $("<h5 class='card-title'>").text(setD);
			var pTemp = $("<p class='card-text'>").text('Temp: ' + temp);
			var pHum = $("<p class='card-text'>").text('Humidity ' + hum);

			var weather = results[i].weather[0].main;
			//if/else for images
			if (weather === 'Rain') {
				var icon = $('<img>').attr(
					'src',
					'http://openweathermap.org/img/wn/09d.png'
				);
				icon.attr('style', 'height: 40px; width: 40px');
			} else if (weather === 'Clouds') {
				var icon = $('<img>').attr(
					'src',
					'http://openweathermap.org/img/wn/03d.png'
				);
				icon.attr('style', 'height: 40px; width: 40px');
			} else if (weather === 'Clear') {
				var icon = $('<img>').attr(
					'src',
					'http://openweathermap.org/img/wn/01d.png'
				);
				icon.attr('style', 'height: 40px; width: 40px');
			} else if (weather === 'Drizzle') {
				var icon = $('<img>').attr(
					'src',
					'http://openweathermap.org/img/wn/10d.png'
				);
				icon.attr('style', 'height: 40px; width: 40px');
			} else if (weather === 'Snow') {
				var icon = $('<img>').attr(
					'src',
					'http://openweathermap.org/img/wn/13d.png'
				);
				icon.attr('style', 'height: 40px; width: 40px');
			}

			//--appending the items to their corresponding divs or p's--
			fiveDayDiv.append(h5date);
			fiveDayDiv.append(icon);
			fiveDayDiv.append(pTemp);
			fiveDayDiv.append(pHum);
			$('#5day').append(fiveDayDiv);
		}
	});
}

//-----------event listner and storage upon click-----------

$('#select-city').on('click', function (event) {
	event.preventDefault();
	console.log('you clicked it man. YES!');
	// Store the city name
	var cityInput = $('#city-input').val().trim();

	//save to local starage
	var textContent = $(this).siblings('input').val();
	var storearr = [];
	storearr.push(textContent);
	localStorage.setItem('cityName', JSON.stringify(storearr));

	searchCity(cityInput);
	pageLoad();
});
