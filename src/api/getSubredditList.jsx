export default function getSubredditList() {
  return fetch(`https://www.reddit.com/r/popular.json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));
}
