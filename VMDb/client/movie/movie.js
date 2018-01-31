Template.movie.helpers({
	getMovie: function(){
		return Movies.findOne(FlowRouter.getParam("_id"));
	},
	getYear: function(a){
        return (new Date(a)).toDateString();
    },
    movieActors: function(){
        return Actors.find({_id: {$in: this.actorIds}});
    },
    getAuthor: function(){
    	var usr = UserInfo.findOne({userId:this.userId});
    	return usr.firstName+" "+usr.lastName;
    },
    revrate: function(){
    	var q=this.userId;
    	var ret=this.rate;
    	Meteor.setTimeout(function(){
    		$('#review'+q).rating('set rating', ret);
    	},100);
    	return ret;
    },
    getRating: function(aggregates){
    	var ret=Meteor.helpers.aggregateRes(aggregates[0]);

    	Meteor.setTimeout(function(){
    		var q=$('#movieAverage');
    		q.rating('disabled');
    		q.rating('set rating',ret);
    	},100);

    	return ret;
    },
    getMyRating: function(){
    	var ret=0;
    	for(var i=0;i<this.ratings.length;i++)
    	{
    		if(this.ratings[i].userId===Meteor.userId())
    		{
    			ret=this.ratings[i].rate;
    			break;
    		}
    	}
    	return ret;
    },
    getRatingAggregate: function(){
    	var ret = Meteor.helpers.aggregateRes(this);

    	var self=this;
    	Meteor.setTimeout(function(){
    		var q=$('#aggregate'+self.name);
    		q.rating('disabled');
    		q.rating('set rating',ret);
    	},100);

    	return ret;
    },
    isAdmin: function(){
    	return Meteor.helpers.isAdmin();
  	},
  	noReviews: function(){
  		return (this.reviews.length===0);
  	}
});

Template.movie.onRendered(function(){
	$('#movieAverage').rating('disable');
	$('.aggregateRating').rating('disable');
	$('.reviewrate').rating('disable');
	
	$('.confirmDelete').click(function(){
		Movies.remove(FlowRouter.getParam("_id"));
		$('.ui.basic.modal').modal('hide');
		FlowRouter.go('App.home');
	});
});

function addRate(rate,movieObj)
{
	var found=0;
	for(var i=0;i<movieObj.ratings.length;i++) 
		if(movieObj.ratings[i].userId==Meteor.userId()) 
		{
			var update=rate-movieObj.ratings[i].rate;  
			movieObj.ratings[i].rate=rate;
			movieObj.aggregates[0].sum+=update;
			for(var j=1;j<movieObj.aggregates.length;j++)
			{
				if(movieObj.aggregates[j].name===Meteor.user().profile.gender||
					movieObj.aggregates[j].name===Meteor.user().profile.profession)
				{
					movieObj.aggregates[j].sum+=update;
				}
			}
			found=1;
			break;
		}
	if(found===0)
	{
		movieObj.ratings.push({userId:Meteor.userId(),rate:rate});
		movieObj.aggregates[0].count++;
		movieObj.aggregates[0].sum+=rate;

		var foundGender=0,foundProfession=0;

		for(var i=1;i<movieObj.aggregates.length;i++)
		{
			if(movieObj.aggregates[i].name===Meteor.user().profile.gender)
			{
				foundGender=1;
				movieObj.aggregates[i].count++;
				movieObj.aggregates[i].sum+=rate;
			}
			if(movieObj.aggregates[i].name===Meteor.user().profile.profession)
			{
				foundProfession=1;
				movieObj.aggregates[i].count++;
				movieObj.aggregates[i].sum+=rate;
			}
		}

		if(foundGender==0)
			movieObj.aggregates.push({count:1,sum:rate,name:Meteor.user().profile.gender});
		// analogically for profession but wont include it for now
	}
	
	Movies.update(movieObj._id,{$set:{ratings:movieObj.ratings, aggregates:movieObj.aggregates}});
}

function addReview(title,review,rate,movieObj)
{
	for(var i=0;i<movieObj.reviews.length;i++)
	{
		if(movieObj.reviews[i].userId===Meteor.userId())
		{
			movieObj.reviews[i].title=title;
			movieObj.reviews[i].content=review;
			movieObj.reviews[i].rate=rate;
			Movies.update(movieObj._id,{$set:{reviews:movieObj.reviews}});
			return;
		}
	}
	var review = {title:title, content:review, rate:rate, userId:Meteor.userId()};
	Movies.update(movieObj._id,{$push:{reviews:review}});
}

Template.movie.events({
	'click #rateBtn' : function(e,t){
		e.preventDefault();
		if($('#rateBtn').hasClass("positive"))
		{
			addRate($('#rateMe').rating('get rating'),this);
			$('#rateMe').hide();
			$('#reviewBtn').show();
			$('#editBtn').show();
			$('#deleteBtn').show();
		}
		else
		{
			$('#rateMe').rating();
			$('#rateMe').show();
			$('#reviewBtn').hide();
			$('#editBtn').hide();
			$('#deleteBtn').hide();
		}
		$('#rateBtn').toggleClass("positive");
	},
	'click #reviewBtn' : function(e,t){
		e.preventDefault();
		if($('#reviewBtn').hasClass("positive"))
		{
			addReview($("#reviewMe").children()[0].children[1].value,$("#reviewMe").children()[1].children[1].value,$('#rateMe').rating('get rating'),this);
			$('#rateMe').hide();
			$('#reviewMe').hide();
			$('#rateBtn').show();
			$('#editBtn').show();
			$('#deleteBtn').show();
		}
		else
		{
			$('#reviewMe').show();
			$('#rateMe').rating();
			$('#rateMe').show();
			$('#rateBtn').hide();
			$('#editBtn').hide();
			$('#deleteBtn').hide();
		}
		$('#reviewBtn').toggleClass("positive");
	},
	'click #editBtn' : function(e,t){
		FlowRouter.go('edit.movie',{_id: this._id});
	},
	'click #deleteBtn' : function(e,t){
		$('.ui.basic.modal').modal('show');
	},
	'click .actorButton' : function(e,t){
        e.preventDefault();
        var target = e.target;
        while(target.getAttribute('id')===null) target=target.parentNode;
        FlowRouter.go('view.actor',{_id: target.getAttribute('id')});
    }
});