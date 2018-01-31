Template.actor.helpers({
	getActor: function(){
		return Actors.findOne(FlowRouter.getParam("_id"));
	},
	getMovies: function(){
		return Movies.find({actorIds:this._id});
	},
	getYear: function(){
		return this.releaseDate.getFullYear();
	},
	isAdmin: function() {
    	return Meteor.helpers.isAdmin();
  	},
  	getGender: function(){
  		return Meteor.helpers.getGender(this.gender);
  	}
});
Template.actor.events({
	'click #editBtn' : function(e,t){
		FlowRouter.go('edit.actor',{_id: this._id});
	},
	'click #deleteBtn' : function(e,t){
		$('.ui.basic.modal').modal('show');
	}
});
Template.actor.onRendered(function(){
	$('.confirmDelete').click(function(){
		Meteor.call("deleteActor",FlowRouter.getParam("_id"));
		$('.ui.basic.modal').modal('hide');
		FlowRouter.go('App.home');
	});
});