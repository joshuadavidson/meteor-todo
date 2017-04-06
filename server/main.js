import { Meteor } from 'meteor/meteor';

// Task components
import '../imports/api/tasks/publications.js';
import '../imports/api/tasks/methods.js';

// Comment components
import '../imports/api/comments/methods.js';
import '../imports/api/comments/publications.js';

Meteor.startup(() => {
  // code to run on server at startup
});
