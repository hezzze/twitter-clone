import AppDispatcher from "../dispatcher";
import ActionTypes from "../constants"

export default {
  receivedTweets(rawTweets) {

    console.log(3, "ServerActions.receivedTweets");
    // AppDispatcher...
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_TWEETS,
      rawTweets
    });

  },
  receivedOneTweet(rawTweet) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_ONE_TWEET,
      rawTweet
    })
  },
  receivedUsers(rawUsers) {

    // AppDispatcher...
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_USERS,
      rawUsers
    });

  },
  receivedOneFollower(rawFollower) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_ONE_FOLLOWER,
      rawFollower
    })
  },
}
