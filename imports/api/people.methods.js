import { Meteor } from 'meteor/meteor'

import { People } from './people.collection';

Meteor.methods({
  'people.checkIn'(personId) {
    People.update(personId, { $set: { checkInDate: new Date(), enabledCheckout: false } });

    // Atfer updating checkInDate, wait 5 seconds and update 'enabledCheckout' to true
    Meteor.setTimeout(() => {
      People.update(personId, { $set: { enabledCheckout: true } });
    }, 5000);
  },

  'people.checkOut'(personId) {
    People.update(personId, { $set: { checkOutDate: new Date() } });
  }
});