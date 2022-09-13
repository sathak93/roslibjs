var ActionGoal = require("./ActionGoal");
var ActionResult = require("./ActionResult");
var ActionFeedback = require("./ActionFeedback");
var EventEmitter2 = require("eventemitter2").EventEmitter2;

function ActionHandle(options) {
  options = options || {};
  this.ros = options.ros;
  this.name = options.name;
  this.actionType = options.actionType;
  var that = this;
  this._messageCallback = function (data) {
    if (data.return_type === "feedback") {
      that.emit("feedback", new ActionFeedback(data));
    } else if (data.return_type === "result") {
      that.emit("result", new ActionResult(data));
    }
  };
  this.on("feedback", function (msg) {
    console.log("feedback", msg.values);
    that.feedback = msg.values;
  })
  
  this.on("result", function (msg) {
    console.log("result", msg.values);
    that.status = msg.values;
  })
}
ActionHandle.prototype.__proto__ = EventEmitter2.prototype;
/**
 * Calls the service. Returns the service response in the
 * callback. Does nothing if this service is currently advertised.
 *
 * @param request - the ROSLIB.ServiceRequest to send
 * @param callback - function with params:
 *   * response - the response from the service request
 * @param failedCallback - the callback function when the service call failed (optional). Params:
 *   * error - the error message reported by ROS
 */

ActionHandle.prototype.createClient = function (
  goal,
  callback,
  failedCallback,
  feedbackCallback
) {
  if (typeof callback === "function") {
    this.on("feedback" || "result", callback);
  }

  var actionClientId =
    "create_client:" + this.name + ":" + ++this.ros.idCounter;
  this.ros.on(actionClientId, this._messageCallback);

  var call = {
    op: "createClient",
    id: actionClientId,
    action_name: this.name,
    action_type: this.actionType,
    args: goal,
  };
  this.ros.callOnConnection(call);
};



module.exports = ActionHandle;
