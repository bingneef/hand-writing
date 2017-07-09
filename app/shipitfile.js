module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      dirToCopy: 'build',
      repositoryUrl: 'git@github.com:bingneef/AristotoApp.git',
      keepReleases: 10,
      deleteOnRollback: false,
      shallowClone: false
    },
    staging: {
      branch: 'develop',
      deployTo: '/var/www/aristoto-staging',
      servers: 'bing@5.157.85.46'
    },
    production: {
      branch: 'master',
      deployTo: '/var/www/aristoto',
      servers: 'bing@5.157.85.46'
    }
  });

  shipit.blTask('build', () => {
    let cmd = `cd ${shipit.config.workspace} && yarn install && yarn run build:${shipit.environment}`
    return shipit.local(cmd);
  });

  shipit.on('fetched', () => {
    return shipit.start('build');
  });
};
