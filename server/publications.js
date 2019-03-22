Meteor.publish('currentUser', () => {
    console.log('run sub currentUser');
    return Meteor.users.find({ _id: this.userId });
  });
  Meteor.publish('users.all', (limit) => {
    console.log('run sub users.all');
    const fields = {
        profile: 1,
        emails: 1
    };
    return Meteor.users.find({}, {limit: limit, fields: fields});
  });
// publish Teams
Meteor.publish('Teams', function(limit) {
    console.log('run sub Teams');
    Meteor._sleepForMs(2000);
    return Teams.find({}, {limit: limit, sort: { createdAt: -1 }});
});
Meteor.publish('team.single', function(id) {
    console.log('run sub team.single');
    Meteor._sleepForMs(2000);
    return Teams.find(id);
});