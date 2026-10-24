
"use client";

import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  ShoppingBag,
  Clock,
  Plus,
  Minus,
  Menu,
  X,
  Truck,
} from "lucide-react";

const dishes = [
  {
    id: 1,
    name: "Special Beef Nihari",
    description: "Slow-cooked beef, rich traditional gravy and fresh ginger.",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    tag: "HOUSE SPECIAL",
  },
  {
    id: 2,
    name: "Maghaz Nihari",
    description: "A rich, traditional favourite for true Nihari lovers.",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85",
    tag: "CUSTOMER FAVOURITE",
  },
  {
    id: 3,
    name: "Nalli Nihari",
    description: "Tender beef shank with deeply flavoured masala.",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    tag: "MUST TRY",
  },
];

export default function Home() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [branch, setBranch] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [cart, setCart] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  function addToCart(dish) {
    setCart((current) => {
      const found = current.find((item) => item.id === dish.id);

      if (found) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...current, { ...dish, qty: 1 }];
    });
  }

  function changeQty(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function continueOrder() {
    if (service === "delivery" && !location) {
      alert("Please select your delivery area.");
      return;
    }

    if (service === "pickup" && !branch) {
      alert("Please select your pickup branch.");
      return;
    }

    setShowWelcome(false);
  }

  return (
    <main>
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-card">
            <div className="welcome-brand">SHANZEH</div>
            <div className="welcome-subtitle">THE NIHARI HOUSE</div>

            <div className="welcome-divider">✦</div>

            <h1>How would you like to enjoy your Nihari?</h1>
            <p className="welcome-description">
              Freshly prepared. Rich in tradition. Made for you.
            </p>

            <div className="service-options">
              <button
                className={`service-option ${
                  service === "delivery" ? "selected" : ""
                }`}
                onClick={() => setService("delivery")}
              >
                <Truck size={26} />
                <strong>Delivery</strong>
                <span>Get it delivered to you</span>
              </button>

              <button
                className={`service-option ${
                  service === "pickup" ? "selected" : ""
                }`}
                onClick={() => setService("pickup")}
              >
                <ShoppingBag size={26} />
                <strong>Pickup</strong>
                <span>Collect from our branch</span>
              </button>
            </div>

            {service === "delivery" && (
              <label className="selection-label">
                SELECT YOUR AREA
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                >
                  <option value="">Choose your delivery area</option>
                  <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
                  <option value="Gulistan-e-Jauhar">Gulistan-e-Jauhar</option>
                  <option value="North Nazimabad">North Nazimabad</option>
                  <option value="Federal B Area">Federal B Area</option>
                  <option value="Other Karachi area">
                    Other Karachi area
                  </option>
                </select>
              </label>
            )}

            {service === "pickup" && (
              <label className="selection-label">
                SELECT YOUR BRANCH
                <select
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                >
                  <option value="">Choose a pickup branch</option>
                  <option value="Branch 1">Branch 1 — To be confirmed</option>
                  <option value="Branch 2">Branch 2 — To be confirmed</option>
                </select>
              </label>
            )}

            <button
              className="primary-button welcome-continue"
              disabled={!service}
              onClick={continueOrder}
            >
              CONTINUE <ArrowRight size={18} />
            </button>

            <p className="welcome-note">
              Authentic taste, served with care.
            </p>
          </div>
        </div>
      )}

      <div className="announcement">
        A TASTE OF TRADITION, MADE FRESH EVERY DAY
      </div>

      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-name">SHANZEH</span>
          <span className="brand-caption">NIHARI HOUSE</span>
        </a>

        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#menu" onClick={() => setMobileMenu(false)}>Our Menu</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our Story</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>

        <div className="header-actions">
          <a className="cart-button" href="#menu">
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="cart-count">{totalItems}</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            KARACHI'S LOVE FOR NIHARI
          </span>

          <h1>
            A timeless taste.
            <br />
            <span>Unforgettable</span>
            <br />
            tradition.
          </h1>

          <p>
            Rich, slow-cooked Nihari prepared with passion, authentic spices
            and a love for the flavours we grew up with.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#menu">
              EXPLORE OUR MENU <ArrowRight size={18} />
            </a>
            <a className="text-link" href="#story">
              OUR STORY <span>↗</span>
            </a>
          </div>

          <div className="hero-details">
            <div>
              <Clock size={19} />
              <span>Freshly prepared</span>
            </div>
            <div>
              <MapPin size={19} />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90"
            alt="A richly prepared traditional meal"
          />
          <div className="hero-image-label">
            <span>THE ART OF SLOW COOKING</span>
            <strong>Tradition in every bite.</strong>
          </div>
          <div className="hero-stamp">
            <span>MADE WITH</span>
            <strong>LOVE</strong>
            <span>& TRADITION</span>
          </div>
        </div>

        <div className="hero-watermark">S</div>
      </section>

      <section className="trust-strip">
        <div><span>✦</span> AUTHENTIC FLAVOURS</div>
        <div><span>✦</span> RICH TRADITION</div>
        <div><span>✦</span> MADE FRESH</div>
        <div><span>✦</span> SERVED WITH LOVE</div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM OUR KITCHEN</span>
            <h2>Our Signature <em>Nihari</em></h2>
            <p>Discover the flavours that make every meal memorable.</p>
          </div>
          <span className="menu-side-note">CRAFTED WITH TRADITION</span>
        </div>

        <div className="menu-grid">
          {dishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
                <span className="dish-tag">{dish.tag}</span>
              </div>

              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <div className="dish-bottom">
                  <strong>Rs. {dish.price.toLocaleString("en-PK")}</strong>
                  <button
                    className="add-button"
                    onClick={() => addToCart(dish)}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <Plus size={18} /> ADD
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="demo-note">
          Demo menu and prices — confirm the actual menu with the shop owner.
        </p>
      </section>

      {cart.length > 0 && (
        <section className="cart-section" id="cart">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR SELECTION</span>
              <h2>Your <em>Order</em></h2>
            </div>
          </div>

          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>Rs. {item.price.toLocaleString("en-PK")} each</span>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => changeQty(item.id, -1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => changeQty(item.id, 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <strong>
                Rs. {(item.price * item.qty).toLocaleString("en-PK")}
              </strong>
            </div>
          ))}

          <div className="cart-total">
            <span>Subtotal</span>
            <strong>Rs. {totalPrice.toLocaleString("en-PK")}</strong>
          </div>

          <p className="demo-note">
            Checkout and order submission will be connected in a later step.
          </p>
        </section>
      )}

      <section className="story-section" id="story">
        <div className="story-mark">S.</div>
        <div>
          <span className="eyebrow">MORE THAN JUST A MEAL</span>
          <h2>Some flavours feel like <em>home.</em></h2>
          <p>
            At Shanzeh Nihari, our vision is to celebrate the timeless taste
            of traditional Nihari and bring people together over food they
            love.
          </p>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-brand">
          <span className="brand-name">SHANZEH</span>
          <span className="brand-caption">NIHARI HOUSE</span>
          <p>A timeless taste. Unforgettable tradition.</p>
        </div>
        <div className="footer-contact">
          <strong>VISIT OR CONTACT US</strong>
          <span>Karachi, Pakistan</span>
          <span>Branch details coming soon</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Shanzeh Nihari</span>
          <span>Made with care in Karachi.</span>
        </div>
      </footer>
    </main>
  );
}
