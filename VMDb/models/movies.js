Movies = new Mongo.Collection('movies');

Movies.schema = new SimpleSchema({
	title: {
		type: String, 
		max: 200
	},
	releaseDate: {
        type: Date
    },
	budget: {
		type: Number, 
		defaultValue: 0
	},
	description: {
		type: String, 
		max: 1000
	},
	actorIds: {
		type: [String], 
		defaultValue:[]
	},
	reviews: {
		type: [Object],
		defaultValue: []
	},
        "reviews.$.userId": {type: String},
        "reviews.$.content": {type: String, max:1000},
        "reviews.$.title": {type: String, max:200, defaultValue: ""},
        "reviews.$.rate": {type: Number, decimal:true},
	ratings: {
		type: [Object],
		defaultValue: []
	},
		"ratings.$.userId": {type: String},
		"ratings.$.rate": {type: Number, decimal:true},
    
    aggregates: {
        type: [Object],
        defaultValue: [{},{},{},{}]
    },
        "aggregates.$.average": {
            type: Number, 
            decimal: true,
            defaultValue:0
        },
        "aggregates.$.count": {
            type: Number,
            defaultValue:0
        }
});
