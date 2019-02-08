export default {
  namespaced:true,
  state:{
    cards:[],
  },
  getters:{},
  mutations:{
    resetCards({cards}){
      cards.forEach(e=>{e.faceUp = false})
    },
  },
  actions:{},
}