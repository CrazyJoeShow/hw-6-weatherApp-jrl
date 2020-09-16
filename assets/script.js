console.log('Hello! ya old fogey!');

//---------search Function---------//

function searchCity(cityname) {
	var queryURL =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		cityname +
		'&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56';
	var queryURLforcast =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		cityname +
		'&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56';
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
	});

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
