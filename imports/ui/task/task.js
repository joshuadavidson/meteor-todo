import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// Component templates
import './task.html';

// Import external components used within
import '../comment/thread.js';
import '../comment/addComment.js';

Template.task.onCreated(function taskOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showComments', false);
});

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },

  // Pass the showComments state to the template
  showComments() {
    const instance = Template.instance();
    return instance.state.get('showComments');
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },

  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },

  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },

  // Toggle showComments state when toggle comment is clicked
  'click .toggle-comments'(event, templateInstance) {
    templateInstance.state.set('showComments', !templateInstance.state.get('showComments'));
  },
});
