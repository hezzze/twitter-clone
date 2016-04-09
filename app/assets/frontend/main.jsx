//test@test.com
//12345678

import TweetBox from './components/TweetBox';
import TweetsList from './components/TweetsList';
import TweetStore from './stores/TweetStore';

import TweetActions from "./actions/TweetActions";
TweetActions.getAllTweets();

// let mockTweets = [
//   { id: 1, name: 'Samer Buna', body: 'My Tweet'},
//   { id: 2, name: 'Samer Buna', body: 'My 1st Tweet'},
//   { id: 3, name: 'Samer Buna', body: 'My 2nd Tweet'}
// ];

let getAppState = () => {
  return { tweetsList: TweetStore.getAll() };

}

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = getAppState();
    this._onChange = this._onChange.bind(this);
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
    // $.ajax("/tweets")
    // .success(data => {
    //   console.log(data);
    //   this.setState(this.formattedTweets(data));
    // })
    // .error(err => console.log(err));

    TweetStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TweetStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log(5, "Main._onChange");
    this.setState(getAppState());
  }

  render() {
    return (
      <div className="container">
        <TweetBox />
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
