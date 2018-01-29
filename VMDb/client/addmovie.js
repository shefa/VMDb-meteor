Template.add_movie.events({
    'submit form' : function (event, instance){
        event.preventDefault();
        var movieObj = {
            title: event.target["movie-title"].value,
            description: event.target["movie-description"].value,
            releaseDate: Date(event.target["release-date"].value),
            budget: parseInt(event.target["budget"].value)
        };
        console.log(movieObj);
        Movies.insert(movieObj);
    }
});
