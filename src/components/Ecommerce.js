//Author: Muhammad Asfand Yar Khan

// src/components/Ecommerce.js
import React, { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Woodland Guidebook", price: 19.99, image: "" },
  { id: 2, name: "Recycled Water Bottle", price: 14.5, image: "" },
  { id: 3, name: "Trail Map (folded)", price: 6.0, image: "" },
  { id: 4, name: "Seed Pack (native species)", price: 8.75, image: "" },
];

const formatCurrency = (n) => `$${Number(n).toFixed(2)}`;

const Ecommerce = () => {
  const [cart, setCart] = useState([]); // [{id, name, price, qty}]
  const [checkedOut, setCheckedOut] = useState(false);
  const [gstResult, setGstResult] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Speech synthesis helper
  const speak = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.paused) synth.resume();
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.pitch = 1;
    synth.speak(utter);
    setIsPaused(false);
  };

  // Use for hover speech (Add to cart, Remove buttons)
  const speakOnHover = (text) => {
    // Cancel any ongoing speech, then speak
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.paused) synth.resume();
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1.2;
    utter.pitch = 1;
    synth.speak(utter);
    setIsPaused(false);
  };

  const toggleSpeechPause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
  };

  const addToCart = (product) => {
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

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return;
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const subtotal = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const gstPercent = 0.14;
  const gst = subtotal * gstPercent;
  const total = subtotal + gst;

  const handleCheckout = () => {
    setGstResult({
      subtotal: Number(subtotal.toFixed(2)),
      gst: Number(gst.toFixed(2)),
      total: Number(total.toFixed(2)),
      gstPercent: gstPercent * 100,
    });
    setCheckedOut(true);
    speak(
      `Checkout complete. Subtotal ${formatCurrency(
        subtotal
      )}, GST ${formatCurrency(gst)}, total ${formatCurrency(total)}.`
    );
  };

  const clearCart = () => {
    setCart([]);
    setCheckedOut(false);
    setGstResult(null);
    speak("Cart cleared.");
  };

  return (
    <div className="p-8 min-h-screen bg-white dark:bg-darkerBlue text-black dark:text-yellow-200">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-yellow-200 cursor-pointer select-none"
          onClick={() => speak("Woodland Shop")}
          title="Click to hear store name"
        >
          Woodland Shop
        </h1>
        <p
          className="text-lg mb-6 text-black dark:text-yellow-200 cursor-pointer select-none"
          onClick={() =>
            speak(
              "Small demo store — add items to cart, view totals, and checkout with 14 percent GST."
            )
          }
          title="Click to hear store description"
        >
          Small demo store — add items to cart, view totals, and Checkout (14% GST).
        </p>
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={toggleSpeechPause}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm"
            aria-label={isPaused ? "Resume text to speech" : "Pause text to speech"}
            title={isPaused ? "Resume text to speech" : "Pause text to speech"}
          >
            {isPaused ? "Resume speech" : "Pause speech"}
          </button>
        </div>

        {/* PRODUCTS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 flex flex-col items-stretch bg-gray-50 dark:bg-gray-800"
            >
              {/* Image placeholder */}
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center text-gray-500">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-md"
                    onClick={() => speak(p.name)}
                  />
                ) : (
                  <span
                    className="text-sm cursor-pointer select-none"
                    onClick={() => speak(p.name)}
                    title={`Click to hear ${p.name}`}
                  >
                    Image placeholder
                  </span>
                )}
              </div>

              <h2
                className="text-lg font-semibold mb-2 text-black dark:text-yellow-200 cursor-pointer select-none"
                onClick={() => speak(p.name)}
                title={`Click to hear product name ${p.name}`}
              >
                {p.name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-md font-medium text-black dark:text-yellow-200 cursor-pointer select-none"
                  onClick={() => speak(formatCurrency(p.price))}
                  title={`Click to hear price ${formatCurrency(p.price)}`}
                >
                  {formatCurrency(p.price)}
                </span>
                <button
                  onClick={() => addToCart(p)}
                  onMouseEnter={() =>
                    speakOnHover(`Add ${p.name} to cart`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  aria-label={`Add ${p.name} to cart`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* CART */}
        <aside className="bg-white dark:bg-gray-900 border rounded-lg p-6 shadow-md">
          <h3
            className="text-2xl font-bold mb-4 text-black dark:text-yellow-200 cursor-pointer select-none"
            onClick={() => speak("Cart")}
            title="Click to hear Cart heading"
          >
            Cart
          </h3>

          {cart.length === 0 ? (
            <p
              className="mb-4 cursor-pointer select-none"
              onClick={() => speak("Your cart is empty")}
              title="Click to hear empty cart message"
            >
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4 mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div
                      className="font-semibold text-black dark:text-yellow-200 cursor-pointer select-none"
                      onClick={() =>
                        speak(
                          `${item.name}, quantity ${item.qty}, price ${formatCurrency(
                            item.price * item.qty
                          )}`
                        )
                      }
                      title={`Click to hear cart item ${item.name}`}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer select-none"
                      onClick={() =>
                        speak(
                          `${formatCurrency(item.price)} each, quantity ${item.qty}`
                        )
                      }
                      title={`Click to hear price and quantity`}
                    >
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
                        updateQty(item.id, Number(e.target.value) || 1)
                      }
                      className="w-20 p-1 border rounded text-center"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      onMouseEnter={() =>
                        speakOnHover(`Remove ${item.name} from cart`)
                      }
                      className="px-3 py-1 border rounded text-sm"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4">
            <div
              className="flex justify-between mb-2 cursor-pointer select-none"
              onClick={() =>
                speak(`Subtotal is ${formatCurrency(subtotal)}`)
              }
              title="Click to hear subtotal"
            >
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div
              className="flex justify-between mb-2 cursor-pointer select-none"
              onClick={() =>
                speak(`GST is ${formatCurrency(gst)} at ${gstPercent * 100} percent`)
              }
              title="Click to hear GST"
            >
              <span>GST ({(gstPercent * 100).toFixed(0)}%)</span>
              <strong>{formatCurrency(gst)}</strong>
            </div>
            <div
              className="flex justify-between text-xl font-bold cursor-pointer select-none"
              onClick={() => speak(`Total is ${formatCurrency(total)}`)}
              title="Click to hear total"
            >
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                aria-label="Checkout"
                title="Checkout"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="px-4 py-2 border rounded"
                disabled={cart.length === 0}
                aria-label="Clear cart"
                title="Clear cart"
              >
                Clear cart
              </button>
            </div>

            {checkedOut && gstResult && (
              <div
                className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded cursor-pointer select-none"
                onClick={() =>
                  speak(
                    `Checkout summary: subtotal ${formatCurrency(
                      gstResult.subtotal
                    )}, GST ${formatCurrency(gstResult.gst)}, grand total ${formatCurrency(
                      gstResult.total
                    )}`
                  )
                }
                title="Click to hear checkout summary"
              >
                <div>Checkout summary:</div>
                <div>Subtotal: {formatCurrency(gstResult.subtotal)}</div>
                <div>
                  GST ({gstResult.gstPercent}%): {formatCurrency(gstResult.gst)}
                </div>
                <div className="font-semibold">
                  Grand Total: {formatCurrency(gstResult.total)}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  (This demo does not perform real payment processing.)
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

