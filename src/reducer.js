import React from 'react'

export default function reducer(state, action) {
    if(action.type === 'CLEAR_CART'){
        return {...state, cart: []}
    }
    
    if(action.type === 'REMOVE'){
        return {...state, cart: state.cart.filter( (item)=>item.id !== action.payload ) }
    }
    
    if(action.type === 'INCREASE'){
        let tempCart = state.cart.map( (item)=> {
            if(item.id === action.payload){
                return {...item, amount: item.amount + 1}
            }
            return item
        })
        return {...state, cart: tempCart}
    }
    
    if(action.type === 'DECREASE'){
        let tempCart = state.cart.map( (item)=> {
            if(item.id === action.payload){
                return {...item, amount: item.amount - 1}
            }
            return item
        }).filter((cartItem)=> cartItem.amount !== 0)
        return {...state, cart: tempCart}
    }

    if(action.type === 'GET_TOTALS'){
        const {totalItems, totalPrice} = state.cart.reduce((acc, item)=>{
            acc.totalItems += item.amount
            acc.totalPrice += item.price * item.amount
            return acc
        }, 
        { totalItems: 0, totalPrice: 0 })

        return {...state, amount: totalItems, total: parseFloat(totalPrice.toFixed(2))}
    }

    if(action.type === 'LOADING'){
        return {...state, loading: true}
    }

    if(action.type === 'DISPLAY_ITEMS'){
        return {...state, loading: false, cart: action.payload}
    }

    throw new Error('no matching action type')
}
