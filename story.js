/**
 * Created by rusheel on 15-08-03.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaStory = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: { type: String, required: true},
    created : { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Story',SchemaStory);
