/* jshint -W098, -W002, -W061*/
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
                e.stopPropagation();
                countColumns++;
                var html = '';
                html += '<div class="em-column-' + countColumns + '">';
                html +=     '<label class="em-column-' + countColumns + '-title">';
                html +=         '<input type="text" data-column-number="' + countColumns + '" name="em-column-' + countColumns + '-title" class="em-add-margin-bottom" placeholder="Title of the column n°' + countColumns + '" autocomplete="on">';
                html +=         '<span class="em-explanation"></span>';
                html +=     '</label>';
                html += '</div>';
                $that.find('.em-headers-builder .em-repository').append(html);
			});

            $that.find('.em-csv-remove-column').on('click', function(e) {
                e.stopPropagation();
                if (countColumns > 1) {
                    $that.find('.em-column-' + countColumns).remove();
                    countColumns--;
                }
			});

			$that.on('submit', function(e) {
                e.stopPropagation();
                e.preventDefault();
                $that.find('.em-error-message').empty();
                var fileName = $that.find("[name*='filename']").val();
                var headers = [];
                var preJson = null;
                var json = null;
				var $headers = $that.find("[name*='column']");
                var columnNumber = null;
                var title = '';
                if (!fileName) {
                    $that.find('.em-json .em-error-message').append('ERROR: ' + 'Le nom du fichier est vide.');
                    throw new Error('ERROR: ' + 'Le nom du fichier est vide.');
                }
                $headers.each(function(index, element) {
                    var $element = $(element);
                    columnNumber = $element.attr('data-column-number');
                    title = $element.val();
                    if (title) {
                        headers.push(title);
                    } else {
                        $element.closest('.em-block').find('.em-error-message').append('ERROR: ' + 'Le champs de la colonne n°' + columnNumber + ' est vide.');
                        throw new Error('Le champs de la colonne n°' + columnNumber + ' est vide.');
                    }
                });
                try {
                    preJson = $that.find("[name*='json']").val();
                    if (!preJson) {
                        throw new Error('Le champs Json est vide.');
                    }
                    json = eval("(" + preJson + ')');
                    if (Object.prototype.toString.call(json) !== '[object Object]') {
                        throw new Error('Le champs Json n\'est pas un objet JSON.');
                    }
                } catch (e) {
                    $that.find('.em-json .em-error-message').append('ERROR: ' + e);
                }

				$.ajax({
					  method: 'POST',
					  url: '/api/json-to-csv',
                      enctype: 'multipart/form-data',
                      headers : {'authorization' : 'eyhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Im1hcmMgZGFoYW4iLCJpYXQiOjE1MTYyMzkwMjJ9.fepI05MsYZ0MmKLjqYK7FHycc-3q5beDQx7TSXeaUNo'},
					  data: {
						  "json":           JSON.stringify(json),
						  "headers":        JSON.stringify(headers),
						  "fileName":       fileName
					  }
					})
					.done(function(data, textStatus, jqXHR) {
						var a         = document.createElement('a');
					    a.href        = 'data:text/csv;charset=UTF-8,' + escape(data);
					    a.target      = '_blank';
					    a.download    = fileName + '.csv';
					    document.body.appendChild(a);
					    a.click();
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
                        throw new Error('jqXHR: ' + jqXHR + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
					});
			});
	    } //todo gérer les erreurs possibles
		return this;
	};

}( jQuery ));
