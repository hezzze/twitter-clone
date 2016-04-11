import AppDispatcher from "../dispatcher"
import ActionTypes from "../constants"
import AppEventEmitter from "./AppEventEmitter"

let _tweets = [];
const CHANGE_EVENT = "CHANGE";


class TweetEventEmitter extends AppEventEmitter {

  getAll() {
    return _tweets.map(tweet => {
      tweet.formattedDate = moment(tweet.created_at).fromNow();
      return tweet;
    });
  }
}

let TweetStore = new TweetEventEmitter();

AppDispatcher.register( action => {
  //action.ActionType === RECEIVED_TWEETS

  switch (action.actionType) {

    case ActionTypes.RECEIVED_TWEETS:
      console.log(4, "TweetStore");
      //acknowledge tweets
      _tweets = action.rawTweets;
      //emit a change event
      TweetStore.emitChange();

      break;

    case ActionTypes.RECEIVED_ONE_TWEET:
      _tweets.unshift(action.rawTweet);
      TweetStore.emitChange();
      break;
    default:

  }
});

export default TweetStore;
