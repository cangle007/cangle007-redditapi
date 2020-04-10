import getSubredditList from '../../api/getSubredditList';

export default function getSubredditListProcess() {
  return (dispatch, getState) => {
    return getSubredditList()
      .then(res => {
        let scopes = [];
        let obj = {};
        let counter = 0;
        let subReddits = res.data.children;

        for (let i = 0; i < subReddits.length; i++) {
          if (counter !== 3) {
            obj['val' + counter] = subReddits[i].data.subreddit;
            counter += 1;
            if (i === subReddits.length - 1) {
              scopes.push(obj); //handle the last object
            }
          } else {
            scopes.push(obj);
            obj = {};
            counter = 0;
            i -= 1;
          }
        }

        dispatch({ type: 'GET_SUBREDDITLIST', subredditList: scopes });
        // dispatch({ type: 'FLAG_SUBREDDITS', subreddits_flag: true });
      })
      .catch(error => error);
  };
}
