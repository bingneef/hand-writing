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
          'app.json'
        ]
      },
    },
    staging: {
      branch: 'develop',
      deployTo: '/var/www/hand-writing/api',
      servers: 'bing@5.157.85.46'
    }
  })
}