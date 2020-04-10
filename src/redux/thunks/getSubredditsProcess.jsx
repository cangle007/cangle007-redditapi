import getSubreddits from '../../api/getSubreddits';

export default function getSubredditsProcess({ listing, subreddit, date, country, state }) {
  return (dispatch, getState) => {
    return getSubreddits({ listing, subreddit, date, country, state })
      .then(res => {
        let scopes = [];
        console.log('res', res);
        res.data.children.forEach((obj, i) => {
          let parse = {};
          let prop = obj.data;

          parse.title = prop.title;
          parse.subreddit_name_prefixed = prop.subreddit_name_prefixed;
          parse.permalink = `https://www.reddit.com/${prop.permalink}`; //comment's link
          parse.ups = prop.ups >= 1000 ? (prop.ups / 1000).toFixed(1) + 'k' : prop.ups;
          parse.num_comments =
            prop.num_comments >= 1000 ? (prop.num_comments / 1000).toFixed(1) + 'k' : prop.num_comments;
          parse.all_awardings = prop.all_awardings.map(obj => {
            return obj['icon_url'] ? obj.icon_url : '';
          });

          //Prase timestamp
          let longTimestamp = new Date(prop.created_utc * 1000) + ' PST'; //Convert sec to millisecond. " PST" covert to US PST zone.
          parse.timestamp = longTimestamp.slice(0, longTimestamp.indexOf(' GMT'));

          //Parse subreddit_name_prefixed
          let prefixedObj = {
            name: prop.subreddit_name_prefixed,
            url: `https://www.reddit.com/${prop.subreddit_name_prefixed}`
          };
          parse.subreddit_name_prefixed = prefixedObj;

          //Parse author
          let authorObj = {
            name: prop.author,
            url: `https://www.reddit.com/user/${prop.author}`
          };
          parse.author = authorObj;

          //Parse url
          let image_type = { '.jpg': '.jpg', '.gif': '.gif', '.png': '.png' }; //media type assumption
          let current_content = prop.url.slice(-4);

          if (image_type[current_content]) {
            parse.url = { imgURL: prop.url };
          } else {
            parse.url = { other: prop.url };
          }

          //Parse thumbnail
          let rejectedStr = { self: 'self', default: 'default', nsfw: 'nsfw', spoiler: 'spoiler' };

          if (rejectedStr[prop.thumbnail]) {
            parse.thumbnail = { other: prop.thumbnail }; //use default img
          } else {
            parse.thumbnail = { imgURL: prop.thumbnail };
          }

          scopes.push(parse);
        });

        dispatch({ type: 'GET_SUBREDDITS', subreddits: scopes });
        dispatch({ type: 'FLAG_SUBREDDITS', subreddits_flag: true });
      })
      .catch(error => error);
  };
}
