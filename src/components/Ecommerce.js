//Author: Muhammad Asfand Yar Khan

import React, { useState } from "react";
import { speakSoftly } from "../utils/speakSoftly";
import woodlandGuidebook from "../assets/woodlandguidebook.png";
import waterBottle from "../assets/waterbottle.png";
import trailMap from "../assets/trailmap.png";
import seedPack from "../assets/seedpack.png";

const PRODUCTS = [
  { id: 1, name: "Woodland Guidebook", price: 19.99, image: woodlandGuidebook },
  { id: 2, name: "Recycled Water Bottle", price: 14.5, image: waterBottle },
  { id: 3, name: "Trail Map (folded)", price: 6.0, image: trailMap },
  { id: 4, name: "Seed Pack (native species)", price: 8.75, image: seedPack },
];

const formatCurrency = (n) => `$${Number(n).toFixed(2)}`;

const Ecommerce = () => {
  const [cart, setCart] = useState([]);
  const [checkedOut, setCheckedOut] = useState(false);
  const [gstResult, setGstResult] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // 🔊 CLICK-TO-SPEAK
  const speak = (text) => {
    speakSoftly(text);
    setIsPaused(false);
  };

  // 🔊 HOVER-TO-SPEAK (for buttons)
  const speakOnHover = (text) => {
    speakSoftly(text);
    setIsPaused(false);
  };

  const toggleSpeechPause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.paused ? synth.resume() : synth.pause();
    setIsPaused(!isPaused);
  };

  const addToCart = (product) => {
    speak(`Added ${product.name} to cart.`);
    setCheckedOut(false);
    setGstResult(null);

    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id, name) => {
    speak(`Removed ${name} from cart.`);
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, qty, name) => {
    speak(`Updated quantity of ${name}.`);
    if (qty <= 0) return;
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const gstPercent = 0.14;
  const gst = subtotal * gstPercent;
  const total = subtotal + gst;

  const handleCheckout = () => {
    speak(
      `Checkout complete. Subtotal ${formatCurrency(
        subtotal
      )}, GST ${formatCurrency(gst)}, total ${formatCurrency(total)}.`
    );

    setGstResult({
      subtotal: Number(subtotal.toFixed(2)),
      gst: Number(gst.toFixed(2)),
      total: Number(total.toFixed(2)),
      gstPercent: gstPercent * 100,
    });

    setCheckedOut(true);
  };

  const clearCart = () => {
    speak("Cart cleared.");
    setCart([]);
    setCheckedOut(false);
    setGstResult(null);
  };

  return (
    <div
      className="p-8 min-h-screen bg-white dark:bg-darkerBlue text-black dark:text-yellow-200"
      data-testid="ecommerce-page"
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          onClick={() => speak("Woodland Shop")}
        >
          Woodland Shop
        </h1>

        {/* PRODUCTS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 flex flex-col items-stretch bg-gray-50 dark:bg-gray-800"
              data-testid="product-card"
            >
              <div
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center text-gray-500 overflow-hidden"
                style={{ aspectRatio: "4 / 5" }}
                onClick={() => speak(p.name)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              <h2
                className="text-lg font-semibold mb-2 cursor-pointer"
                onClick={() => speak(p.name)}
              >
                {p.name}
              </h2>

              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-md font-medium cursor-pointer"
                  onClick={() => speak(formatCurrency(p.price))}
                >
                  {formatCurrency(p.price)}
                </span>

                <button
                  data-testid="add-to-cart"
                  onClick={() => addToCart(p)}
                  onMouseEnter={() => speakOnHover("Add to cart")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* CART */}
        <aside
          className="bg-white dark:bg-gray-900 border rounded-lg p-6 shadow-md"
          data-testid="cart"
        >
          <h3
            className="text-2xl font-bold mb-4 cursor-pointer"
            onClick={() => speak("Cart")}
          >
            Cart
          </h3>

          {cart.length === 0 ? (
            <p onClick={() => speak("Your cart is empty")}>Your cart is empty.</p>
          ) : (
            <div className="space-y-4 mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                  data-testid="cart-item"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      speak(
                        `${item.name}. ${formatCurrency(item.price)} each. Quantity ${item.qty}.`
                      )
                    }
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm">
                      {formatCurrency(item.price)} × {item.qty} ={" "}
                      {formatCurrency(item.price * item.qty)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.id, Number(e.target.value) || 1, item.name)
                      }
                      className="w-20 p-1 border rounded text-center"
                      onClick={() => speak("Change quantity")}
                    />

                    <button
                      data-testid="remove-item"
                      onClick={() => removeFromCart(item.id, item.name)}
                      onMouseEnter={() => speakOnHover("Remove item")}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span onClick={() => speak("Subtotal")}>Subtotal</span>
              <strong onClick={() => speak(formatCurrency(subtotal))}>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <div className="flex justify-between mb-2">
              <span onClick={() => speak("GST 14 percent")}>GST (14%)</span>
              <strong onClick={() => speak(formatCurrency(gst))}>
                {formatCurrency(gst)}
              </strong>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span onClick={() => speak("Total")}>Total</span>
              <strong
                data-testid="cart-total"
                onClick={() => speak(formatCurrency(total))}
              >
                {formatCurrency(total)}
              </strong>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                data-testid="checkout-btn"
                onClick={handleCheckout}
                onMouseEnter={() => speakOnHover("Checkout")}
                disabled={cart.length === 0}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                onMouseEnter={() => speakOnHover("Clear cart")}
                className="px-4 py-2 border rounded"
                disabled={cart.length === 0}
              >
                Clear cart
              </button>
            </div>

            {checkedOut && gstResult && (
              <div
                className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded cursor-pointer"
                data-testid="checkout-summary"
                onClick={() =>
                  speak(
                    `Subtotal ${formatCurrency(
                      gstResult.subtotal
                    )}, GST ${formatCurrency(gstResult.gst)}, Total ${formatCurrency(
                      gstResult.total
                    )}`
                  )
                }
              >
                <div>Subtotal: {formatCurrency(gstResult.subtotal)}</div>
                <div>GST: {formatCurrency(gstResult.gst)}</div>
                <div className="font-semibold">
                  Grand Total: {formatCurrency(gstResult.total)}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Ecommerce;



