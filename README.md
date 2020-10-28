# Video.io SDK for Node.js

Install
-------

    npm install @video-io/videokit-nodejs

Usage
-----

```javascript
const { VKitClient } = require('@video-io/videokit-nodejs')

const vkit = new VKitClient({
  appSecret: 'YOUR_APP_TOKEN'
})

const { sessionToken, expiresAt, identity } = await vkit.getSessionToken('END_USER_ID')

```

License
-------

Copyright @ 2020 [Video.io](https://video.io)

Licensed under Apache BSD-3-Clause.  Details in the attached LICENSE
file.