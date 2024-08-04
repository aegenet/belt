[![npm version](https://img.shields.io/npm/v/@aegenet/belt-anti-bounce.svg)](https://www.npmjs.com/package/@aegenet/belt-anti-bounce)
<br>

# @aegenet/belt-anti-bounce

> `@antiBounce` a debounce decorator for TypeScript classes to prevent multiple calls in a short period of time.

**Note**: `Stage 3` decorator *(for stage 2, you can use an older version (< 2.0.0) of this package)*.

## 💾 Installation

```shell
yarn add @aegenet/belt-anti-bounce@^1.6.0
# or
npm i @aegenet/belt-anti-bounce@^1.6.0
```

## 📝 Usage

```typescript
import { IAntiBounceSupport, IAntiBounce, disposeAntiBounces } from '@aegenet/belt-anti-bounce';

class Sample implements IAntiBounceSupport {
  public declare $antiBounces?: Map<string, IAntiBounce>;
  private _i = 0;

  @antiBounce({ duration: 300 })
  public inc(): void {
    this._i++;
  }

  public main() {
    this.inc();
    this.inc();
    this.inc();
    // this._i => 1
  }

  public dispose() {
    disposeAntiBounces(this);
  }
}
```

> AntiBounce, utility

```typescript
import { AntiBounce } from '@aegenet/belt-anti-bounce';

let i = 0;
const diposable = new AntiBounce(() => i++, 300);
assert.strictEqual(i, 0);
// Go !
diposable.call();
diposable.call();
diposable.call();
diposable.call();
// i = 0
await delay(300);
// i = 1

diposable.dispose();
```
