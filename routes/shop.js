var Shop = require('../models/shop')

exports.query = function(req, res){
    var query = req.query
	Shop.find({loc:{$near:{$geometry:{type:"Point", 
		                              coordinates:[parseFloat(query.lng), parseFloat(query.lat)]},
		                   $maxDistance:parseFloat(query.maxDist)}}}, 
	    function(err, shops){
		  if(err) return res.json(err)
		  else return res.json(shops)
	 })
}

exports.post = function(req, res){
	var shop = new Shop(req.body)
	shop.loc =[parseFloat(req.body.lng), parseFloat(req.body.lat)]
	shop.save(function(err, shop){
		if(err) return res.json(err)
		else return res.json(shop)
	})
}

exports.socket_query = function(lng,lat, maxDist, callback){
	Shop.find({loc:{$near:{$geometry:{type:"Point", 
		                              coordinates:[parseFloat(lng), parseFloat(lat)]},
		                   $maxDistance:parseFloat(maxDist)}}}, 
	    callback
	    )
}