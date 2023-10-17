import { benchmark } from './benchmark';

benchmark(`./BENCHMARK_${process.version}.md`, 30000).catch(console.log);
