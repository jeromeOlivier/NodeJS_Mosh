console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

getUser(1)
  .then(user => getRepositories(user.gitHubUsername)
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits)))
  .catch(err => console.log(err.message));
console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 1000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve([ 'repo1', 'repo2', 'repo3' ]);
    }, 1000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve([ 'commit' ]);
    }, 1000);
  });
}
