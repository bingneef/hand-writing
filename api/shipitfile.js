/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = (shipit) => {
  require('./node_modules/shipit-deploy')(shipit)
  require('./node_modules/shipit-pm2')(shipit)
  require('./node_modules/shipit-shared')(shipit)

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      dirToCopy: 'api',
      repositoryUrl: 'git@github.com:bingneef/hand-writing.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 10,
      shallowClone: true,
      dirToCopy: '',
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

  shipit.blTask('build', () => {
    let cmd = `cd ${shipit.config.workspace}/api && yarn install --production`
    return shipit.local(cmd);
  });

  shipit.on('fetched', () => {
    return shipit.start('build');
  });
}
