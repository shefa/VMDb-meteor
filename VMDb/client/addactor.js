Template.add_actor.events({
    'submit form' : function (event, instance){
        event.preventDefault();
        var actorObj = {
            firstName: event.target["first-name"].value,
            lastName: event.target["last-name"].value,
            age: parseInt(event.target["age"].value)
        };
        console.log(actorObj);
        Actors.insert(actorObj);
    }
});
