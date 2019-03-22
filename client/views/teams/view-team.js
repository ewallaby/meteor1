
Template.viewTeam.onCreated(function () {
  
  var instance = this;
  instance.autorun(function () {

    var id = FlowRouter.getParam('_id');
    instance.subscribe('currentUser');
    instance.subscribe('team.single', id);
    instance.subscribe('users.all', 100);
  });

});

  Template.viewTeam.helpers({
    'team': function(){
        const teamId = FlowRouter.getParam('_id')
        return Teams.find({_id: teamId});
    }
});

Template.viewTeam.events({
  'click .btn-remove-member': function(ev){
      const teamId = FlowRouter.getParam('_id');
      const team = Teams.findOne(teamId);
      Meteor.call('removeTeamMember', team, this, (err, res) => {
          if (err) {
              swal("Oops!", "Could not remove member from team", "err");
          } else {
              swal("Done!", "User removed from team!", "success");
          }
      });
  }
});