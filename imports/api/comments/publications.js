import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Comments } from './models.js';

// Publish all comments
Meteor.publish('comments', function commentsPublication() {
  return Comments.find({});
});
