import React from 'react';
import MainComponent from './MainComponent';

export default function MainPage({
  get_subReddits,
  subreddits,
  subreddits_flag,
  subredditList
}) {
  return (
    <div>
      <MainComponent
        get_subReddits={get_subReddits}
        subreddits={subreddits}
        subreddits_flag={subreddits_flag}
        subredditList={subredditList}
      />
    </div>
  );
}
