import React, { Component } from 'react';

import SubredditComponent from './SubredditComponent';
import BannerComponent from './BannerComponent';
import LoaderComponent from '../others/LoaderComponent';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle_filterContents: 'expand',
      listheaderSelect: '',
      listSelect: 'hot',
      subredditSelect: 'popular',
      searchInput: '',
      inputErrorMsg: ''
    };
  }

  /*
    user can now search for more subreddits through input
  */
  onChange_searchByInput = event => {
    let val = event.target.value;
    this.setState({ searchInput: val });
  };

  handle_searchByInput = event => {
    let { searchInput } = this.state;
    let { subredditList } = this.props;

    if (event.key === 'Enter') {
      //to unhighligh all td element when enter
      subredditList.forEach((obj, i) => {
        for (let j = 0; j < 3; j++) {
          let id = 'reddit-' + `${i}` + `${j}`;
          let redditid_element = document.getElementById(id);
          redditid_element.style.background = 'white';
          redditid_element.style.color = 'black';
        }
      });

      //handle error and searchByValue
      if (searchInput === '') {
        this.setState({ inputErrorMsg: 'input cannot be empty' });
      } else {
        this.setState({ inputErrorMsg: '' });
        this.props.get_searchByValue(searchInput);
      }
    }
  };

  /*
    toggle the CategoriesComponent's  sidebar. NOT USED IN PRODUCTION
  */
  // handle_toggleSidebar = event => {
  //   event.preventDefault();
  //   let sidebar_element = document.getElementById('toggle-sidebar');
  //   let current_class = document
  //     .getElementById('toggle-sidebar')
  //     .classList.contains('close-sidebar');

  //   if (current_class) {
  //     sidebar_element.classList.replace('close-sidebar', 'open-sidebar');
  //   } else {
  //     sidebar_element.classList.replace('open-sidebar', 'close-sidebar');
  //   }
  // };

  /*
    parse subreddit based on listing
  */
  handle_listing = event => {
    event.preventDefault();
    let { listheader, list } = event.currentTarget.dataset;
    let filter_element = document.querySelector('.filter-item');
    let hot_element = document.getElementById('hot-container');
    let top_element = document.getElementById('top-container');

    let filter_btn_element = document.querySelector('#filter-btn');
    let subredditList_element = document.getElementById('subredditList-container');

    filter_element.style.height = '30px';
    subredditList_element.style.display = 'none';

    //close filter when listing is selected
    if (listheader === 'top' || listheader === 'hot') {
      filter_btn_element.classList.replace('filter-disable', 'filter-enable');
      hot_element.style.display = 'none';
      top_element.style.display = 'none';

      this.setState({ toggle_filterContents: 'expand' });
    } else {
      filter_btn_element.classList.replace('filter-enable', 'filter-disable');
    }

    //parse subreddit by listing
    let filterObj = {
      listing: list,
      subreddit: null,
      date: null,
      country: null,
      state: null
    };
    localStorage.setItem('subreddit_obj', JSON.stringify(filterObj));
    this.props.get_subReddits(filterObj);
    this.setState({ listSelect: list });
    this.setState({ listheaderSelect: listheader });
  };

  handle_subredditFilter = event => {
    let { list, subreddit, redditid, listid } = event.currentTarget.dataset;
    let { subredditList } = this.props;

    //to handle hightligh/unhightligh
    if (list) {
      for (let j = 0; j < 4; j++) {
        let id = 'list-' + `${j}`;
        let listid_element = document.getElementById(id);
        if (id === listid) {
          listid_element.style.background = 'var(--header-bg-color)';
          listid_element.style.color = 'white';
        } else {
          listid_element.style.background = 'white';
          listid_element.style.color = 'black';
        }
      }

      this.setState({ listSelect: list });
    } else {
      subredditList.forEach((obj, i) => {
        for (let j = 0; j < 3; j++) {
          let id = 'reddit-' + `${i}` + `${j}`;
          let redditid_element = document.getElementById(id);
          if (id === redditid) {
            redditid_element.style.background = 'var(--header-bg-color)';
            redditid_element.style.color = 'white';
          } else {
            redditid_element.style.background = 'white';
            redditid_element.style.color = 'black';
          }
        }
      });
      this.setState({ subredditSelect: subreddit });
    }
  };

  /*
    parse subreddit based on sbureddit
  */
  handle_subReddit = event => {
    event.preventDefault();
    let { listheader } = event.currentTarget.dataset;
    let current_class = document
      .getElementById('filter-btn')
      .classList.contains('filter-enable');
    let filter_element = document.querySelector('.filter-item');
    let hot_element = document.getElementById('hot-container');
    let top_element = document.getElementById('top-container');
    let subredditList_element = document.getElementById('subredditList-container');
    let filter_btn_element = document.getElementById('filter-btn');

    if (current_class) {
      filter_element.style.height = '30px';
      hot_element.style.display = 'none';
      top_element.style.display = 'none';
      subredditList_element.style.display = 'none';
    } else {
      filter_btn_element.classList.replace('filter-disable', 'filter-enable');
    }

    this.setState({ toggle_filterContents: 'expand' });
    this.setState({ listheaderSelect: listheader });
    this.setState({ listSelect: 'hot' });
    this.setState({ subredditSelect: 'popular' });

    //parse subreddit by listing
    let filterObj = {
      listing: 'hot',
      subreddit: 'popular',
      date: null,
      country: null,
      state: null
    };

    localStorage.setItem('subreddit_obj', JSON.stringify(filterObj));
    this.props.get_subReddits(filterObj);
  };

  handle_subredditSubmit = event => {
    event.preventDefault();
    let { listSelect, subredditSelect } = this.state;

    let filterObj = {
      listing: listSelect,
      subreddit: subredditSelect,
      date: null,
      country: null,
      state: null
    };

    localStorage.setItem('subreddit_obj', JSON.stringify(filterObj));
    this.props.get_subReddits(filterObj);
  };

  /*
    slide open filter on hot or top
  */
  handle_toggleFilter = event => {
    event.preventDefault();
    let { toggle_filterContents, listheaderSelect } = this.state;
    let filter_element = document.querySelector('.filter-item');

    switch (listheaderSelect) {
      case 'hot':
        let hot_element = document.getElementById('hot-container');

        if (toggle_filterContents === 'expand') {
          hot_element.style.display = 'grid';
          filter_element.style.height = '300px';

          this.setState({ toggle_filterContents: 'collapse' });
        } else {
          hot_element.style.display = 'none';
          filter_element.style.height = '30px';

          this.setState({ toggle_filterContents: 'expand' });
        }
        break;

      case 'top':
        let top_element = document.getElementById('top-container');

        if (toggle_filterContents === 'expand') {
          top_element.style.display = 'block';
          filter_element.style.height = '300px';

          this.setState({ toggle_filterContents: 'collapse' });
        } else {
          top_element.style.display = 'none';
          filter_element.style.height = '30px';

          this.setState({ toggle_filterContents: 'expand' });
        }
        break;

      case 'subreddit':
        let subredditList_element = document.getElementById('subredditList-container');

        if (toggle_filterContents === 'expand') {
          subredditList_element.style.display = 'grid';
          filter_element.style.height = '300px';

          this.setState({ toggle_filterContents: 'collapse' });
        } else {
          subredditList_element.style.display = 'none';
          filter_element.style.height = '30px';

          this.setState({ toggle_filterContents: 'expand' });
        }
        break;

      default:
        return false;
    }
  };

  /*
    collapse or expand image's content
  */
  handle_toggleIMG = event => {
    event.preventDefault();
    let { imageid } = event.currentTarget.dataset;
    let current_class = document
      .getElementById(imageid)
      .classList.contains('img-collapse');
    let image_element = document.getElementById(imageid);

    if (current_class) {
      image_element.classList.replace('img-collapse', 'img-expand');
      image_element.style.display = 'block';
    } else {
      image_element.classList.replace('img-expand', 'img-collapse');
      image_element.style.display = 'none';
    }
  };

  /*
    toggle Country btn
  */
  handle_countryBtn = event => {
    event.preventDefault();
    let country_element = document.getElementById('toggle-country');
    let current_class = document
      .getElementById('toggle-country')
      .classList.contains('country-collapse');

    if (current_class) {
      country_element.classList.replace('country-collapse', 'country-expand');
    } else {
      country_element.classList.replace('country-expand', 'country-collapse');
    }
  };

  /*
    toggle State btn
  */
  handle_stateBtn = event => {
    event.preventDefault();
    let state_element = document.getElementById('toggle-state');
    let current_class = document
      .getElementById('toggle-state')
      .classList.contains('state-collapse');

    if (current_class) {
      state_element.classList.replace('state-collapse', 'state-expand');
    } else {
      state_element.classList.replace('state-expand', 'state-collapse');
    }
  };

  /*
    to filter subreddit by date, country, and state. NOTE, country and state's API are official broken and has not been fixed by Reddit
  */
  handle_subredditListingFilter = event => {
    event.preventDefault();
    let { state, country, date } = event.currentTarget.dataset;
    let { listSelect } = this.state;

    if (state) {
      let filterObj = {
        listing: listSelect,
        subreddit: null,
        date: null,
        country: null,
        state: state
      };

      localStorage.setItem('subreddit_obj', JSON.stringify(filterObj));
      this.props.get_subReddits(filterObj);
    } else if (country) {
      let filterObj = {
        listing: listSelect,
        subreddit: null,
        date: null,
        country: country,
        state: null
      };

      localStorage.setItem('subreddit_obj', JSON.stringify(filterObj));
      this.props.get_subReddits(filterObj);
    } else {
      let filterObj = {
        listing: listSelect,
        subreddit: null,
        date: date,
        country: null,
        state: null
      };

      localStorage.setItem('subreddit_obj', JSON.stringify(filterObj));
      this.props.get_subReddits(filterObj);
    }
  };

  render() {
    let { subreddits, subredditList, subreddits_flag } = this.props;
    let { inputErrorMsg } = this.state;
    return (
      <div>
        {!subreddits_flag ? (
          <LoaderComponent />
        ) : (
          <div id='main-container'>
            <div className='bannerComp-item'>
              <BannerComponent />
            </div>
            <div className='browseComp-item'>
              <SubredditComponent
                inputErrorMsg={inputErrorMsg}
                onChange_searchByInput={this.onChange_searchByInput}
                handle_searchByInput={this.handle_searchByInput}
                subreddits={subreddits}
                subredditList={subredditList}
                handle_countryBtn={this.handle_countryBtn}
                handle_listing={this.handle_listing}
                handle_subReddit={this.handle_subReddit}
                handle_subredditSubmit={this.handle_subredditSubmit}
                handle_stateBtn={this.handle_stateBtn}
                handle_subredditFilter={this.handle_subredditFilter}
                handle_subredditListingFilter={this.handle_subredditListingFilter}
                handle_toggleFilter={this.handle_toggleFilter}
                handle_toggleIMG={this.handle_toggleIMG}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
