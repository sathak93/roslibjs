var ActionGoal = require("./ActionGoal");
var ActionResult = require("./ActionResult");
var ActionFeedback = require("./ActionFeedback");
var Service = require('../core/Service');
var ServiceRequest = require('../core/ServiceRequest');
var EventEmitter2 = require("eventemitter2").EventEmitter2;

function ActionHandle(options) {
  var that = this;
  options = options || {};
  this.ros = options.ros;
  this.name = options.name;
  this.actionType = options.actionType;
  

  this._messageCallback = function (data) {
    if (data.return_type === "feedback") {
      that.emit("feedback", new ActionFeedback(data));
    } else if (data.return_type === "result") {
      that.emit("result", new ActionResult(data));
    }
  };

  this.on("feedback", function (msg) {
    //console.log("feedback", msg.values);
    that.feedback = msg.values;
  })
  
  this.on("result", function (msg) {
    console.log("result", msg.values);
    that.status = msg.values;
  })

  this.cancel = new Service({
    ros : this.ros,
    name : this.name + '/_action/cancel_goal',
    messageType : 'action_msgs/srv/CancelGoal'
  });


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

  this.actionClientId =
    "create_client:" + this.name + ":" + ++this.ros.idCounter;
  this.ros.on(this.actionClientId, this._messageCallback);

  var call = {
    op: "createClient",
    id: this.actionClientId,
    action_name: this.name,
    action_type: this.actionType,
    args: goal,
  };
  this.ros.callOnConnection(call);

};

ActionHandle.prototype.cancelGoal = function(uuid, sec, nanosec , callback){
  var cancelMessage = new ServiceRequest({
    goal_info: {
      goal_id: {
        uuid: uuid},
      stamp: {
        sec: sec,
        nanosec:nanosec}
    }
  });
  console.log("canceling goal", cancelMessage);
  this.cancel.callService(cancelMessage, function(result) {
    callback(result);
    console.log("result of cancel", result)
  });
};



module.exports = ActionHandle;
