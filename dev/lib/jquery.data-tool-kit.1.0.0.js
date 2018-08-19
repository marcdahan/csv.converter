/* jshint -W098 */
/*!
 * jQuery-data-tool-kit JavaScript Library v1.0.0
 *
 * Date: 2018-08-19
 */
(function( $ ) {

    $.fn.dataToolKit = function(tool) {
		if (tool == 'json2csv') {
			$(this).on('submit', function() {

				var fileName = $(this).find("[name*='filename']").val() || 'export';
				var columns = $(this).find("[name*='columns']").val() || ['Context', 'English', 'Français'];
				var json = $(this).find("[name*='json']").val() || {
				    'encodages': {
				        'BOM': 'byte order mark',
				        'ISO 8859-1': {
				            'EF BB BF': 'ï»¿',
				            'U+233B4': 'caractère chinois signifiant « souche d\'un arbre »',
				            'Dans les éditeurs de texte et navigateurs mal préparés pour traiter l\'UTF-8': 'en codage ISO-8859-1, l\'indicateur apparaît comme ï»¿'
				        }
				    },
				    'disney': {
				        'mickey': 'mouse',
				        'donald': {
				            'riri': 'astucieux',
				            'fifi': 'débrouillard',
				            'loulou': 'drôle',
				            'amis': {
				                'dingo': 'gentil',
				                'Géo Trouvetou': 'génial'
				            }
				        }
				    },
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
					  method: 'GET',
					  url: '/dataToolKit/converter/json-to-csv',
					  data: {
						  "json": json,
						  "columns":  columns,
						  "fileName": fileName
					  }
					})
					.done(function(data, textStatus, jqXHR) {
						console.log('success');
						data = {
							'disney': {
	  				        	'mickey': 'mouse'
							}
						};

						var a         = document.createElement('a');
					    a.href        = 'data:text/csv;charset=UTF-8' + escape(JSON.stringify(data));
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
