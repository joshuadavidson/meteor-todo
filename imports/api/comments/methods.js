import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Comments } from './models.js';

// TODO: insert method is just example for now

Meteor.methods({
  'comments.add'(parentId, content) {
    check(parentId, String);
    check(content, String);

    let type;

    // Determine if parent is comment or task to set type
    // if doc doesn't exist in comments then it is task
    const parentDoc = Comments.findOne(parentId);
    if (parentDoc && parentDoc.type === 'comment') {
      type = 'reply';
    }
    else {
      type = 'comment';
    }

    // Add the new comment
    Comments.insert({
      authorId: Meteor.userId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
      numReplies: 0,
      numLikes: 0,
      parentId,
      type,
      content,
    });

    // if comment was a reply then update the numReplies on parent
    if (type === 'reply') {
      Comments.update(parentId, {
        $inc: {
          numReplies: 1,
        },
      });
    }
  },

  'comments.like'(commentId) {
    check(commentId, String);

    Comments.update(commentId, {
      $inc: {
        numLikes: 1,
      },
    });
  },
});
