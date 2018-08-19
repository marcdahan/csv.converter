/* jshint -W098 */
/*!
 * jQuery-data-tool-kit JavaScript Library v1.0.0
 *
 * Date: 2018-08-19
 */
(function( $ ) {

    $.fn.dataToolKit = function(tool) {
		if (tool == 'json2csv') {
            var countColumns = 1;
            var $that = $(this);
			$that.find('.em-csv-add-column').on('click', function(e) {
                countColumns++;
                var html = '';
                html += '<div class="em-column-' + countColumns + '">';
                html +=     '<label class="em-field em-column-' + countColumns + '-id">';
                html +=         '<input  type="text" data-column-number="' + countColumns + '" data-column-attribute="title" name="em-column-' + countColumns + '-id" placeholder="id of the column n°' + countColumns + '" autocomplete="on">';
                html +=     '</label>';
                html +=     '<label class="em-field em-column-' + countColumns + '-title">';
                html +=         '<input type="text" data-column-number="' + countColumns + '" data-column-attribute="title" name="em-column-' + countColumns + '-title" placeholder="Title of the column n°' + countColumns + '" autocomplete="on">';
                html +=         '<span class="em-explanation"></span>';
                html +=     '</label>';
                html += '</div>';
                $that.find('.em-headers-builder .em-repository').append(html);
			});
            $that.find('.em-csv-remove-column').on('click', function(e) {
                if (countColumns > 1) {
                    $that.find('.em-column-' + countColumns).remove();
                    countColumns--;
                }
			});
			$that.on('submit', function(e) {
                e.preventDefault();
				var fileName = $that.find("[name*='filename']").val() || 'export';
                var headers = {};
				var $headers = $that.find("[name*='column']");
                $headers.each(function(index, element) {


                });
				var json = $that.find("[name*='json']").val() || {
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
