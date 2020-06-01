
const initialState = {
    userId:null,
    token:null,
    isAuth:false,
}

export default (state = initialState , action )=>{
    switch(action.type){
        case "AUTH":
            return{
                ...state,
                isAuth:true,
                token :action.token,
                userId:action.userId,
            }
        default:
                return state
    }
}