Template.home_page.helpers({
    movies: function()
    {
        return Movies.find();
    },
    getYear: function(a)
    {
        return (new Date(a)).toLocaleDateString();
    }
});

Template.home_page.events({
    'click .button' : function(e,t){
        e.preventDefault();
        FlowRouter.go('view.movie',{_id: e.target.getAttribute('id')});
    }
})
