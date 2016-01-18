var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Answer = new Schema({
	text : {
		type: String
	},
	created : {
	    type: Date,
	    default: Date.now
	},
	question_id : {
		type : ObjectId,
		ref : 'Question',
		require : true
	},
	author_id : {
		type : ObjectId,
		ref : 'User',
		require : true	
	},
	correct : {
		type : Boolean
	},
	comments : [{
		type : ObjectId,
		ref : 'Comment'
	}],
	notes : [{
		type : ObjectId, 
		ref : 'Note'
	}],
	attachments : [{
		type : ObjectId,
		ref : 'Attachment'
	}]
})

module.exports = mongoose.model('Answer', Answer);
