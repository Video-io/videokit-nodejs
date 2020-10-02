const fetch = require('node-fetch')

function VKitClient (opt) {
  this._appSecret = opt.appSecret
}

VKitClient.prototype.getSessionToken = async function (identity) {
  if (!identity) return

  const { data, err } = await this._makeFetch({
    path: '/v1/sessions',
    method: 'POST',
    body: {
      identity
    }
  })

  if (err) {
    throw new Error('VkitClient error: ' + err)
  }

  return {
    sessionToken: data.sessionToken,
    expiresAt: data.expiresAt,
    identity: data.identity
  }
}

VKitClient.prototype._makeFetch = async function (opt) {
  const { path, method, body } = opt
  try {
    const res = await fetch(`https://gateway.video.io${path}`, {
      method,
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this._appSecret,
        Accept: 'application/json',
        'Accept-Charset': 'utf-8',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    const data = await res.json()

    if (data.error) {
      return { err: data.error }
    }

    return { data, err: null }
  } catch (err) {}
}

module.exports = {
  VKitClient
}
