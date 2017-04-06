import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Comments } from './models.js';

// Publish all comments with passed parentID and scope
Meteor.publish('comments', function commentsPublication(parentId, type) {
  check(parentId, String);
  check(type, String);

  return Comments.find({
    parentId,
    type,
  });
});
