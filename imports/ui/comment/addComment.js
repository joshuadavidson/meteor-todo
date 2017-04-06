import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// Component templates
import './addComment.html';

Template.addComment.onRendered(function commentOnRendered() {
  const instance = Template.instance();
  const parentId = instance.data.parentId;

  // event handlers got tricky here
  // used ID here get unique instance event handler not
  // available in Template.comments.events
  // TODO: look into cleaner implementation

  // Handle sumit of new reply
  instance.$(`.comment-form-container[data-id=${parentId}]`).on('submit', function onSubmit(event) {
    console.log('submitted');
    // Prevent default browser form submit
    event.preventDefault();
    Meteor.call('comments.add', parentId, event.target.content.value);
  });
});

Template.addComment.helpers({
  getUsername() {
    return Meteor.user().username;
  },
});
//
// Template.addComment.events({
//   'submit .comment-form-container'(event, templateInstance) {
//     // Prevent default browser form submit
//     event.preventDefault();
//     Meteor.call('comments.add', parentId, event.target.content.value);
//   },
// });
