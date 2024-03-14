export type TaskFlowConstructable<T = object> = {
  new (...args: any[]): T;
};

export interface TaskFlowDisposable {
  dispose(): void;
}
