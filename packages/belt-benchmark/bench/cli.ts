import { benchmark } from './benchmark';

benchmark('./BENCHMARK.md', 100000).catch(console.log);
