export default function getSubreddits({ listing, subreddit, date, country, state }) {
  let modifiedURL = '';

  if (!subreddit) {
    subreddit = 'popular';
  }
  if (listing === 'top' && date) {
    modifiedURL = `https://www.reddit.com/r/${subreddit}/${listing}.json?t=${date}`;
  } else if (listing === 'hot' && country) {
    modifiedURL = `https://www.reddit.com/r/${subreddit}/${listing}.json?g=${country}`;
  } else if (listing === 'hot' && state) {
    modifiedURL = `https://www.reddit.com/r/${subreddit}/${listing}.json?g=${state}`;
  } else {
    modifiedURL = `https://www.reddit.com/r/${subreddit}/${listing}.json`;
  }

  return fetch(modifiedURL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));
}
