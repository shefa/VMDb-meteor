Template.home_page.helpers({
    movies: function(){
        return Movies.find();
    },
    actors: function(){
        return Actors.find();
    }
});

Template.movies_home.helpers({
    getYear: function(a){
        return (new Date(a)).toLocaleDateString();
    },
    movieActors: function(){
        return Actors.find({_id: {$in: this.actorIds}});
    }
})

Template.actors_home.helpers({
    getGender: function(){
        return Meteor.helpers.getGender(this.gender);
    }
});

Template.movies_home.events({
    'click .button' : function(e,t){
        e.preventDefault();
        var target = e.target;
        while(target.getAttribute('id')===null) target=target.parentNode;
        FlowRouter.go('view.movie',{_id: target.getAttribute('id')});
    }
});

Template.actors_home.events({
    'click .button' : function(e,t){
        e.preventDefault();
        var target = e.target;
        while(target.getAttribute('id')===null) target=target.parentNode;
        FlowRouter.go('view.actor',{_id: target.getAttribute('id')});
    }
});