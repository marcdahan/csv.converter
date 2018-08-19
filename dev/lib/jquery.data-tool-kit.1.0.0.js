/* jshint -W098 */
/*!
 * jQuery-data-tool-kit JavaScript Library v1.0.0
 *
 * Date: 2018-08-19
 */
(function( $ ) {

    $.fn.dataToolKit = function(tool) {
		if (tool == 'json2csv') {
			$(this).on('submit', function(e) {
                e.preventDefault();
				var fileName = $(this).find("[name*='filename']").val() || 'export';
				var headers = $(this).find("[name*='headers']").val() || ['Context', 'English', 'Français'];
				var json = $(this).find("[name*='json']").val() || {
					'search': {
						'No salons found': 'Aucun salon trouvé',
						"1 salon found": '1 salon trouvé',
						'%1d salons found': '%1d salons trouvés',
						'Franck Provost Hairdressing Salons in near cities': 'Les salons de coiffure Franck Provost dans les villes à proximité',
						'Franck Provost Hairdressing Salons in near departments': 'Les salons de coiffure Franck Provost dans les départements limitrophes',
						'Our Salons in Near Cities': 'Nos salons dans les villes à proximité'
					}
				};
				$.ajax({
					  method: 'POST',
					  url: '/dataToolKit/converter/json-to-csv',
                      enctype: 'multipart/form-data',
					  data: {
						  "json":           JSON.stringify(json),
						  "headers":        JSON.stringify(headers),
						  "fileName":       fileName
					  }
					})
					.done(function(data, textStatus, jqXHR) {
                        console.log(textStatus);
						var a         = document.createElement('a');
					    a.href        = 'data:text/csv;charset=UTF-8,' + escape(data);
					    a.target      = '_blank';
					    a.download    = fileName + '.csv';
					    document.body.appendChild(a);
					    a.click();
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						console.log('jqXHR: ' + jqXHR + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
					});
			});
	    } //todo gérer les erreurs possibles
		return this;
	};

}( jQuery ));
