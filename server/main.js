import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Accounts.onCreateUser((options, user) => {
  user.spot = 0;
  user.savedGift1 = null;
  user.savedGift2 = null;
  // Don't forget to return the new user object at the end!
  return user;
});

Meteor.publish('userData', function() {
     var currentUser;
     currentUser = this.userId;
     if (currentUser) {
         return Meteor.users.find({
             _id: currentUser
         }, {
         fields: {
             "emails": 1,
             "spot": 1,
             "savedGift1": 1,
             "savedGift2": 1
         }
      });
    } else {
      return this.ready();
  }
});

Meteor.methods({
  'user.updateSpot'(userId, plusOne) {
    check(userId, String);
    check(plusOne, Number);
 
    Meteor.users.update(userId, {
      $set: {
        spot: plusOne
      }
    });
  },
  'user.saveGift'(userId, gift, i) {
    check(userId, String);
    check(gift, String);
    check(i, Number);

    if(i === 0) {
      Meteor.users.update(userId, {
        $set: {
          savedGift1: gift
        }
      });
    } else {
      Meteor.users.update(userId, {
        $set: {
          savedGift2: gift
        }
      });
    }
  },
  'user.useGift'(userId, i) {
    check(userId, String);
    check(i, Number);

    if(i === 0) {
      Meteor.users.update(userId, {
        $set: {
          savedGift1: 'This gift has been used!'
        }
      });
    } else {
      Meteor.users.update(userId, {
        $set: {
          savedGift2: 'This gift has been used!'
        }
      });
    }
  }
});

