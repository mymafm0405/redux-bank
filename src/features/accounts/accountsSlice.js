const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanReason: ''
}

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload }
        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload }
        case 'account/getLoan':
            return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanReason: action.payload.reason }
        case 'account/payLoan':
            return { ...state, balance: state.balance - state.loan, loan: 0, loanReason: '' }

        default:
            return state;
    }
}

export function deposit(amount) {
    return { type: 'account/deposit', payload: amount }
}

export function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount }
}
export function getLoan(amount, reason) {
    return { type: 'account/getLoan', payload: { amount, reason } }
}
export function payLoan() {
    return { type: 'account/payLoan' }
}