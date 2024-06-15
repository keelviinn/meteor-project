import { Meteor } from 'meteor/meteor';
import { People } from '/imports/api/people.collection';
import { Communities } from '/imports/api/communities.collection';
import { loadInitialData } from '/imports/infra/initial-data';

// Import methods
import '/imports/api/people.methods';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE

  // Publish People collection
  Meteor.publish('people', function(communityId) {
    return People.find({ communityId });
  });

  // Publish Communities collection
  Meteor.publish("communities", function() {
    return Communities.find();
  });
});