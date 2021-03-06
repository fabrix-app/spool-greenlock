"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@fabrix/fabrix/dist/common");
const config = require("./config/index");
const pkg = require("../package.json");
const greenlock = require('greenlock');
const http = require('http');
const https = require('https');
const lodash_1 = require("lodash");
class GreenlockSpool extends common_1.Spool {
    constructor(app) {
        super(app, {
            config: config,
            pkg: pkg,
            api: {}
        });
    }
    validate() {
        if (lodash_1.includes(lodash_1.keys(this.app.config.get('main.spools')), 'express')) {
            return Promise.reject(new Error('spool-express must be installed!'));
        }
        if (!this.app.config.get('greenlock')) {
            return Promise.reject(new Error('config.greenlock is absent, please create the config file'));
        }
        return Promise.resolve();
    }
    configure() {
        const port = this.app.config.get('web.port');
        const host = this.app.config.get('web.host');
        const portHttp = this.app.config.get('web.portHttp') || 80;
        const redirectToHttps = this.app.config.get('web.redirectToHttps') || true;
        const greenlockConfig = this.app.config.get('greenlock');
        if (greenlockConfig.enabled) {
            this.app.log.debug('Letsencrypt setup');
            this.app.config.set('web.externalConfig', (fabrixApp, expressApp) => {
                const le = greenlock.create(lodash_1.cloneDeep(greenlockConfig));
                return new Promise((resolve, reject) => {
                    const nativeServer = https.createServer(le.httpsOptions, le.middleware(expressApp))
                        .listen(port, host, err => {
                        if (err) {
                            return reject(err);
                        }
                        const httpServer = http.createServer(redirectToHttps
                            ? le.middleware(require('redirect-https')())
                            : le.middleware(expressApp))
                            .listen(portHttp, host, _err => {
                            if (_err) {
                                return reject(_err);
                            }
                            resolve([nativeServer, httpServer]);
                        });
                    });
                });
            });
        }
        else {
            this.app.log.warn('Letsencrypt not enable because config.greenlock.enabled = false');
        }
    }
}
exports.GreenlockSpool = GreenlockSpool;
