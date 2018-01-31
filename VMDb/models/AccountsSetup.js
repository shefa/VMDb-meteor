AccountsTemplates.configure({
    postSignUpHook: function(e){ 
        var userProfile = Meteor.users.findOne(e).profile;
        userProfile.age=parseInt(userProfile.age);
        userProfile.gender=Meteor.helpers.genderIdFromName(userProfile.gender);
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
