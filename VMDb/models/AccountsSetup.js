AccountsTemplates.configure({
    postSignUpHook: function(e){ 
        var userProfile = Meteor.users.findOne(e);
        userProfile.age=parseInt(userProfile.age);
        var gend = Genders.findOne({name:userProfile.gender});
        if(gend===undefined){ 
            gend=Genders.find().count()+1;
            Genders.insert({genderId:gend, name:userProfile.gender});
        }
        else gend=gend.genderId;
        userProfile.gender=gend;
        userProfile.userId=e;
        UserInfo.insert(userProfile);
    }
});

AccountsTemplates.addField({
        _id: 'firstName',
        type: 'text',
        displayName: "First Name",
        required: true,
        maxLength: 32
});

AccountsTemplates.addField({
        _id: 'lastName',
        type: 'text',
        displayName: "Last Name",
        required: true,
        maxLength: 32
});

AccountsTemplates.addField({
        _id: 'age',
        type: 'text',
        displayName: "Age",
        maxLength: 3
});

AccountsTemplates.addField({
        _id: 'gender',
        type: 'text',
        displayName: "Gender",
        maxLength: 64
});

AccountsTemplates.addField({
        _id: 'profession',
        type: 'text',
        displayName: "Profession",
        maxLength: 64
});
