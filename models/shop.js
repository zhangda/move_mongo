var mongoose = require('mongoose')

var shopSchema = new mongoose.Schema({
	name: {type:String},
	loc:[Number]
})

shopSchema.index({loc: '2dsphere'})

module.exports = mongoose.model('Shop', shopSchema);