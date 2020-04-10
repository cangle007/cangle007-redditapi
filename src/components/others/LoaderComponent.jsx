import React from 'react';

export default function LoaderComponent() {
  return (
    <div className='loader-container'>
      <div className='loader-item'>
        <div className='bounceball' />
        <div className='text'>NOW LOADING...</div>
      </div>
    </div>
  );
}
