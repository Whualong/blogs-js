### WeakMap

- 实现原理
- 应用场景

#### 实现原理

```js

class WeakMap {
  constructor () {
    if (this instanceof WeakMap) {
      Object.defineProperty(this, '_id', {
        enumerable: false,
        writable: false,
        value: +new Date(),
        configurable: false
      })
    } else {
      const weak = new WeakMap()
      Object.defineProperty(weak, '_id', {
        enumerable: false,
        writable: false,
        value: +new Date(),
        configurable: false
      })
      return weak
    }
  }

  get (key) {
    if (key != null && typeof key === 'object') {
      const entry = key[this._id]
      return entry && (entry[0] === key ? entry[1] : undefined)
    } else {
      return undefined
    }
  }

  set (key, value) {
    if (key != null && typeof key === 'object') {
      Object.defineProperty(key, this._id, {
        value: [key, value],
        enumerable: false
      })
    } else {
      throw new Error('key must a object')
    }
  }
}
```

#### 应用场景

- 封装私有属性（不会造成内存泄漏）
- 把dom对象作为key,管理依赖的数据（不会造成内存泄漏）

封装私有属性

```js

const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown {
    constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
    }
    dec() {
        let counter = _counter.get(this);
        if (counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if (counter === 0) {
            _action.get(this)();
        }
    }
}
let w = new Countdown(2,()=>{console.log('done')});
w.dec() // 1
w.dec() // done

```

管理dom依赖

```js

let myWeakmap = new WeakMap();
myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;
document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);

// 当dom节点不存在时 依赖的对象也会被垃圾回收机制回收

```

