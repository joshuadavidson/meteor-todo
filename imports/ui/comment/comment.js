import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// Component templates
import './comment.html';

// Import external components used within thread
import './thread.js';
import './addComment.js';

// Setup inital state on component creation
Template.comment.onCreated(function commentOnCreated() {
  this.state = new ReactiveDict();
  // Detemine whether to show modified date by comparing dates
  const instance = Template.instance();

  instance.state.set('showModifiedAt', this.data.createdAt != this.data.modifiedAt);

  Meteor.subscribe('comments');
});

Template.comment.onRendered(function commentOnRendered() {
  const instance = Template.instance();
  const id = instance.data._id;

  // event handlers got tricky here
  // used ID here get unique instance event handler not
  // available in Template.comments.events
  // TODO: look into cleaner implementation

  // Handle toggle of show replies button
  instance.$(`.comment-show-replies-btn[data-id="${id}"]`).on('click', function onClick() {
    instance.state.set('showReplies', !instance.state.get('showReplies'));
  });

  // Handle like button
  instance.$(`.comment-like-btn[data-id=${id}]`).on('click', function onClick() {
    Meteor.call('comments.like', id);
  });

  // Handle toggle of reply button
  instance.$(`.comment-reply-btn[data-id=${id}]`).on('click', function onClick() {
    instance.state.set('showAddReply', !instance.state.get('showAddReply'));
  });

  // Handle toggle of edit button
  instance.$(`.comment-edit-btn[data-id=${id}]`).on('click', function onClick() {
    instance.state.set('showEditForm', !instance.state.get('showEditForm'));
  });
});

Template.comment.helpers({
  isComment() {
    return this.type === 'comment';
  },
  isAuthor() {
    return this.authorId === Meteor.userId();
  },
  showModifiedAt() {
    const instance = Template.instance();
    return instance.state.get('showModifiedAt');
  },
  showReplies() {
    const instance = Template.instance();
    return instance.state.get('showReplies');
  },
  showReplyForm() {
    const instance = Template.instance();
    return instance.state.get('showAddReply');
  },
  showEditForm() {
    const instance = Template.instance();
    return instance.state.get('showEditForm');
  },
  hasReplies() {
    return this.numReplies;
  },
});

Template.comment.events({
  'submit .comment-edit-form'(event, templateInstance) {
    // prevent default browser form submit
    event.preventDefault();

    Meteor.call('comments.edit', this._id, event.target.content.value);
    templateInstance.state.set('showEditForm', false);
    templateInstance.state.set('showModifiedAt', true);
  },
});
