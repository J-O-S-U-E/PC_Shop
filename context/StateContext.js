'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';

const Context = createContext();


export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const data = window.localStorage.getItem('PC_STORE_CART_ITEMS');
        if ( data != "[]" && data !== null) {
            setCartItems(JSON.parse(data));
            setTotalPrice(JSON.parse(window.localStorage.getItem('PC_STORE_CART_TOTALPRICE')));
            setTotalQuantities(JSON.parse(window.localStorage.getItem('PC_STORE_CART_TOTALQUANTITIES')));
            setQty(JSON.parse(window.localStorage.getItem('PC_STORE_CART_QTY')));
        }   
    }, [])

    useEffect(() => {
            window.localStorage.setItem('PC_STORE_CART_ITEMS', JSON.stringify(cartItems))
            window.localStorage.setItem('PC_STORE_CART_TOTALPRICE', JSON.stringify(totalPrice))
            window.localStorage.setItem('PC_STORE_CART_TOTALQUANTITIES', JSON.stringify(totalQuantities))
            window.localStorage.setItem('PC_STORE_CART_QTY', JSON.stringify(qty))
    }, [cartItems, totalPrice, totalQuantities, qty])

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
            const updatedCartItems = [];
            cartItems.forEach((cartProduct) => {
                if(cartProduct._id === product._id) {
                    let newCartProduct = {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                    updatedCartItems.push(newCartProduct);
                } else {
                    updatedCartItems.push(cartProduct);
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to cart!`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);

        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities -foundProduct.quantity);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        if(value === 'inc') {
            const newCartItems = cartItems.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item);
            setCartItems([...newCartItems]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
            const newCartItems = cartItems.map(item => item._id === id ? { ...item, quantity: item.quantity - 1 } : item);
            setCartItems([...newCartItems]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            
            return prevQty - 1
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);