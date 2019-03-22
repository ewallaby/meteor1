import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Teams = new Mongo.Collection("Teams");
Teams.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  members: {
    type: Array,
    optional: true
  },
  "members.$": {
    type: Object
  },
  "members.$._id": {
    type: String,
  },
  "members.$.name": {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
    // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    optional: true
  },
}, { tracker: Tracker }));

Teams.allow({
    update: () => true,
    insert: () => true,
    remove() {
      return true;
    }
  });