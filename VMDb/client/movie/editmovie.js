Template.edit_movie.events({
    'submit form' : function (event, instance){
        event.preventDefault();
        var movieObj = {
            title: event.target["movie-title"].value,
            description: event.target["movie-description"].value,
            releaseDate: new Date(event.target["release-date"].value.toString()),
            budget: parseInt(event.target["budget"].value),
            actorIds: $('#actorSelect').val()
        };
        if(movieObj.actorIds===null||movieObj.actorIds===undefined) movieObj.actorIds=[];
        //console.log(movieObj);
        Movies.update(FlowRouter.getParam('_id'),{ $set: movieObj });
        $('.form').addClass("success");
        //$('.form')[0].reset();
    }
});
Template.edit_movie.helpers({
    getMovie: function(){
        return Movies.findOne(FlowRouter.getParam('_id'));
    },
    getActors: function(){
        return Actors.find();
    },
    getDateFormat: function(){
        var d = new Date(this.releaseDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
});

Template.edit_movie.onRendered( function () {
    var q = $('.dropdown');
    q.dropdown();
    q.dropdown('set exactly',Movies.findOne(FlowRouter.getParam('_id')).actorIds);
});