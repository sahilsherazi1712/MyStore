import types from "../types"

let init_state = {
    cartItems: [],
}

export const cartReducer = (state = init_state, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            const existingCartItems = state.cartItems.find((item) => item.id === action.payload.id)
            if (existingCartItems) {
                // If the item already exists in the cart, increase its quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                }
            } else {
                // If the item is not in the cart, add it with a quantity of 1
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                };
            }
        case types.INCREASE_CART_ITEM_QUANTITY:
            const existingCartItemID = state.cartItems.find((item) => item.id === action.payload)
            if (existingCartItemID) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload? { ...item, quantity: item.quantity + 1 } : item
                    ),
                }
            }
        case types.DECREASE_CART_ITEM_QUANTITY:
            const existingCartItemID1 = state.cartItems.find((item) => item.id === action.payload)
            if(existingCartItemID1){
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                    ),
                };
            }
        case types.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            }
        default:
            return { ...state };
    }
}