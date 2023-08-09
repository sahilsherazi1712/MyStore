import types from "../types";

let init_state = {
    addresses: [],
};

export const addressReducer = (state = init_state, action) => {
    switch (action.type) {
        case types.CREATE_ADDRESS:
            return {
                ...state,
                addresses: [...state.addresses, action.payload],
            }
        case types.UPDATE_ADDESS:
            const { addressId, updatedData } = action.payload;
            return {
                ...state,
                addresses: state.addresses.map((address) => {
                    address.id === addressId ? { ...address, ...updatedData } : address
                })
            }
        case types.REMOVE_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.filter((address) => address.id !== action.payload)
            }
        default:
            return state;
    }
}

// const handleCreateAddress = () => {
//     const newAddressData = { id: 1, street: '123 Main St', city: 'City A' };
//     dispatch(createAddress(newAddressData));
//   };

//   const handleUpdateAddress = () => {
//     const addressId = 1;
//     const updatedData = { city: 'City B' };
//     dispatch(updateAddress(addressId, updatedData));
//   };

//   const handleRemoveAddress = () => {
//     const addressId = 1;
//     dispatch(removeAddress(addressId));
//   };
