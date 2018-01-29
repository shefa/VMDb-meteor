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

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

