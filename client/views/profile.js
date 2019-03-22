if (Meteor.isClient)
    AutoForm.debug()
Template.profile.onCreated(function () {  
    var instance = this;
  
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(100);
    instance.autorun(function () {
  
      // get the limit
      var limit = instance.limit.get();
    
      // subscribe to the teams publication
      instance.subscribe('currentUser');
      instance.subscribe('users.all', 100);
      var subscription = instance.subscribe('Teams', 100);
  
      // if subscription is ready, set limit to newLimit
      if (subscription.ready()) {
        instance.loaded.set(limit);
      } else {
        console.log("> Subscription is not ready yet. \n\n");
      }
    });
  
    // 3. Cursor
  
    instance.teams = function() { 
      return Teams.find({}, {limit: instance.loaded.get(), sort: { createdAt: -1 }});
    }
  
  });

  Template.profile.helpers({
    teams: () => Teams.find({'members._id': Meteor.userId()})
  });

  Template.UserProfileEdit.onCreated(function () {
  
    var instance = this;
    instance.autorun(function () {
  
      instance.subscribe('currentUser');
      instance.subscribe('users.all', 100);
    });
  
  });
  AutoForm.addHooks(['updateUserForm'], {
    before: {
      insert: function(doc) {
        console.log('doc: ', doc);
        return doc;
      },
  
      update: function(doc) {
        console.log('doc: ', doc);
        return doc;
      },
    },
  });