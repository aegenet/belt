const fs = require('fs');
const path = require('path');

let projectName = process.argv[2];

const coveragePath = path.join(process.cwd(), 'coverage');
fs.renameSync(path.join(coveragePath, 'coverage-final.json'), path.join(coveragePath, `coverage-final-${projectName}.json`));
