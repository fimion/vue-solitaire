
function makePlayingField(){
  let play = []
  play.length = 7
  play.fill([])
  return play
}

export default {
  namespaced:true,
  state:{
    stacks:makePlayingField(),
  },
  getters:{},
  mutations:{},
  actions:{},
}