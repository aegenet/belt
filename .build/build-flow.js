const path = require('node:path');
const fs = require('node:fs');
const child_process = require('node:child_process');
const util = require('node:util');
const exec = util.promisify(child_process.exec);
const IS_SILENT = process.env.BUILD_SILENT === 'true';

const tasks = {
  /** Clean up */
  clean: project => `cd ./packages/${project.name}/ && yarn run clean`,
  /** Delete dependencies */
  deleteNodeModules: project => {
    let cmd = `node ./node_modules/rimraf/dist/cjs/src/bin.js ./packages/${project.name}/node_modules`;
    return cmd;
  },
  /** Upgrade dependencies */
  upgrade: project => {
    let cmd = `cd ./packages/${project.name}/ && node ./../../node_modules/rimraf/dist/cjs/src/bin.js ./node_modules && node ./../../node_modules/rimraf/dist/cjs/src/bin.js ./yarn.lock`;
    
    project.links.forEach(link => {
      cmd += ` && yarn link ${link}`;
    });

    cmd += ' && yarn && yarn link';
  
    return cmd;
  },
  /** Dependencies (yarn & link) */
  dependencies: project => {
    let cmd = `cd ./packages/${project.name}/`;
    
    project.links.forEach(link => {
      cmd += ` && yarn link ${link}`;
    });
    
    cmd += ' && yarn && yarn link';

    return cmd;
  },
  /** Lint */
  lint: project => `cd ./packages/${project.name}/ && yarn run lint`,
  /** Build */
  build: project => {
    const cmds = [];
    cmds.push(`cd ./packages/${project.name}/`);

    let version;
    if (process.env.GITHUB_REF_TYPE === 'tag') {
      version = process.env.GITHUB_REF_NAME;
    } else if (process.env.GITHUB_REF_NAME) {
      // workflow github
      version = `999.${new Date().getTime()}.0`;
    }

    if (version) {
      cmds.push(`npm version "${version}"`);
    }

    cmds.push('yarn build');

    return cmds.join(' && ');
  },
  /** Test */
  test: project => {
    const projectPath = path.join(process.cwd(), `./packages/${project.name}`);
    const pkgProject = require(path.join(projectPath, 'package.json'));

    for (const key of ['main', 'module', 'browser']) {
      if (!fs.existsSync(path.join(projectPath, pkgProject[key]))) {
        throw new Error(`package.json/${key} must exists (${pkgProject[key]})`);
      }
    }
    for (const key of ['require', 'import']) {
      if (!fs.existsSync(path.join(projectPath, pkgProject.exports.node[key]))) {
        throw new Error(`package.json/node/${key} must exists (${pkgProject.exports.node[key]})`);
      }
    }
    for (const key of ['require', 'import']) {
      if (!fs.existsSync(path.join(projectPath, pkgProject.exports.default[key]))) {
        throw new Error(`package.json/default/${key} must exists (${pkgProject.exports.default[key]})`);
      }
    }

    return `cd ./packages/${project.name}/ && npm run test-node`;
  },
  /** Test local */
  local: project => `cd ./packages/${project.name}/ && npm run test-node-local`,
  /** Publish */
  publish: project => {
    if (project.publish) {
      const cmds = [
        // Remove devDependencies in npm package
        `json -I -f ./packages/${project.name}/package.json -e "this.devDependencies={};this.scripts={};this.jest=undefined;"`,
        `cd ./packages/${project.name}/`,
        // `npm version "999.${new Date().getTime()}.0"`,
        `npm publish --registry=${project.registry || 'https://npm.pkg.github.com/'}`
      ];
      return cmds.join(' && ');
    } else {
      return '';
    }
  },
  /** Local Publish (yalc) */
  localPublish: project => {
    if (project.publish) {
      const cmds = [
        `cd ./packages/${project.name}/`,
        `yalc installations clean && yalc publish`
      ];
      return cmds.join(' && ');
    } else {
      return '';
    }
  }
}

async function main() {
  const taskMode = process.argv[2];
  if (taskMode && taskMode in tasks) {
    const startAt = new Date();
    console.log(`[BUILD-FLOW] ${taskMode} starting at ${startAt.toLocaleString()}...`);
    const task = tasks[taskMode];
    const projects = require(path.join(__dirname, 'build-flow.config.json'));
  
    const workers = process.env.BUILD_WORKER_THREADS || 8;

    const concurrentProjects = workers < 2 ? [] : projects.filter(f => !f.links || f.links.length === 0);
    const seqProjects = workers < 2 ? projects : projects.filter(f => f.links?.length);
  
    let packProms = [];
    for (let i = 0; i < concurrentProjects.length; i++) {
      const project = concurrentProjects[i];
    
      console.log(`[BUILD-FLOW] ${taskMode}/${project.name}...`);
      const cmd = task(project);
      if (cmd) {
        packProms.push(exec(cmd, {
          cwd: process.cwd(),
        }).then(res => {
          if (!IS_SILENT) {
            console.log(res.stdout);
            console.error(res.stderr);
          }
        }).catch(error => {
          console.log(error.stdout);
          console.error(error.stderr);
          console.log(`[BUILD-FLOW] ${taskMode}/${project.name} failed.`);
          throw error;
        }));
      }

      if ((i + 1) % workers === 0) {
        await Promise.all(packProms);
        packProms = [];
      }
    }
    if (packProms.length) {
      await Promise.all(packProms);
    }
  
    for (let i = 0; i < seqProjects.length; i++) {
      const project = seqProjects[i];
      console.log(`[BUILD-FLOW] ${taskMode}/${project.name}...`);
      const cmd = task(project);
      if (cmd) {
        child_process.execSync(cmd, {
          cwd: process.cwd(),
          stdio: 'inherit',
        });
      }
    }
    const endAt = new Date();
    console.log(`[BUILD-FLOW] ${taskMode} finished at ${endAt.toLocaleString()} in ${((endAt.getTime() - startAt.getTime()) / 60000).toFixed(2)} minutes.`)
  } else {
    console.log(`[BUILD-FLOW] invalid task ${taskMode} provided.`);
    process.exit(1);
  }  
}

main();
