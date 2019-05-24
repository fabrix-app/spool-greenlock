'use strict'

/**
 * Letsencrypt Configuration
 * (app.config.letsencrypt)
 *
 * Configure letsencrypt
 *
 * @see {@link https://git.daplie.com/Daplie/node-greenlock}
 */
export const greenlock = {
  enabled: false, // enable letsencrypt or not
  debug: false, // debug mode for greenlock, can help for debugging
  server: 'staging', // Set to https://acme-v01.api.letsencrypt.org/directory in production
  email: 'john.doe@example.com',
  agreeTos: true,
  approveDomains: ['example.com', 'www.example.com']
}
