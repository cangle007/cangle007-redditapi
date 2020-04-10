// https://www.reddit.com/r/subreddit.json
// https://www.reddit.com/subreddits/popular.json
//https://www.reddit.com/r/redditdev/comments/26damo/todays_trending_subreddits/
// https://www.reddit.com/r/subreddit/top.json
//https://www.reddit.com/r/popular/top.json?t=year
//https://www.reddit.com/r/popular/hot.json?g=IN

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

  console.log('subreddit-----------:', modifiedURL);
  return fetch(modifiedURL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));
}

//DONT NOT DELETE REDDIT's secret key
//NoK8Gjm9e_H4ivPWK88a7AC-OVI
