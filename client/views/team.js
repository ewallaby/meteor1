Template.team.onCreated(function () {
  
    var instance = this;
  
    // initialize the reactive variables
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(5);
    
    // will re-run when the "limit" reactive variables changes
    instance.autorun(function () {
  
      // get the limit
      var limit = instance.limit.get();
    
      // subscribe to the teams publication
      instance.subscribe('currentUser');
      var subscription = instance.subscribe('teams', limit);
  
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

  Template.team.helpers({
    'teams': function(){
        return Teams.find({}, {limit: instance.loaded.get(), sort: { createdAt: -1 }});
    }
});