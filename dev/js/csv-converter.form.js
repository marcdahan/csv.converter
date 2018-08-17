$( document ).ready(function() {

	$("form.em-csv-form").on('submit', function() {

		$.ajax({
			  method: 'GET',
			  url: '/dataToolKit/converter/jsonToTable',
			  data: {
				  "json": dico,
				  "columns": ['Context', 'English', 'Français'],
				  "fileName": 'traductions-franck-provost'
			  }
			})
			.done(function(data, textStatus, jqXHR) {
				console.log('data: ' + data + ', textStatus: ' + textStatus + ', jqXHR: ' + jqXHR);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('jqXHR: ' + jqXHR + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
			})
			.always(function(data, textStatus, jqXHR) {
				console.log("request ended by a " + textStatus );
			});
	});

});
