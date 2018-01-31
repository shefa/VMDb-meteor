Template.add_movie.events({
    'submit form' : function (event, instance){
        event.preventDefault();
        var movieObj = {
            title: event.target["movie-title"].value,
            description: event.target["movie-description"].value,
            releaseDate: new Date(event.target["release-date"].value.toString()),
            budget: parseInt(event.target["budget"].value),
            actorIds: $('#actorSelect').val(),
            ratings: [],
            reviews: [],
            aggregates: [{sum:0,count:0,name:"all"}]
        };
        if(movieObj.actorIds===null||movieObj.actorIds===undefined) movieObj.actorIds=[];
        //console.log(movieObj);
        Movies.insert(movieObj);
        $('.form').addClass("success");
        $('.form')[0].reset();
    }
});
Template.add_movie.helpers({
    getActors: function()
    {
        return Actors.find();
    }
});

Template.add_movie.onRendered( function () {
    $('.dropdown').dropdown();
});