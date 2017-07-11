module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      dirToCopy: 'app/build',
      repositoryUrl: 'git@github.com:bingneef/hand-writing.git',
      keepReleases: 10,
      deleteOnRollback: false,
      shallowClone: false
    },
    staging: {
      branch: 'develop',
      deployTo: '/var/www/hand-writing/app',
      servers: 'bing@5.157.85.46'
    },
  });

  shipit.blTask('build', () => {
    let cmd = `cd ${shipit.config.workspace}/app && yarn install && yarn run build:${shipit.environment}`
    return shipit.local(cmd);
  });

  shipit.on('fetched', () => {
    return shipit.start('build');
  });
};
