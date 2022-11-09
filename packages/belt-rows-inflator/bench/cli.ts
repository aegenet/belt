import { bench100x10000PKs } from './bench-100x10000-pks';
import { bench100x10000WoPKs } from './bench-100x10000-wo-pks';

async function main() {
  console.log('bench100x10000WoPKs');
  await bench100x10000WoPKs();
  console.log('bench100x10000PKs');
  await bench100x10000PKs();
}

main();
