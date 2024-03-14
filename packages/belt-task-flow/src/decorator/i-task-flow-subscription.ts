import type { TaskFlowDisposable } from '../common/types';

export interface ITaskFlowSubscription {
  channel: string;
  once: boolean;
  methodName: string;
  token?: TaskFlowDisposable;
  order?: number;
}
