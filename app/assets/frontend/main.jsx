//test@test.com
//12345678

import TweetBox from './components/TweetBox';
import TweetsList from './components/TweetsList';

let mockTweets = [
  { id: 1, name: 'Samer Buna', body: 'My Tweet'},
  { id: 2, name: 'Samer Buna', body: 'My 1st Tweet'},
  { id: 3, name: 'Samer Buna', body: 'My 2nd Tweet'}
];

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tweetsList: mockTweets };
  }

  formattedTweets(tweetsList) {

    let formattedList = tweetsList.map(tweet => {
      tweet.formattedDate = moment(tweet.created_at).fromNow();
      return tweet;
    });
    return {
      tweetsList: tweetsList
    };
  }

  addTweet(tweetToAdd) {
    // mockTweets.unshift({...})


    $.post("/tweets", { body: tweetToAdd })
    .success( savedTweet => {
      let newTweetsList = this.state.tweetsList;
      newTweetsList.unshift(savedTweet);
      this.setState(this.formattedTweets(newTweetsList));
    })
    .error(err => console.log(err));

  }

  componentDidMount() {
    $.ajax("/tweets")
    .success(data => {
      console.log(data);
      this.setState(this.formattedTweets(data));
    })
    .error(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <TweetBox sendTweet={this.addTweet.bind(this)} />
        <TweetsList tweets={this.state.tweetsList} />
      </div>
    );
  }
}

let documentReady = () => {

  let reactNode = document.getElementById('react');

  if (reactNode) {
    ReactDOM.render(
      <Main />,
      document.getElementById('react')
    );
  }
};

$(documentReady);
