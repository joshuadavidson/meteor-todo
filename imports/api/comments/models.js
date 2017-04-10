import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

export const Comments = new Mongo.Collection('comments');

Comments.schema = new SimpleSchema({
  authorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  authorName: {
    type: String,
  },

  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },

  modifiedAt: {
    type: Date,
  },

  numReplies: {
    type: Number,
    defaultValue: 0,
  },

  numLikes: {
    type: Number,
    defaultValue: 0,
  },

  parentId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  scope: {
    type: String,
  },

  content: {
    type: String,
    label: 'Comment content',
  },
});
