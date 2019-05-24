import { Spool } from '@fabrix/fabrix/dist/common'

import * as config from './config/index'
import * as pkg from '../package.json'

const greenlock = require('greenlock')
const http = require('http')
const https = require('https')

import { keys, cloneDeep, includes } from 'lodash'

/**
 * Letsencrypt Spool
 *
 * @class Letsencrypt
 * @see {@link http://fabrixjs.io/doc/spool}
 */
export class GreenLockSpool extends Spool {
  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: {}
    })
  }

  /**
   * Ensure that config/letsencrypt is valid
   * and express spools is installed
   */
  validate() {
    if (includes(keys(this.app.config.get('main.spools')), 'express')) {
      return Promise.reject(
        new Error('spool-express must be installed!'))
    }
    if (!this.app.config.get('greenlock')) {
      return Promise.reject(
        new Error('config.greenlock is absent, please create the config file'))
    }
    return Promise.resolve()
  }

  configure() {
    const port = this.app.config.get('web.port')
    const host = this.app.config.get('web.host')
    const portHttp = this.app.config.get('web.portHttp') || 80
    const redirectToHttps = this.app.config.get('web.redirectToHttps') || true
    const config = this.app.config.get('greenlock')

    if (config.enabled) {
      this.app.log.debug('Letsencrypt setup')
      this.app.config.set('web.externalConfig', (fabrixApp, expressApp) => {
        const le = greenlock.create(cloneDeep(config))
        return new Promise((resolve, reject) => {
          const nativeServer = https.createServer(le.httpsOptions, le.middleware(expressApp))
            .listen(port, host, err => {
              if (err) return reject(err)
              const httpServer = http.createServer(redirectToHttps ? le.middleware(require('redirect-https')()) : le.middleware(expressApp))
                .listen(portHttp, host, err => {
                  if (err) return reject(err)
                  resolve([nativeServer, httpServer])
                })
            })
        })
      })
    }
    else {
      this.app.log.warn('Letsencrypt not enable because config.greenlock.enabled = false')
    }
  }
}