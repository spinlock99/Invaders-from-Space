import Immutable from "immutable";

const init = Immutable.fromJS({ score: 0 });

export default function(state=init, action) {
  switch(action.type) {
    case "ENEMY_DESTROYED":
      return state.set('score', state.get('score') + 10);
    default:
      return state;
  }
}
