![](https://github.com/Video-io/videokit-nodejs/workflows/Node.js%20CI/badge.svg?branch=main)
![](https://github.com/Video-io/videokit-nodejs/workflows/Node.js%20Package/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Video-io/videokit-nodejs/badge.svg)](https://snyk.io/test/github/Video-io/videokit-nodejs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)


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