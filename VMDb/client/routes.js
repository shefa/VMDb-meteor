import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

function wait_for_x(path,i)
{
    if(i>10) return;
    var x = $('a[href="'+path+'"]');
    if(x.length==0) return Meteor.setTimeout(function(){wait_for_x(path,i+1);},300);
    x.addClass("active");
}
function exit_active(context){
    $('a[href="'+context.path+'"]').removeClass("active");
}

FlowRouter.triggers.enter([function(context){wait_for_x(context.path,0);}]);
FlowRouter.triggers.exit([exit_active]);

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'home_page' });
  },
});

FlowRouter.route('/login', {
  name: 'login.page',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'login_page' });
  }
});

FlowRouter.route('/movie/:_id', {
    name: 'view.movie',
    action(){
        BlazeLayout.render('App_body', {main: 'movie'});
    },
});

FlowRouter.route('/addMovie', {
  name: 'add.movie',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'add_movie' });
  }
});

FlowRouter.route('/editMovie/:_id', {
    name: 'edit.movie',
    action(){
        BlazeLayout.render('App_body', {main: 'edit_movie'});
    },
});

FlowRouter.route('/actor/:_id', {
    name: 'view.actor',
    action(){
        BlazeLayout.render('App_body', {main: 'actor'});
    },
});

FlowRouter.route('/addActor', {
  name: 'add.actor',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'add_actor' });
  }
});

FlowRouter.route('/editActor/:_id', {
    name: 'edit.actor',
    action(){
        BlazeLayout.render('App_body', {main: 'edit_actor'});
    },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

