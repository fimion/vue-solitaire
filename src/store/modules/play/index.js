import createPlayStack from './_createPlayStack.js'


function makePlayingField(){
  let play = []
  play.length = 7
  play.fill(false)
  return play
}

let modules = {}
makePlayingField().forEach((e,i)=>{
  modules[i]=createPlayStack()
})

export default {
  namespaced:true,
  modules,
  state:{
    stacks:makePlayingField(),
    ready:false,
  },
  getters:{},
  mutations:{
    SET_STACK_POS(state,{pos, val}){
      state.stacks[pos] = val
    },
    SET_READY(state, payload){
      state.ready = payload
    },
  },
  actions:{
    async initPlayArea({dispatch, commit, state, rootGetters}){
      while(!state.ready){
        for(let x=0, len = state.stacks.length;x<len;x++){
          let stackLength = state[x].cards.length
          if(stackLength < x+1) {
            await new Promise((res, rej) => {
              setTimeout(res, 100)
            })
            let newCard = rootGetters['deck/topCard']
            dispatch('deck/popCard',null,{root:true})
            if(stackLength === x){
              newCard.faceUp = true
              commit('SET_STACK_POS',{pos:x,val:true})
            }
            dispatch(x+'/concatCards',[newCard])
          }
        }
        let ready = state.stacks.findIndex((e)=>!e)
        if(ready === -1){
          commit('SET_READY', true)
        }
      }
    },
  },
}