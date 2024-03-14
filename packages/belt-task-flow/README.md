[![npm version](https://img.shields.io/npm/v/@aegenet/belt-task-flow.svg)](https://www.npmjs.com/package/@aegenet/belt-task-flow)
<br>

# @aegenet/belt-task-flow

> Enables loosely coupled publish/subscribe messaging. Awaiting version with FIFO (first in first out)

## 💾 Installation

```shell
yarn add @aegenet/belt-task-flow@^1.5.0
# or
npm i @aegenet/belt-task-flow@^1.5.0
```

## 📝 Usage

### TaskFlow

```typescript
import { TaskFlow, type ITaskFlow } from '@aegenet/belt-task-flow';

const taskFlow: ITaskFlow = new TaskFlow();

const tabs: string[] = [];

taskFlow.subscribe('Something', async () => {
  await delay(200);
  tabs.push('with delay');
});

taskFlow!.subscribe('Something', () => {
  tabs.push('without delay');
});


await taskFlow!.publish('Something');

// tabs => ['with delay', 'without delay']

await taskFlow!.publish('Something');

// tabs => ['with delay', 'without delay', 'with delay', 'without delay']

taskFlow.dispose();
```

### Listener & subscription

```typescript
import { TaskFlow, type ITaskFlow, TaskFlowListener, taskFlowMethod } from '@aegenet/belt-task-flow';

const taskFlow: ITaskFlow = new TaskFlow();

class ListenToMe extends TaskFlowListener {
    public msg: string[] = [];

    constructor() {
      super(taskFlow!);
    }

    @taskFlowMethod()
    public doIt() {
      this.msg.push('hello');
    }
}

// [...]
const listenToMe = new ListenToMe();

// publish
await taskFlow!.publish('tf.ListenToMe:doIt');
// listenToMe.msg => ['hello']

// [...]
listenToMe.dispose();
taskFlow.dispose();
```
