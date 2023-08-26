const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  balance: 0,
  loan: 0,
  loanReason: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    getLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanReason = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    converting(state) {
        state.isLoading = true;
    },
    payLoan(state) {
      if (state.balance < state.loan) return;
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
});

export const { withdraw, getLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === 'USD') return { type: 'account/deposit', payload: amount }

    return async function (dispatch, getState) {
        dispatch({type: 'account/converting'})
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converted = data.rates.USD;

        dispatch({type: 'account/deposit', payload: converted})
    }
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case 'account/deposit':
//             return { ...state, balance: state.balance + action.payload, isLoading: false }
//         case 'account/withdraw':
//             return { ...state, balance: state.balance - action.payload }
//         case 'account/getLoan':
//             return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanReason: action.payload.reason }
//         case 'account/payLoan':
//             return { ...state, balance: state.balance - state.loan, loan: 0, loanReason: '' }
//         case 'account/converting':
//             return {...state, isLoading: true}
//         default:
//             return state;
//     }
// }

// export function deposit(amount, currency) {
//     if (currency === 'USD') return { type: 'account/deposit', payload: amount }

//     return async function (dispatch, getState) {
//         dispatch({type: 'account/converting'})
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//         const data = await res.json()
//         const converted = data.rates.USD;

//         dispatch({type: 'account/deposit', payload: converted})
//     }
// }

// export function withdraw(amount) {
//     return { type: 'account/withdraw', payload: amount }
// }
// export function getLoan(amount, reason) {
//     return { type: 'account/getLoan', payload: { amount, reason } }
// }
// export function payLoan() {
//     return { type: 'account/payLoan' }
// }
