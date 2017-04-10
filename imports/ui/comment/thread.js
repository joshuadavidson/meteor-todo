import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Component templates
import './thread.html';

// Import external components used within thread
import './comment.js';
import './addComment.js';

// Import API files
import { Comments } from '../../api/comments/models.js';

Template.thread.onCreated(function ThreadOnCreated() {
  const instance = Template.instance();

  Meteor.subscribe('comments');
});

Template.thread.helpers({
  comments() {
    const instance = Template.instance();

    // Retrieve only commments that match parentId and type
    return Comments.find(
      {
        parentId: instance.data.externalId,
        type: instance.data.type,
      },
      {
        sort: {
          createdAt: -1,
        },
      },
    );
  },
});
