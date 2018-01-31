Template.edit_actor.events({
    'submit form' : function (event, instance){
        event.preventDefault();
        var actorObj = {
            firstName: event.target["first-name"].value,
            lastName: event.target["last-name"].value,
            age: parseInt(event.target["age"].value),
            gender: Meteor.helpers.genderIdFromName(event.target["gender"].value)
        };
        //console.log(actorObj);
        Actors.update(FlowRouter.getParam("_id"),{$set:actorObj});
        $('.form').addClass("success");
    }
});
Template.edit_actor.helpers({
    getActor: function(){
        return Actors.findOne(FlowRouter.getParam("_id"));
    },
    getGender: function(){
        return Meteor.helpers.getGender(this.gender);
    }
});