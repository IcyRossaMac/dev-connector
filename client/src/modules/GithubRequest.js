import axios from 'axios';

function GithubRequest(username) {

  return new Promise(((resolve, reject) => {
    let url = '/api/github/repos';

    axios.get(url, {
      params: {
        username: username
      }
    })
      .then((res) => {
        resolve(res.data)
      }).catch((error) => {
      reject(error)
    })
  }))

}

export default GithubRequest