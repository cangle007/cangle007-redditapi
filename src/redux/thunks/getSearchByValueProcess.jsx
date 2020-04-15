import getSearchByValue from '../../api/getSearchByValue';

export default function getSearchByValueProcess(inputValue) {
  return (dispatch, getState) => {
    return getSearchByValue(inputValue)
      .then(res => {
        let scopes = [];
        let obj = {};
        let counter = 0;

        let subReddits = res.data.children;

        for (let i = 0; i < subReddits.length; i++) {
          if (counter !== 3) {
            obj['val' + counter] = subReddits[i].data.display_name;
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
      })
      .catch(error => error);
  };
}
