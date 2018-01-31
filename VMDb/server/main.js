import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	deleteActor: function(id)
	{
		Actors.remove(id);
		Movies.update({actorIds:id},{ $pull: { actorIds:id } });
	},
	makeAdmin: function(id)
	{
		var usr = Meteor.users.findOne(id);
		if(usr===undefined) return;
		var newProfile = usr.profile;
		newProfile['isAdmin']=true;
		Meteor.users.update(id,{$set:{profile:newProfile}});
	},
	removeAdmin: function(id)
	{
		var usr = Meteor.users.findOne(id);
		if(usr===undefined) return;
		var newProfile = usr.profile;
		newProfile['isAdmin']=false;
		Meteor.users.update(id,{$set:{profile:newProfile}});	
	}
});
