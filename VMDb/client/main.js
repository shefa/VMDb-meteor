import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.menu.helpers({
  isAdmin() {
    var usr = UserInfo.findOne({userId:Meteor.userId()});
    if(usr===undefined) return false;
    return usr.admin;
  },
});

Template.menu.events({
    'click #logout' : function(){
        AccountsTemplates.logout();
    }
});
