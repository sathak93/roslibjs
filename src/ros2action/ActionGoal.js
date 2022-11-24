var assign = require('object-assign');

/**
 * A  ActionGoal is passed into the action call.
 *
 * @constructor
 * @param values - object matching the fields defined in the ..action definition file
 */
function ActionGoal(values) {
  assign(this, values);
}

module.exports = ActionGoal;