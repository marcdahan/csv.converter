$( document ).ready(function() {

	$("form.em-csv-form").on('submit', function() {

		var json = dico;
		var fileName = $(this).find("[name='em-filename']").val() || 'export';
		var columns = ['Context', 'English', 'Français'];

		$.ajax({
			  method: 'GET',
			  url: '/dataToolKit/converter/jsonToTable',
			  data: {
				  "json": dico,
				  "columns":  columns,
				  "fileName": fileName
			  }
			})
			.done(function(data, textStatus, jqXHR) {
				console.log('data: ' + data + ', textStatus: ' + textStatus + ', jqXHR: ' + jqXHR);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('jqXHR: ' + jqXHR + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
			})
			.always(function(data, textStatus, jqXHR) {
				console.log("request ended");
			});
	});

});
