Meteor.helpers = {};
Meteor.helpers.genderIdFromName = function(genderName){
	var id = Genders.find().count()+1;
    var gendObj = Genders.findOne({name:genderName});
    if(gendObj===undefined){ 
        //console.log("inserting new gender "+genderName);
        Genders.insert({genderId:gend, name: genderNamer});
    }
    else id=gendObj.genderId;
    return id;
}
Meteor.helpers.isAdmin = function(){
	if( Meteor.user() && Meteor.user().profile.isAdmin ) return true;
    return false;
}
Meteor.helpers.getGender = function(id){
    var g = Genders.findOne({genderId:id});
    if(g===undefined || g.name===undefined ) return "";
    return g.name;
}
Meteor.helpers.aggregateRes = function(aggregate){
    if(aggregate.count===0) return 0;
    var a = aggregate.sum/aggregate.count;
    return parseInt(((a*10)+5)/10);   
}