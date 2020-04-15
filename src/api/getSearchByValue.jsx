export default function getSearchByValue(inputValue) {
  return fetch(`https://www.reddit.com/subreddits/search.json?q=${inputValue}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));
}
