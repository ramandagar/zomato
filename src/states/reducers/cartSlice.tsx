import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@states/store";
import uuid from 'react-native-uuid';


interface CartItem {
    price: number;
    isVeg: boolean;
    id: string;
    name: string;
    quantity: number;
    cartPrice: number;
    isCustomizable: boolean;
    customization: any[];
}

interface RestaurantDetails {
    id: string;
    name: string;
    discount: string;
    discountAmount: string;
    time: string;
    distance: string;
    rating: number;
    imageUrl: string;
}
interface RestaurantCart {
    restaurant: RestaurantDetails;
    items: CartItem[];
}

interface CartState {
    carts: RestaurantCart[];
}

const initialState: CartState = {
    carts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<{ restaurant: RestaurantDetails, item: CartItem }>) => {
            const { restaurant, item } = action.payload
            const existingRestaurantCart = state.carts.find(cart => cart.restaurant.id === restaurant.id)
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart.items.find(i => i.id === item.id)
                if (existingItem) {
                    existingItem.quantity += 1
                    existingItem.cartPrice = (existingItem.cartPrice || 0) + existingItem?.price
                } else {
                    existingRestaurantCart.items.push({ ...item, quantity: 1, cartPrice: item?.price })
                }
            } else {
                state.carts.push({
                    restaurant,
                    items: [{ ...item, quantity: 1, cartPrice: item?.price }]
                })
            }
        },
        removeItemFromCart: (state,
            action: PayloadAction<{
                restaurantId: string,
                itemId: string
            }>
        ) => {
            const { restaurantId, itemId } = action.payload
            const restaurantCart = state.carts.find(cart => cart.restaurant.id === restaurantId)
            if (!restaurantCart) return
            const itemIndex = restaurantCart.items.findIndex(i => i.id === itemId)
            if (itemIndex !== -1) {
                const item = restaurantCart.items[itemIndex]
                if (item.quantity > 1) {
                    item.quantity -= 1
                    item.cartPrice = (item.cartPrice || 0) - item?.price
                } else {
                    restaurantCart.items.splice(itemIndex, 1)
                }
            }
            if (restaurantCart.items.length === 0) {
                state.carts = state.carts.filter(cart => cart.restaurant.id !== restaurantId)
            }
        },
        addCustomizableItem: (
            state,
            action: PayloadAction<{
                restaurant: RestaurantDetails,
                item: CartItem,
                customization: {
                    quantity: number,
                    price: number,
                    customizationOptions: any[]
                }
            }>
        ) => {
            const { restaurant, item, customization } = action.payload
            const existingRestaurantCart = state.carts.find(cart => cart.restaurant.id === restaurant.id)
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart.items.find(i => i.id === item.id) as any
                if (existingItem) {
                    const existingCustomizationIndex = existingItem.customization.findIndex((c: any) => JSON.stringify(c.customizationOptions) === JSON.stringify(customization.customizationOptions));
                    if (existingCustomizationIndex !== -1) {
                        const existingCustomization = existingItem.customization[existingCustomizationIndex]
                        existingCustomization.quantity += customization.quantity
                        existingCustomization.cartPrice += customization.price
                    } else {
                        const newCustomizableId = uuid.v4()
                        existingItem.customization.push({
                            ...customization,
                            id: newCustomizableId,
                            quantity: customization.quantity,
                            cartPrice: customization.price,
                            price: customization.price / customization.quantity
                        })
                    }
                    existingItem.quantity += customization.quantity
                    existingItem.cartPrice = (existingItem?.cartPrice || 0) + customization.price
                }
                else {
                    const newCustomizationId = `c1`
                    existingRestaurantCart.items.push({
                        ...item,
                        quantity: customization.quantity,
                        cartPrice: customization.price,
                        customization: [
                            {
                                id: newCustomizationId,
                                ...customization,
                                quantity: customization.quantity,
                                cartPrice: customization.price,
                                price: customization.price / customization.quantity

                            }
                        ]
                    })
                }
            } else {
                const newCustomizationId = `c1`
                state.carts.push({
                    restaurant,
                    items: [{
                        ...item,
                        quantity: customization.quantity,
                        cartPrice: customization.price,
                        customization: [
                            {
                                id: newCustomizationId,
                                ...customization,
                                quantity: customization.quantity,
                                cartPrice: customization.price,
                                price: customization.price / customization.quantity

                            }
                        ]
                    }]
                })
            }
        },
        removeCustomizableItem: (
            state,
            action: PayloadAction<{
                restaurantId: string,
                itemId: string,
                customizationId: string
            }>
        ) => {
            const { restaurantId, itemId, customizationId } = action.payload
            const restaurantCart = state.carts.find(cart => cart.restaurant.id === restaurantId)
            if (!restaurantCart) return
            const itemIndex = restaurantCart.items.findIndex(i => i.id === itemId)
            if (itemIndex !== -1) {
                const item = restaurantCart.items?.find((i: CartItem) => i.id === itemId)
                if (!item) return
                if (item) {
                    const customizationIndex = item.customization.findIndex((c: any) => c.id === customizationId)
                    if (customizationIndex !== -1 && item?.customization) {
                        const customization = item.customization[customizationIndex]
                        if (customization.quantity > 1) {
                            customization.quantity -= 1
                            customization.cartPrice -= customization.price
                        } else {
                            item.customization.splice(customizationIndex, 1)
                        }
                        item.quantity -= 1
                        item.cartPrice = (item?.cartPrice || 0) - customization.price

                        if (item.customization.length === 0 || item?.quantity === 0) {
                            restaurantCart.items = restaurantCart.items.filter((i: CartItem) => i.id !== itemId)
                        }
                        if (restaurantCart?.items?.length === 0) {
                            state.carts = state.carts.filter((cart: RestaurantCart) => cart.restaurant.id !== restaurantId)
                        }
                    }
                }
            }
        },
        updateCustomizableItem: (
            state,
            action: PayloadAction<{
                restaurantId: string,
                itemId: string,
                customizationId: string,
                newCustomization: {
                    quantity: number,
                    price: number,
                    customizationOptions: any[]
                }
            }>
        ) => {
            const { restaurantId, itemId, customizationId, newCustomization } = action.payload
            const restaurantCart = state.carts.find(cart => cart.restaurant.id === restaurantId)
            if (!restaurantCart) return
            const item = restaurantCart.items.find((i: CartItem) => i.id === itemId)
            if (!item) return
            const matchingCustomizationIndex = item.customization.findIndex((c: any) => c.id !== customizationId && JSON.stringify(c.customizationOptions) === JSON.stringify(newCustomization.customizationOptions))
            const targetCustomizationIndex = item.customization.findIndex((c: any) => c.id === customizationId)
            const targetCustomization = item.customization[targetCustomizationIndex]
            if (matchingCustomizationIndex !== -1) {
                const matchingCustomization = item.customization[matchingCustomizationIndex]
                matchingCustomization.quantity += targetCustomization.quantity
                matchingCustomization.cartPrice += targetCustomization.price

                item.customization.splice(targetCustomizationIndex, 1)
            } else {
                targetCustomization.quantity = newCustomization.quantity
                targetCustomization.cartPrice = newCustomization.price
                targetCustomization.customizationOptions = newCustomization.customizationOptions
                targetCustomization.price = newCustomization.price / newCustomization.quantity
            }
            item.quantity = item.customization.reduce((acc: number, c: any) => acc + c.quantity, 0)
            item.cartPrice = item.customization.reduce((acc: number, c: any) => acc + c.cartPrice, 0)
        },
        clearAllCarts: (state) => {
            state.carts = []
        },
        clearRestaurantCart: (
            state,
            action: PayloadAction<{
                restaurant_id: string
            }>
        ) => {
            const { restaurant_id } = action.payload
            state.carts = state.carts.filter(cart => cart.restaurant.id !== restaurant_id)
        }
    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectRestaurantCartItem = (restaurantId: string, ItemId: string) => createSelector(
    (state: RootState) => state.cart.carts.find(cart => cart.restaurant.id === restaurantId)?.items,
    (items: CartItem[] | undefined) => items?.find(item => item.id === ItemId) || null
)

export const selectRestaurantCart = (restaurantId: string) => createSelector(
    (state: RootState) => state.cart.carts.find(cart => cart.restaurant.id === restaurantId),
    (restaurantCart) => restaurantCart ? [...restaurantCart.items] : []
)

export const {
    addItemToCart,
    removeItemFromCart,
    addCustomizableItem,
    removeCustomizableItem,
    updateCustomizableItem,
    clearAllCarts,
    clearRestaurantCart
} = cartSlice.actions
export default cartSlice.reducer;
