Actors = new Mongo.Collection('actors');

Actors.schema = new SimpleSchema({
	firstName: {type: String},
	lastName: {type: String},
	age: {type: Number},
	gender: {type: Number}
});

