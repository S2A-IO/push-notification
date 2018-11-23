# push-notification
Push Notification services for S2A
- [Installation](#installation)
- [Usage Example](#usage-example)

## Installation
  ```
npm install git://github.com/S2A-IO/push-notification --save
  ```
push-notification has the peerDependencies of bluebird and fcm-push we have to install it.
```
npm install bluebird fcm-push --save
```
## Usage Example
```
// Please change the parameters with valid values and parameters to run the test case
data.env = {
  serverKey: 'serverKey'
};
// Please change the parameters with valid values and parameters to run the test case
data.current = {
  to: 'deviceId',
  notification: {
    title : 'TEST',
    body : 'TEST',
    sound : 'default'
  }
};
```

| Field    | Description      | Required       |
|----------|-------------|----------------|
| data   | Data passed to this function.  | **YES** |
| context      | Client context. Unused. | **YES** |
| callback      | Callback function to pass back the response. | **YES** |
  ```
const pushNotification = require('./../server/index');

pushNotification.handler(incorrectParams, context, function testHandler ( error, res) {
  if ( error ) {
    console.log('error',error);
  } else {
    console.log('res',res);
  }
});
  ```
