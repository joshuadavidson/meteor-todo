import { Meteor } from 'meteor/meteor';

import { Tasks } from './model.js';

// Only publish tasks that are public or belong to current user
Meteor.publish('tasks', function tasksPublication() {
  return Tasks.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId },
    ],
  });
});
