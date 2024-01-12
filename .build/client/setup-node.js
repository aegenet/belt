const path = require('node:path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
let JSDOMEnvironment = require(path.join(__dirname, './../../node_modules/jest-environment-jsdom'));
if (JSDOMEnvironment.default) {
  JSDOMEnvironment = JSDOMEnvironment.default;
}

const { createServer } = require('http-server');

process.env.BELT_TEST_SERVER_PORT = new Date().getMilliseconds() + Math.floor((Math.random() * 1000) + 8000);
function cloneAndPatchConfig(config) {
  const cloneConfig = JSON.parse(JSON.stringify(config));
  cloneConfig.testURL = `http://localhost:${process.env.BELT_TEST_SERVER_PORT}/`;
  return cloneConfig;
}

class BeltJSDOMEnvironment extends JSDOMEnvironment {

  constructor(config, options) {
    super(cloneAndPatchConfig(config), options);

    if (!this.global.fetch) {
      this.global.fetch = require('node-fetch');
    }

    this._patchFirePopstateOnRoute(this.global.window);
  }

  async setup() {
    this.app = createServer({
      root: path.join(process.cwd(), 'public'),
    });

    this.app.listen(process.env.BELT_TEST_SERVER_PORT);
  }

  async teardown() {
    if (this.app) {
      this.app.close();
    }
    await Promise.resolve(super.teardown());
  }

  _patchFirePopstateOnRoute(window/*: Window*/)/*: void*/ {
    const { history } = window;
    const originalBack = history.back;
    const originalForwards = history.forward;
  
    history['__proto__'].back = function patchedBack(context/*: History*/, ...args/*: Parameters<History['back']>*/)/*: void*/ {
      originalBack.apply(context, args);
  
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
  
    history.__proto__.forward = function patchedForward(context/*: History*/, ...args/*: Parameters<History['forward']>*/)/*: void*/ {
      originalForwards.apply(context, args);
  
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
  }
}

module.exports = BeltJSDOMEnvironment;
