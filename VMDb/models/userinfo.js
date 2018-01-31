UserInfo = new Mongo.Collection('userinfo');

UserInfo.schema = new SimpleSchema({
	userId: {type: String},
	firstName: {type: String},
	lastName: {type: String},
	age: {type: Number},
	gender: {type: Number},
	profession: {type: String}
});

