/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = (shipit) => {
  require('./node_modules/shipit-deploy')(shipit)
  require('./node_modules/shipit-pm2')(shipit)
  require('./node_modules/shipit-shared')(shipit)
  require('./node_modules/shipit-npm')(shipit)

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      dirToCopy: 'api',
      repositoryUrl: 'git@github.com:bingneef/hand-writing.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 10,
      shallowClone: true,
      npm: {
        remote: true,
        installFlags: ['--only=production']
      },
      shared: {
        overwrite: false,
        files: [
          'app.json',
          'scripts/data/letters.csv',
          'scripts/data/letters.pkl',
          'scripts/data/numbers.csv',
          'scripts/data/numbers.pkl',
          'scripts/data/shapes.csv',
          'scripts/data/shapes.pkl',
        ],
      },
    },
    staging: {
      branch: 'develop',
      deployTo: '/var/www/hand-writing/api',
      servers: 'bing@5.157.85.46'
    }
  })
}
