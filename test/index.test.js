'use strict'

const t = require('tap')
const proxyquire = require('proxyquire')
const fetchMock = require('fetch-mock').sandbox()
const { VKitClient } = proxyquire('../index', { 'node-fetch': fetchMock })

t.test('main', async t => {
  t.plan(4)

  t.ok(typeof VKitClient === 'function')

  const vkit = new VKitClient({
    appSecret: 'TEST_APP_TOKEN'
  })

  t.ok(typeof vkit === 'object')

  const reqIdentity = 'user1'
  const data = { sessionToken: 'token', expiresAt: 'now', identity: reqIdentity }

  fetchMock.config.fallbackToNetwork = false
  fetchMock.post('https://gateway.video.io/v1/sessions', {
    status: 200, body: data
  })

  try {
    const res = await vkit.getSessionToken(reqIdentity)

    t.ok(JSON.stringify(res) === JSON.stringify(data))
  } catch (err) {
    t.error(err)
  }

  fetchMock.reset()

  t.ok('ok')
})
