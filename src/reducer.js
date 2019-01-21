import Immutable from "immutable";

const init = Immutable.fromJS({
  score: 0,
  gameOver: false,
  gameStart: true,
  showIntro: false
});

export default function (state = init, action) {
  switch (action.type) {
    case "SHOW_INTRO":
      return state.set("showIntro", true);
    case "ENEMY_DESTROYED":
      return state.set("score", state.get("score") + 10);
    case "GAME_OVER":
      return state.set("gameOver", true);
    case "GAME_START":
      return state.set("gameStart", false);
    case "RESTART":
      return state.merge({ "score": 0, "gameOver": false });
    default:
      return state;
  }
}
