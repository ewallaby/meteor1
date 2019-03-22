let Players = new Meteor.Collection('players'),
  PlayersIndex = new EasySearch.Index({
    collection: Players,
    fields: ['name'],
    engine: new EasySearch.MongoDB()
  });

if (Meteor.isClient){
Template.searchBox.helpers({
  playersIndex: () => PlayersIndex
});
};


  UsersIndex = new EasySearch.Index({
    collection: Meteor.users,
    fields: ['profile.firstName', 'profile.lastName', '_id'],
    engine: new EasySearch.MongoDB()
  });

if (Meteor.isClient){
Template.searchBox.helpers({
  usersIndex: () => UsersIndex
});
};