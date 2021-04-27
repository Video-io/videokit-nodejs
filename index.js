'use strict'

const fetch = require('node-fetch')

function VKitClient (opt) {
  this._appSecret = opt.appSecret
}

/**
 * identity = unique identifier for your user.
 * scopes = array of security scopes to be enabled for this session. Example: [
   'videos.admin.read',
   'videos.read',
   'videos.edit',
   'videos.delete',
   'videos.create',
   'streams.admin.read',
   'streams.read',
   'streams.create',
   'streams.delete',
 ]
 * See https://docs.video.io/javascript/core-session for more information.
 *
 * @param identity
 * @param scopes
 * @returns {Promise<{identity: (*|string), sessionToken: string, scopes: *, expiresAt: string}>}
 */
VKitClient.prototype.getSessionToken = async function (identity, scopes) {
  if (!identity) return

  if (!scopes) {
    scopes = []
  }

  const { data, err } = await this._makeFetch({
    path: '/v1/sessions',
    method: 'POST',
    body: {
      identity,
      scopes
    }
  })

  if (err) {
    throw new Error('videokit client error: ' + err)
  }

  return {
    sessionToken: data.sessionToken,
    expiresAt: data.expiresAt,
    identity: data.identity,
    scopes: scopes,
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
  } catch (err) {
    return { err }
  }
}

module.exports = {
  VKitClient
}
