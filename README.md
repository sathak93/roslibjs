**NOTE** (April 2023): This [PRL fork of `roslibjs`](https://github.com/personalrobotics/roslibjs), and the corresponding [PRL fork of `rosbridge_suite`](https://github.com/personalrobotics/rosbridge_suite), is to account for the fact that the [official `rosbridge_suite`](https://github.com/RobotWebTools/rosbridge_suite) and [official `roslibjs`](https://github.com/RobotWebTools/roslibjs) do not currently work with ROS2 actions. [This is a PR to address that](https://github.com/RobotWebTools/rosbridge_suite/pull/813), and it formed the basis for these two PRL forks. If ROS2 action support is added to both `rosbridge_suite` and `roslibjs`, then these two PRL forks can be removed (and any code that uses them, like the [PRL `feeding_web_interface`](https://github.com/personalrobotics/feeding_web_interface), updated).

# roslibjs

[![CI](https://github.com/RobotWebTools/roslibjs/actions/workflows/main.yml/badge.svg)](https://github.com/RobotWebTools/roslibjs/actions/workflows/main.yml)

## The Standard ROS JavaScript Library

For full documentation, see [the ROS wiki](http://wiki.ros.org/roslibjs) or check out some [working demos](http://robotwebtools.org/demos.html).

[JSDoc](http://robotwebtools.org/roslibjs) can be found on the Robot Web Tools website.

This project is released as part of the [Robot Web Tools](http://robotwebtools.org/) effort.

## Usage

Pre-built files can be found in either [roslib.js](build/roslib.js) or [roslib.min.js](build/roslib.min.js).

Alternatively, you can use the current release via the [JsDelivr](https://www.jsdelivr.com/) CDN: ([full](https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.js)) | ([min](https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.min.js))

## Troubleshooting

1. Check that connection is established. You can listen to error and
   connection events to report them to console. See
   examples/simple.html for a complete example:

   ```js
   ros.on('error', function(error) { console.log( error ); });
   ros.on('connection', function() { console.log('Connection made!'); });
   ```

2. Check that you have the websocket server is running on
   port 9090. Something like this should do:

   ```bash
   netstat -a | grep 9090
   ```

## Dependencies

roslibjs has a number of dependencies. You will need to run:

```bash
npm install
```

Depending on your build environment.

## Build

Checkout [CONTRIBUTING.md](CONTRIBUTING.md) for details on building.

## License

roslibjs is released with a BSD license. For full terms and conditions, see the [LICENSE](LICENSE) file.

## Authors

See the [AUTHORS.md](AUTHORS.md) file for a full list of contributors.
