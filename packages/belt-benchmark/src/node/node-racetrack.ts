import type { IRaceOptions } from '../common';
import { Racetrack } from '../common/racetrack';
import { performance as nodePerformance } from 'node:perf_hooks';

export class NodeRacetrack extends Racetrack {
  constructor(options: IRaceOptions) {
    super(options, {
      performance: nodePerformance as unknown as Performance,
    });
  }
}
