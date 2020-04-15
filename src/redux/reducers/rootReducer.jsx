export default function rootReducer(
  currentState = {
    subreddits: {},
    subredditList: [],
    subreddits_flag: false,
    searchByValue_flag: false
  },
  action
) {
  switch (action.type) {
    case 'GET_SUBREDDITS':
      return { ...currentState, subreddits: action.subreddits };

    case 'GET_SUBREDDITLIST':
      return { ...currentState, subredditList: action.subredditList };

    case 'FLAG_SUBREDDITS':
      return { ...currentState, subreddits_flag: action.subreddits_flag };

    default:
      return currentState;
  }
}
