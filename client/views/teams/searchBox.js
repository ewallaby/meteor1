import swal from 'sweetalert';
Template.searchBox.onCreated(function () {
  
    var instance = this;
    instance.autorun(function () {
  
      instance.subscribe('currentUser');
      instance.subscribe('users.all', 100);
    });
  
  });
  
Template.searchBox.events({
    'click .btn-add-member': function(ev){
        const teamId = FlowRouter.getParam('_id');
        const team = Teams.findOne(teamId);
        Meteor.call('addTeamMember', team, this, (err, res) => {
            if (err) {
                swal("Oops!", "Could not add member", "err");
            } else {
                swal("Done!", "User added to team!", "success");
            }
        });
    }
});
