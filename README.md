# spool-greenlock
:package: Letsencrypt (greenlock) Spool for Fabrix

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]


## Configuration
You can configure letsencrypt under the file config/greenlock.ts (be sure it's added under config/index.ts or it will not be loaded)

Be sure to have spool-express installed and configured.

Here is a very simple example:

```js
export const greenlock = {
  server: 'staging', // Set to https://acme-v01.api.letsencrypt.org/directory in production
  email: 'john.doe@example.com',
  agreeTos: true,
  approvedDomains: ['example.com', 'www.example.com']
}
```

More information about the configuration possibilities here: https://git.daplie.com/Daplie/node-greenlock

## Usage
Add the spool under config/main.ts

```js
// config/main.ts
export const main = {
  // ...
  spools: [
    require('spool-router').RouterSpool,
    require('spool-express').ExpressSpool,
    require('spool-greenlock').GreenlockSpool
  ]
}
```

Letsencrypt can work only if you use 443 as secure port and 80 as default port so be sure to set them correctly 

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/fabrix-app/fabrix/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.


[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-greenlock.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-greenlock
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-greenlock/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-greenlock/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-greenlock.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-greenlock
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/Lobby
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-greenlock.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-greenlock/coverage
