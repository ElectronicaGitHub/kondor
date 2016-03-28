module.exports = function (body) {
	return '<div>' +
			'<p>Имя: ' + body.name + '</p>' +  
			'<p>Его мнение: ' + body.comment + '</p>' + 
		'</div>';
}