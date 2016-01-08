var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaStory = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: { type: String, required: true},
    created : { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Story',SchemaStory);
