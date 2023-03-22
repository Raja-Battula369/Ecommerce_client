import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
    watchList: [],
    isWatchList: false,
    isSearchOn: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addToWatchList: (state, action) => {
            state.watchList = [...state.watchList, action.payload.add]
        },
        removeFromWatchList: (state, action) => {
            state.watchList = state.watchList.filter((item) => item.id !== action.payload.id)
        },
        addToCart: (state, action) => {

            state.cart = [...state.cart, action.payload.item];

        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);

        },
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {

                if (item.id === action.payload.id) {
                    item.count++;
                };
                return item;
            });
        },
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                };
                return item;
            });
        },
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        setIsWatchListOpen: (state) => {
            state.isWatchList = !state.isWatchList;
        },
        setIsSearchOn: (state) => {
            state.isSearchOn = !state.isSearchOn;
        }
    },
});

export const {
    setItems, addToCart, removeFromCart, increaseCount, decreaseCount, setIsCartOpen, addToWatchList, removeFromWatchList, setIsWatchListOpen, setIsSearchOn
} = cartSlice.actions;

export default cartSlice.reducer;