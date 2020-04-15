import React from 'react';
import MainComponent from './MainComponent';

export default function MainPage({
  get_subReddits,
  get_searchByValue,
  inputSubreddits,
  subreddits,
  subreddits_flag,
  subredditList
}) {
  return (
    <div>
      <MainComponent
        get_subReddits={get_subReddits}
        get_searchByValue={get_searchByValue}
        inputSubreddits={inputSubreddits}
        subreddits={subreddits}
        subreddits_flag={subreddits_flag}
        subredditList={subredditList}
      />
    </div>
  );
}
