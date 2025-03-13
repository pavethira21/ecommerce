import { createContext, useState } from "react";

// Create a Cart Context with an initial state
export const CartContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    updateQuantity: () => {},
    clearCart: () => {}
});

// CartProvider to wrap the app and provide the context
export const CartProvider = ({ children }) => {
    // Cart state to store items
    const [items, setItems] = useState([]);

    // Function to add an item to the cart
    const addItem = (item) => {
        console.log('hello')
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                // If the item already exists, update its quantity
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                // If the item does not exist, add it to the cart
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart
    const removeItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Function to update the quantity of an item
    const updateQuantity = (id, quantity) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Function to clear the entire cart
    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
