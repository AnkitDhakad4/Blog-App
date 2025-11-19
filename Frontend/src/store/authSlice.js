import { createSlice } from "@reduxjs/toolkit";


const  initialState={
    status:false,
    userData:null
}
const authSlice=createSlice(//ye internally kafi change kar dega ye ek object ban jayega key value pair ka
{
    name:'auth',
    initialState,
    reducers:{
        //ye niche ke functions ko action bolte hai 
        login:(state,action)=>{//ye declared methos toh key=action ke andar chali jayegi toh .action se access karke export kiya niche 
            state.status=true,
            // console.log("in login the userData is ",action.payload)
            state.userData=action.payload//ye action .payload hi hoga jo prompt pass akr rahe hai voh nahi
            // console.log("Data stor me chad gya hai ",state.userData)
        },
        logout:(state)=>{//action ka access ynha bhi hai hamne use nahi kiya hai 
            state.status=false;
            state.userData=null;
        }
    }

})

export const {login,logout} = authSlice.actions


export default authSlice.reducer;

//configureStore expects each value in reducer: { ... } to be a pure reducer function — not the whole slice object. that why we exporting .reducer  
// key=reducer me internal function jate hai unki hi need hoti hai store ko

// +++++++++ye kuch aisa ho jayega

// {
//   name: "auth",

//   // 👇 this is the reducer you export to the store
//   reducer: function(state = initialState, action) {
//     const caseReducer = caseReducers[action.type];
//     if (caseReducer) {
//       // run the function you defined (e.g., login, logout)
//       return caseReducer(state, action) || state;
//     }
//     return state;
//   },

//   // 👇 auto-generated action creators
//   actions: {
//     login: (payload) => ({ type: "auth/login", payload }),
//     logout: () => ({ type: "auth/logout" })
//   },

//   // 👇 INTERNAL STUFF
//   caseReducers: {
//     login: (state, action) => { state.status = true; state.userData = action.payload.userData },
//     logout: (state) => { state.status = false; state.userData = null }
//   },

//   // 👇 internal map from action.type -> caseReducer
//   _caseReducersByName: {
//     "auth/login": [Function login],
//     "auth/logout": [Function logout]
//   }
// }
