import React from 'react';
import reddit_banner02 from '../../images/reddit_banner02.jpg';

export default function BannerComponent() {
  return (
    <div id='banner-container'>
      <img src={reddit_banner02} alt='reddit_banner02' />
    </div>
  );
}
