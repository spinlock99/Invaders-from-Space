import Immutable from "immutable";

const init = Immutable.fromJS({ score: 0, gameOver: false });

export default function(state=init, action) {
  switch(action.type) {
    case "ENEMY_DESTROYED":
      return state.set('score', state.get('score') + 10);
    case "GAME_OVER":
      return state.set("gameOver", true);
    case "RESTART":
      return state.merge({ "score": 0, "gameOver": false });
    default:
      return state;
  }
}
