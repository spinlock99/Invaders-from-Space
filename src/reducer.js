const init = { score: 0 };

export default function(state=init, action) {
  switch(action.type) {
    case "ENEMY_DESTROYED":
      return { ...state, score: state.score + 10 }
    default:
      return state;
  }
}
