var assign = require('object-assign');

/**
 * A  ActionFeedback is the returned callback from the action call.
 *
 * @constructor
 * @param values - object matching the fields defined in the .action definition file
 */
function ActionFeedback(values) {
  assign(this, values);
}

module.exports = ActionFeedback;