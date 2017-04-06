import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Comments } from './models.js';

// TODO: insert method is just example for now

Meteor.methods({
  'comments.add'(parentId, content) {
    check(parentId, String);
    check(content, String);

    let type;

    const parentDoc = Comments.findOne(parentId);

    if (parentDoc && parentDoc.type === 'comment') {
      type = 'reply';
    }
    else {
      type = 'comment';
    }

    console.log('Type: '+type);

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
