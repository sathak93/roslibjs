var assign = require('object-assign');

/**
 * A  ActionResult is returned from the action call.
 *
 * @constructor
 * @param values - object matching the fields defined in the .action definition file
 */
function ActionResult(values) {
  assign(this, values);
}

module.exports = ActionResult;