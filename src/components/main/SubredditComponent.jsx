import React from 'react';
import { Icon } from 'semantic-ui-react';
import { COUNTRIES, LIST_OF_DATE, USA_STATES } from '../../util/constants.jsx';
import defaultIMG from '../../images/default_img.png';

export default function SubredditComponent({
  subreddits,
  subredditList,
  handle_countryBtn,
  handle_listing,
  handle_subReddit,
  handle_subredditSubmit,
  handle_subredditListingFilter,
  handle_subredditFilter,
  handle_stateBtn,
  handle_toggleFilter,
  handle_toggleIMG
}) {
  return (
    <div id='subreddit-container'>
      <div className='listing-item'>
        <ul>
          <li onClick={handle_listing} data-list='hot' data-listheader='hot'>
            <Icon name='gripfire' color='red' />
            <span>Hot</span>
          </li>
          <li onClick={handle_listing} data-list='new' data-listheader='new' color='yellow'>
            <Icon name='star outline' color='yellow' />
            <span>New</span>
          </li>
          <li onClick={handle_listing} data-list='top' data-listheader='top'>
            <Icon name='trophy' color='grey' />
            <span>Top</span>
          </li>
          <li onClick={handle_listing} data-list='rising' data-listheader='rising'>
            <Icon name='line graph' color='green' />
            <span>Rising</span>
          </li>
          <li onClick={handle_subReddit} data-list='hot' data-listheader='subreddit'>
            <Icon name='list' color='orange' />
            <span>Subreddit</span>
          </li>
        </ul>
      </div>

      <div className='filter-item'>
        <div id='filter-btn' className='filter-enable' onClick={handle_toggleFilter}>
          <Icon name='sliders horizontal' />
          FILTER
        </div>

        <section id='hot-container'>
          <div id='country-item' className='hot-dropDown'>
            <h4 onClick={handle_countryBtn}>COUNTRY</h4>
            <div className='country-collapse' id='toggle-country'>
              {COUNTRIES.map((country, i) => {
                return (
                  <li key={i} data-country={country} onClick={handle_subredditListingFilter}>
                    {country}
                  </li>
                );
              })}
            </div>
          </div>
          <div id='state-item' className='hot-dropDown'>
            <h4 onClick={handle_stateBtn}>STATES</h4>
            <div className='state-collapse' id='toggle-state'>
              {USA_STATES.map((state, i) => {
                return (
                  <li key={i} data-state={state} onClick={handle_subredditListingFilter}>
                    {state}
                  </li>
                );
              })}
            </div>
          </div>
        </section>

        <section id='top-container'>
          <h4>UPLOAD DATE</h4>
          <ul>
            {LIST_OF_DATE.map((date, i) => {
              return (
                <li key={i} data-date={date.endpoint} onClick={handle_subredditListingFilter}>
                  {date.text}
                </li>
              );
            })}
          </ul>
        </section>

        <section id='subredditList-container'>
          <div className='subredditTable-item'>
            <h4>SUBREDDIT'S LIST</h4>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                {subredditList.map((obj, i) => {
                  return (
                    <tr key={i}>
                      <td
                        id={'reddit-' + `${i}` + '0'}
                        data-redditid={'reddit-' + `${i}` + '0'}
                        onClick={handle_subredditFilter}
                        data-subreddit={obj.val0}
                      >
                        {obj.val0}
                      </td>
                      <td
                        id={'reddit-' + `${i}` + '1'}
                        data-redditid={'reddit-' + `${i}` + '1'}
                        onClick={handle_subredditFilter}
                        data-subreddit={obj.val1}
                      >
                        {obj.val1}
                      </td>
                      <td
                        id={'reddit-' + `${i}` + '2'}
                        data-redditid={'reddit-' + `${i}` + '2'}
                        onClick={handle_subredditFilter}
                        data-subreddit={obj.val2}
                      >
                        {obj.val2}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='subredditList-item'>
            <h4>LISTING</h4>
            <ul>
              <li id={'list-0'} data-listid={'list-0'} onClick={handle_subredditFilter} data-list={'hot'}>
                Hot
              </li>
              <li id={'list-1'} data-listid={'list-1'} onClick={handle_subredditFilter} data-list={'new'}>
                New
              </li>
              <li id={'list-2'} data-listid={'list-2'} onClick={handle_subredditFilter} data-list={'top'}>
                Top
              </li>
              <li id={'list-3'} data-listid={'list-3'} onClick={handle_subredditFilter} data-list={'rising'}>
                Rising
              </li>
            </ul>
            <button onClick={handle_subredditSubmit}>SUBMIT</button>
          </div>
        </section>
      </div>

      <div className='displayReddit-item'>
        {subreddits.map((obj, i) => {
          return (
            <div className='redditContent-container' key={i}>
              <section className='leftContent-item'>
                <div className='ups'>
                  <Icon name='arrow up' />
                  <div>{obj.ups}</div>
                  <Icon name='arrow down' />
                </div>
                <div className='img-preview'>
                  <img
                    src={obj.thumbnail.hasOwnProperty('other') ? defaultIMG : obj.thumbnail.imgURL}
                    alt={obj.thumbnail.imgURL}
                  />
                </div>
              </section>

              <section className='rightContent-item'>
                <div className='reddit-header'>
                  <a href={obj.permalink} className='permalink' target='_blank' rel='noopener noreferrer'>
                    {obj.title}
                  </a>
                </div>

                <div className='reddit-author'>
                  <span className='subreddit_name_prefixed'>
                    <a
                      style={{ display: 'table-cell' }}
                      href={obj.subreddit_name_prefixed.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {obj.subreddit_name_prefixed.name}
                      <Icon name='add square' />
                    </a>
                  </span>
                  <span className='author'>
                    <a href={obj.author.url} target='_blank' rel='noopener noreferrer'>
                      {obj.author.name}
                    </a>
                  </span>

                  <span className='all_awardings'>
                    {obj.all_awardings.map((url, i) => {
                      return <img key={i} src={url} alt={url} />;
                    })}
                  </span>
                </div>

                <div className='timestamp'>
                  <span className='timestamp'>{obj.timestamp}</span>
                </div>

                <div className='reddit-socialMedia'>
                  <span>
                    {obj.url.hasOwnProperty('imgURL') ? (
                      <Icon
                        name='expand arrows alternate'
                        data-imageid={obj.thumbnail + i}
                        onClick={event => {
                          handle_toggleIMG(event);
                        }}
                      />
                    ) : (
                      <a
                        style={{ display: 'table-cell' }}
                        href={obj.url.other}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Icon name='external alternate' />
                      </a>
                    )}
                  </span>
                  <span className='num_comments'>
                    <a href={obj.permalink} target='_blank' rel='noopener noreferrer'>
                      <Icon name='comment' />
                      {obj.num_comments + ' comments'}
                    </a>
                  </span>
                  <span>
                    <Icon name='share' />
                    Share
                  </span>
                  <span>
                    <Icon name='plus square' />
                    Save
                  </span>
                  <span>
                    <Icon name='x' />
                    Hide
                  </span>
                  <span>
                    <Icon name='flag' />
                    Report
                  </span>
                </div>
              </section>

              <section className='img-expand-item img-collapse' id={obj.thumbnail + i}>
                {obj.url.hasOwnProperty('imgURL') ? <img src={obj.url.imgURL} alt={obj.url.imgURL} /> : ''}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}
