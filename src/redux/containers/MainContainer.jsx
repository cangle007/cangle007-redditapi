import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MainPage from '../../components/main/MainPage';

import getSubredditsProcess from '../thunks/getSubredditsProcess';
import getSubredditListProcess from '../thunks/getSubredditListProcess';

function mapStateToProps(state, ownProps) {
  return {
    subreddits: state.subreddits,
    subredditList: state.subredditList,
    subreddits_flag: state.subreddits_flag
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    get_subReddits: filterObj => dispatch(getSubredditsProcess(filterObj)),
    get_subRedditList: () => dispatch(getSubredditListProcess())
  };
}

const withlifecycle = lifecycle({
  /*LifeCycle: Birth/Mounting*/
  componentDidMount() {
    this.props.get_subRedditList();

    //reparse subreddit on user's refresh
    let subreddit_obj = JSON.parse(localStorage.getItem('subreddit_obj'));

    if (subreddit_obj) {
      this.props.get_subReddits(subreddit_obj);
    } else {
      let filterObj = {
        listing: 'hot',
        subreddit: 'popular',
        date: null,
        country: null,
        state: null
      };
      this.props.get_subReddits(filterObj);
    }
  }

  /*LifeCycle: Growth/Update*/
  /*LifeCycle: Death/Unmount*/
});

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  connectToStore,
  withlifecycle
)(withRouter(MainPage));
