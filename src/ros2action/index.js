var Ros = require('../core/Ros');
var mixin = require('../mixin');

var actionhandle = module.exports = {
    ActionHandle: require('./Actions'),
    ActionGoal: require('./ActionGoal'),
    ActionResult: require('./ActionResult'),
    ActionFeedback: require('./ActionFeedback')
};

mixin(Ros, ['Actions'], actionhandle);
