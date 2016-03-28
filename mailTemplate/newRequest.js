module.exports = function (body) {
	return '<div>' +
			'<p>Товар: ' + body.title + '</p>' + 
			'<p>Имя: ' + body.name + '</p>' + 
			'<p>Телефон: ' + body.phone + '</p>' + 
		'</div>';
}