Template.menu.helpers({
  	isAdmin: function() {
    	return Meteor.helpers.isAdmin();
  	},
});

Template.menu.events({
    'click #logout' : function(){
        AccountsTemplates.logout();
        FlowRouter.go('App.home');
    }
});

Template.login_page.helpers({
  	goHome: function()
  	{
  		FlowRouter.go('App.home');
  	}
});