"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  metal: string;
  size?: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface BespokeRequest {
  id: string;
  date: string;
  status: string;
  metal: string;
  stone: string;
  carat: string;
  ringSize?: string;
  engraving?: string;
  details: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewsCount: number;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  addresses: Address[];
  bespokeRequests: BespokeRequest[];
  notifications: Notification[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string, metal: string, size?: string) => void;
  updateCartQuantity: (id: string, metal: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, updatedAddress: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  placeOrder: (shippingAddress: Address, paymentMethod: string) => string;
  submitBespokeRequest: (request: Omit<BespokeRequest, "id" | "date" | "status">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Static Products
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "solitaire-ring",
    name: "Classic Solitaire Ring",
    price: 1499,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    description: "A timeless, beautiful solitaire diamond ring set in solid white gold.",
    rating: 4.9,
    reviewsCount: 23
  },
  {
    id: "pear-pendant",
    name: "Pear Drop Pendant",
    price: 999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    category: "Pendants",
    description: "An elegant pear-shaped diamond pendant designed to capture light from every angle.",
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: "stud-earrings",
    name: "Diamond Stud Earrings",
    price: 1299,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    description: "Classic diamond studs that shine with eternal brilliance, perfect for any occasion.",
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: "halo-pendant",
    name: "Halo Diamond Pendant",
    price: 1799,
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a3a35541?auto=format&fit=crop&w=600&q=80",
    category: "Pendants",
    description: "A sparkling round diamond surrounded by a halo of micro-diamonds, creating an immense sparkle.",
    rating: 4.7,
    reviewsCount: 21
  },
  {
    id: "twisted-ring",
    name: "Twisted Diamond Ring",
    price: 1399,
    image: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    description: "An intricate twisted eternity ring with sparkling diamonds embedded within the metal.",
    rating: 4.8,
    reviewsCount: 17
  },
  {
    id: "hoop-earrings",
    name: "Diamond Hoop Earrings",
    price: 1599,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    description: "Gorgeous, diamond-encrusted hoop earrings crafted for premium evening elegance.",
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: "floral-cluster-ring",
    name: "Floral Cluster Diamond Ring",
    price: 1899,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    description: "A breathtaking cluster of brilliant-cut diamonds forming an exquisite floral pattern. Set in your choice of precious metal.",
    rating: 4.9,
    reviewsCount: 25
  },
  {
    id: "tennis-bracelet",
    name: "Classic Diamond Tennis Bracelet",
    price: 2499,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    category: "Bracelets",
    description: "An endless line of beautiful, matching round-cut diamonds, meticulously set for maximum sparkle and comfort.",
    rating: 5.0,
    reviewsCount: 15
  },
  {
    id: "cushion-ring",
    name: "Cushion Cut Ring",
    price: 1999,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    description: "A majestic cushion-cut solitaire diamond ring set with modern split prongs.",
    rating: 4.8,
    reviewsCount: 19
  },
  {
    id: "drop-earrings",
    name: "Diamond Drop Earrings",
    price: 1699,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    category: "Earrings",
    description: "Dangling drop earrings lined with sparkling white diamonds for maximum light capture.",
    rating: 4.9,
    reviewsCount: 14
  },
  {
    id: "princess-pendant",
    name: "Princess Cut Pendant",
    price: 1199,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
    category: "Pendants",
    description: "A contemporary princess-cut diamond pendant suspended from a solid platinum link chain.",
    rating: 4.8,
    reviewsCount: 11
  },
  {
    id: "leaf-ring",
    name: "Leaf Diamond Ring",
    price: 1299,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
    category: "Rings",
    description: "A delicate, organic leaf-patterned diamond ring crafted with unique branch band structures.",
    rating: 4.7,
    reviewsCount: 16
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // States
  const [products] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [bespokeRequests, setBespokeRequests] = useState<BespokeRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("rithika_cart");
      const storedWishlist = localStorage.getItem("rithika_wishlist");
      const storedOrders = localStorage.getItem("rithika_orders");
      const storedAddresses = localStorage.getItem("rithika_addresses");
      const storedBespoke = localStorage.getItem("rithika_bespoke");
      const storedNotifications = localStorage.getItem("rithika_notifications");

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedBespoke) setBespokeRequests(JSON.parse(storedBespoke));
      
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      } else {
        // Default address
        const defaultAddr: Address = {
          id: "addr_1",
          name: "Rithika Diamond Guest",
          addressLine1: "123 luxury Avenue, Suite 45B",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "United States",
          phone: "+1 (555) 019-2834",
          isDefault: true
        };
        setAddresses([defaultAddr]);
        localStorage.setItem("rithika_addresses", JSON.stringify([defaultAddr]));
      }

      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        // Default notifications
        const defaultNotifs: Notification[] = [
          {
            id: "notif_1",
            title: "Welcome to Rithika Diamonds",
            message: "Thank you for creating an account. Enjoy exclusive updates on our bespoke jewellery collections.",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            read: false
          },
          {
            id: "notif_2",
            title: "New Collection Launch",
            message: "Our Royal Sapphire and Diamond collection is now live. Explore these limited masterpieces today.",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            read: false
          }
        ];
        setNotifications(defaultNotifs);
        localStorage.setItem("rithika_notifications", JSON.stringify(defaultNotifs));
      }
    }
  }, []);

  // Save state helpers
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("rithika_cart", JSON.stringify(newCart));
  };

  const saveWishlist = (newWish: WishlistItem[]) => {
    setWishlist(newWish);
    localStorage.setItem("rithika_wishlist", JSON.stringify(newWish));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem("rithika_orders", JSON.stringify(newOrders));
  };

  const saveAddresses = (newAddrs: Address[]) => {
    setAddresses(newAddrs);
    localStorage.setItem("rithika_addresses", JSON.stringify(newAddrs));
  };

  const saveBespoke = (newBespoke: BespokeRequest[]) => {
    setBespokeRequests(newBespoke);
    localStorage.setItem("rithika_bespoke", JSON.stringify(newBespoke));
  };

  const saveNotifications = (newNotifs: Notification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem("rithika_notifications", JSON.stringify(newNotifs));
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qty = item.quantity || 1;
    const existingIndex = cart.findIndex(
      (c) => c.id === item.id && c.metal === item.metal && c.size === item.size
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += qty;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...item, quantity: qty }]);
    }

    // Add a notification about item added to cart
    addNotificationInternal(
      "Item Added to Cart",
      `"${item.name}" has been successfully added to your shopping cart.`
    );
  };

  const removeFromCart = (id: string, metal: string, size?: string) => {
    const newCart = cart.filter(
      (c) => !(c.id === id && c.metal === metal && c.size === size)
    );
    saveCart(newCart);
  };

  const updateCartQuantity = (id: string, metal: string, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, metal, size);
      return;
    }
    const newCart = cart.map((c) => {
      if (c.id === id && c.metal === metal && c.size === size) {
        return { ...c, quantity };
      }
      return c;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (item: WishlistItem) => {
    const exists = wishlist.some((w) => w.id === item.id);
    if (exists) {
      const newWish = wishlist.filter((w) => w.id !== item.id);
      saveWishlist(newWish);
      addNotificationInternal(
        "Removed from Wishlist",
        `"${item.name}" has been removed from your wishlist.`
      );
    } else {
      saveWishlist([...wishlist, item]);
      addNotificationInternal(
        "Added to Wishlist",
        `"${item.name}" has been added to your wishlist.`
      );
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((w) => w.id === id);
  };

  // Address book operations
  const addAddress = (address: Omit<Address, "id">) => {
    const newId = `addr_${Date.now()}`;
    let newAddrs = [...addresses];
    
    if (address.isDefault) {
      newAddrs = newAddrs.map((a) => ({ ...a, isDefault: false }));
    }

    const newAddr: Address = { ...address, id: newId };
    saveAddresses([...newAddrs, newAddr]);
  };

  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    let newAddrs = [...addresses];
    if (updatedFields.isDefault) {
      newAddrs = newAddrs.map((a) => ({ ...a, isDefault: false }));
    }
    newAddrs = newAddrs.map((a) => (a.id === id ? { ...a, ...updatedFields } as Address : a));
    saveAddresses(newAddrs);
  };

  const deleteAddress = (id: string) => {
    const isDeletingDefault = addresses.find((a) => a.id === id)?.isDefault;
    let newAddrs = addresses.filter((a) => a.id !== id);
    if (isDeletingDefault && newAddrs.length > 0) {
      newAddrs[0].isDefault = true;
    }
    saveAddresses(newAddrs);
  };

  // Place order
  const placeOrder = (shippingAddress: Address, paymentMethod: string): string => {
    if (cart.length === 0) return "";
    const orderId = `RD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderItems: OrderItem[] = cart.map((c) => ({
      id: c.id,
      name: c.name,
      price: c.price,
      quantity: c.quantity,
      image: c.image
    }));

    const total = cart.reduce((acc, c) => acc + c.price * c.quantity, 0);

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Processing",
      total,
      items: orderItems,
      shippingAddress,
      paymentMethod
    };

    saveOrders([newOrder, ...orders]);
    clearCart();

    addNotificationInternal(
      "Order Placed Successfully",
      `Your order #${orderId} for $${total.toLocaleString()} has been placed. We are preparing your masterpieces.`
    );

    return orderId;
  };

  // Bespoke custom jewellery
  const submitBespokeRequest = (request: Omit<BespokeRequest, "id" | "date" | "status">) => {
    const newId = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReq: BespokeRequest = {
      ...request,
      id: newId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Under Review"
    };

    saveBespoke([newReq, ...bespokeRequests]);

    addNotificationInternal(
      "Bespoke Request Received",
      `Your custom jewellery design request #${newId} has been successfully submitted. Our designers will reach out in 24 hours.`
    );
  };

  // Notifications Helpers
  const addNotificationInternal = (title: string, message: string) => {
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      read: false
    };
    saveNotifications([newNotif, ...notifications]);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotifications(updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        addresses,
        bespokeRequests,
        notifications,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addAddress,
        updateAddress,
        deleteAddress,
        placeOrder,
        submitBespokeRequest,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
