Genders = new Mongo.Collection('genders')

Genders.schema = new SimpleSchema({
	genderId : {type: Number},
	genderName: {type: String, max:200}
});

