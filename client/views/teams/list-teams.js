Template.listTeams.onCreated(function () {
  
    var instance = this;
  
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(100);
    
    instance.autorun(function () {
  
      var limit = instance.limit.get();  
      // subscribe to the teams publication
      instance.subscribe('currentUser');
      var subscription = instance.subscribe('Teams', limit);
  
      // if subscription is ready, set limit to newLimit
      if (subscription.ready()) {
        instance.loaded.set(limit);
      } else {
        console.log("> Subscription is not ready yet. \n\n");
      }
    });
  
    // 3. Cursor
  
    instance.teams = function() { 
      return Teams.find({}, {limit: instance.loaded.get()});
    }
  
  });

  Template.listTeams.helpers({
    'teams': function(){
        return Teams.find();
    },
    'teamsCount': function(){
        return Teams.find().count();
    }
});