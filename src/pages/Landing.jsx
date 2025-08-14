import React from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { apiService } from "@/services/api";
import { useApi } from "@/hooks/useApi";
import ImageWithFallback from "@/components/ImageWithFallback";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

const categories = [
  {
    key: "backpacks",
    title: "Backpacks",
    image:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
  },
  {
    key: "apparel",
    title: "Apparel",
    image:
      "https://plus.unsplash.com/premium_photo-1673125287363-b4e837f1215f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "tech",
    title: "Travel Tech",
    image:
      "https://plus.unsplash.com/premium_photo-1678635774201-509efd6cb072?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "souvenirs",
    title: "Souvenirs",
    image:
      "https://plus.unsplash.com/premium_photo-1717346483237-79b436a26e15?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const heroSlides = [
  {
    name: "Explorer Pro 45L",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
  },
  {
    name: "TrailCap Windbreaker",
    price: 169,
    image:
      "https://images.unsplash.com/photo-1571867424485-369464ed33cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Nomad Wireless Earbuds",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1648447269269-f6f3c1635c55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fFdpcmVsZXNzJTIwRWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Aero Carry-On 35L",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1603920347917-d16487c88db4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const useCountdown = (hoursAhead = 48) => {
  const target = React.useRef(Date.now() + hoursAhead * 3600 * 1000);
  const [remainingMs, setRemainingMs] = React.useState(
    target.current - Date.now()
  );
  React.useEffect(() => {
    const timer = setInterval(
      () => setRemainingMs(Math.max(0, target.current - Date.now())),
      1000
    );
    return () => clearInterval(timer);
  }, []);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

const Landing = () => {
  const dispatch = useDispatch();

  // Fetch categories and products from API
  const { data: categories, loading: categoriesLoading, error: categoriesError, retry: retryCategories } = useApi(() => apiService.getCategories());
  const { data: productsData, loading: productsLoading, error: productsError, retry: retryProducts } = useApi(() => apiService.getProducts({ limit: 20 }));

  const allProducts = productsData?.products || [];
  const apiCategories = categories || [];

  // Rotate hero product cards by reordering indices
  const [cardOrder, setCardOrder] = React.useState([0, 1, 2, 3]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCardOrder((prev) =>
        prev.length > 0 ? [...prev.slice(1), prev[0]] : prev
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = React.useState(0);
  const { days, hours, minutes, seconds } = useCountdown(36);

  const selectFeatured = allProducts.slice(0, 10);
  const topSelling = allProducts
    .filter((p) => ["Backpacks", "Headphones", "Bags"].includes(p.category))
    .slice(0, 8);
  const featuredList = allProducts.slice(10, 14);

  // Show loading state
  if (categoriesLoading || productsLoading) {
    return <LoadingSpinner fullScreen message="Loading products..." />;
  }

  // Show error state
  if (categoriesError || productsError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <ErrorMessage 
            error={categoriesError || productsError} 
            onRetry={() => {
              if (categoriesError) retryCategories();
              if (productsError) retryProducts();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero stays the same as before */}
      <section className="relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/90 backdrop-blur" />
        <div className="relative container max-w-7xl mx-auto py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="md:mx-auto md:max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur text-slate-700 text-sm shadow">
              <span>🌍</span> The Best Online Travel Gear Store
            </div>
            <h1 className="font-display text-5xl md:text-6xl mt-4 leading-[1.1]">
              Explore Our <span className="text-slate-900">Modern</span> Travel
              Collection
            </h1>
            <p className="mt-4 text-slate-700   rounded-xl inline-block px-3 py-2">
              Premium gear engineered for explorers — refined design,
              field-tested performance, and effortless style for every journey.
            </p>

            <div className="mt-6 flex items-center flex-wrap justify-center md:justify-start gap-3">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border border-white"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop"
                  alt="user1"
                />
                <img
                  className="w-8 h-8 rounded-full border border-white"
                  src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&q=80&auto=format&fit=crop"
                  alt="user2"
                />
                <img
                  className="w-8 h-8 rounded-full border border-white"
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&q=80&auto=format&fit=crop"
                  alt="user3"
                />
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm border border-white">
                  +5
                </div>
              </div>
              <div className="text-slate-700 text-sm">
                <span className="font-semibold text-slate-900">4.9</span>{" "}
                Ratings+ • Trusted by 50k+ customers
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/shop">
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative md:mx-auto w-full">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/30 rounded-full blur-3xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cardOrder.map((idx, i) => {
                const item = heroSlides[idx];
                return (
                  <motion.div
                    layout
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, delay: i * 0.05 },
                    }}
                    className="rounded-2xl shadow border border-white/50 p-3 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40"
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-slate-800 text-xs shadow">
                        ${item.price}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-slate-600 text-sm">
                          Best for daily travel
                        </div>
                      </div>
                      <button
                        aria-label="Add to cart"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item._id || `hero-card-${idx}`,
                              name: item.name,
                              price: item.price,
                              image: item.images?.[0] || item.image,
                            })
                          )
                        }
                        className="h-9 w-9 rounded-full bg-slate-900 text-white grid place-items-center hover:opacity-90"
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Remaining sections use allProducts derived lists */}
      <section className="container max-w-7xl mx-auto py-8 text-center">
        <h2 className="font-display text-3xl mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {(apiCategories.length > 0 ? apiCategories.slice(0, 4) : categories).map((cat) => (
            <Link
              to={`/shop?categoryId=${cat._id || cat.key}`}
              key={cat._id || cat.key}
              className="group relative overflow-hidden rounded-2xl shadow block w-full"
            >
              <ImageWithFallback
                src={cat.image || cat.image}
                alt={cat.name || cat.title}
                className="w-full h-40 md:h-56 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-semibold text-white drop-shadow">
                {cat.name || cat.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container max-w-7xl mx-auto py-8 text-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="font-display text-3xl">Top Deals Of The Day</h2>
          <div className="text-sm text-slate-600">
            Hurry up! Offer ends in: {days}d {hours}h {minutes}m {seconds}s
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max justify-center">
            {selectFeatured.map((p) => (
              <Link
                to={`/product/${p._id || p.id}`}
                key={p._id || p.id}
                className="w-64 shrink-0 bg-white rounded-2xl p-3 transition shadow hover:-translate-y-1 text-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={p.images?.[0] || p.image}
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-slate-700 text-sm">{p.name}</div>
                  <div className="text-slate-900 font-semibold">${p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banners */}
      <section className="container max-w-7xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-2xl overflow-hidden shadow">
          <img
            src="https://plus.unsplash.com/premium_photo-1674512539830-52f74d193814?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Docking"
            className="w-full h-48 md:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 p-6 text-white">
            <div className="font-display text-2xl">PC & Docking Station</div>
            <div className="text-slate-100">
              Discount 20% on top quality products
            </div>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow">
          <img
            src="https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Accessories"
            className="w-full h-48 md:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 p-6 text-white">
            <div className="font-display text-2xl">
              Featured: Travel Accessories
            </div>
            <div className="text-slate-100">
              Free shipping on orders over $99
            </div>
          </div>
        </div>
      </section>

      {/* Top selling */}
      <section className="container max-w-7xl mx-auto py-8 text-center">
        <div className="flex flex-col items-center gap-2 mb-2">
          <h2 className="font-display text-3xl">Top Selling Products</h2>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Laptops & Computer" />
            <Tab label="Headphones" />
            <Tab label="Accessories" />
          </Tabs>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {topSelling.map((p) => (
            <Link
              to={`/product/${p._id || p.id}`}
              key={p._id || p.id}
              className="bg-white rounded-2xl p-3 shadow hover:-translate-y-1 transition text-center w-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <ImageWithFallback
                  src={p.images?.[0] || p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-3">
                <div className="text-slate-700 text-sm">{p.name}</div>
                <div className="text-slate-900 font-semibold">${p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story section with new background image */}
      <section id="story" className="relative py-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
          alt="Brand Story"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container max-w-7xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 text-center md:text-left">
            <h2 className="font-display text-white text-3xl mb-2">
              Crafted for Journeys
            </h2>
            <p className="text-white ">
              We design gear that blends durability with refined aesthetics —
              inspired by coastlines, mountains, and the spaces between. Every
              stitch is a promise to keep you moving.
            </p>
            <div className="mt-4">
              <Button variant="contained" component={Link} to="/stories">
                Read the Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products highlight */}
      <section className="container max-w-7xl mx-auto py-8 text-center">
        <h2 className="font-display text-3xl mb-4">Top Featured Products</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow flex flex-col text-left">
            <div className="flex gap-4 items-center">
              <ImageWithFallback
                src={allProducts[4]?.images?.[0] || allProducts[4]?.image}
                alt="Feature"
                className="w-36 h-36 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">{allProducts[4]?.name}</div>
                <ul className="mt-2 text-slate-600 text-sm list-disc pl-4">
                  <li>Dynamic sound</li>
                  <li>All-day battery</li>
                  <li>Travel-ready case</li>
                </ul>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-slate-900 font-semibold">
                    ${allProducts[4]?.price || 0}
                  </div>
                  <Button
                    variant="contained"
                    component={allProducts[4] ? Link : 'button'}
                    to={allProducts[4] ? `/product/${allProducts[4]._id || allProducts[4].id}` : undefined}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {featuredList.map((p) => (
            <Link
              to={`/product/${p._id || p.id}`}
              key={p._id || p.id}
              className="bg-white rounded-2xl p-6 shadow hover:-translate-y-1 transition block"
            >
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={p.images?.[0] || p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-slate-600 text-sm">
                    Premium build quality for daily travel
                  </div>
                </div>
                <div className="text-slate-900 font-semibold">${p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA and Newsletter remain as previously defined */}
      <section className="container max-w-7xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { title: "Save 30% Off", desc: "Limited-time seasonal sale" },
          { title: "Electronic Deals", desc: "Laptops, cameras, audio" },
          { title: "Sport Edition", desc: "Active gear for travel" },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-50 p-8 border border-slate-100"
          >
            <div className="font-display text-2xl">{c.title}</div>
            <div className="text-slate-600 mt-1">{c.desc}</div>
            <Button
              variant="outlined"
              component={Link}
              to={"/shop"}
              className="mt-4"
            >
              Shop Now
            </Button>
          </div>
        ))}
      </section>

      <section className="container max-w-7xl mx-auto py-16 text-center">
        <div className="rounded-2xl bg-slate-50 p-6 md:p-10">
          <h3 className="font-display text-2xl">Join the Expedition</h3>
          <p className="text-slate-600">
            Subscribe for stories, drops, and field-tested tips.
          </p>
          <form className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 max-w-2xl mx-auto">
            <TextField
              variant="outlined"
              placeholder="Your email"
              size="medium"
              fullWidth
            />
            <Button variant="contained">Subscribe</Button>
          </form>
          <div className="mt-4 text-slate-500">
            Follow us @nomadgear on social
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;