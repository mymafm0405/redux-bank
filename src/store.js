import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customersSlice";

const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer })

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store;




