import React from 'react';
import { COMMUNITIES } from '../../util/constants.jsx';

export default function CategoriesComponent({ handle_toggleSidebar }) {
  return (
    <div id='categories-container'>
      <div id='toggle-sidebar' className='sidebar-item close-sidebar'>
        <span href='#' className='closebtn' onClick={handle_toggleSidebar}>
          &times;
        </span>
        <table>
          <caption>Categories</caption>
          <tbody>
            <tr>
              <th></th>
              <th></th>
            </tr>
            {COMMUNITIES.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>{obj.val1}</td>
                  <td>{obj.val2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='topCom-item'>
        <div>
          <span onClick={handle_toggleSidebar}>&#9776;</span>
          <h4>Up-and-coming Communities</h4>
        </div>
        <ol>
          <li>
            <span>r/megaman</span>
          </li>
          <li>
            <span>r/love</span>
          </li>
          <li>
            <span>r/pokemon</span>
          </li>
          <li>
            <span>r/yugioh</span>
          </li>
          <li>
            <span>r/sailormon</span>
          </li>
          <li>
            <span>r/megaman</span>
          </li>
        </ol>
      </div>
      <button>
        <a href='https://www.reddit.com/subreddits/leaderboard/up-and-coming' target='_blank' rel='noopener noreferrer'>
          VIEW ALL
        </a>
      </button>
    </div>
  );
}
