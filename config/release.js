'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

function generateChangelog(project, version) {
  let content = `future-release=${version}\n`;
  let generatorPath = path.join(project.root, '.github_changelog_generator');

  return new Promise(function(resolve, reject) {
    fs.writeFile(generatorPath, content, (err) => err ? reject(err) : resolve());
  }).then(() => {
    return new Promise(function(resolve, reject) {
      exec('github_changelog_generator', (err) => err ? reject(err) : resolve());
    });
  })
}

function generateWebsite(version) {
  let command = `ember github-pages:commit --message "${version}" && git push origin gh-pages:gh-pages`;

  return new Promise(function(resolve, reject) {
    exec(command, (err) => err ? reject(err) : resolve());
  });
}

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  message: "%@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  // publish: true,
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',

  beforeCommit: function(project, versions) {
    return generateChangelog(project, versions.next);
  },

  afterPush: function(project, versions) {
    return generateWebsite(versions.next);
  }
};
