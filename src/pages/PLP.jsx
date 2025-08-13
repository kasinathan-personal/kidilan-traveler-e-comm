import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { products as allProducts } from "@/data/products";
import ImageWithFallback from "@/components/ImageWithFallback";

// Filter and Close icons (you can replace with actual icons from your icon library)
const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const images = product.images || [];
  const hasMultiple = images.length > 1;
  const [imageIndex, setImageIndex] = React.useState(0);
  const intervalRef = React.useRef(null);

  const startSlideshow = () => {
    if (!hasMultiple || intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 1200);
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setImageIndex(0);
  };

  React.useEffect(() => () => stopSlideshow(), []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl p-4 shadow-lg text-center w-full border border-white/50 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-xl"
          onMouseEnter={startSlideshow}
          onMouseLeave={stopSlideshow}
        >
          <ImageWithFallback
            src={images[imageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500"
          />
          {hasMultiple && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={
                    (idx === imageIndex ? "bg-white" : "bg-white/60") +
                    " w-1.5 h-1.5 rounded-full"
                  }
                />
              ))}
            </div>
          )}
          <button className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full px-3 py-1 text-xs">
            Quick View
          </button>
        </div>
        <div className="mt-3">
          <div className="text-slate-700 text-sm">{product.name}</div>
          <div className="text-slate-900 font-semibold">${product.price}</div>
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
            className="mt-1"
          />
        </div>
      </Link>
    </motion.div>
  );
};

const PLP = () => {
  const [query, setQuery] = React.useState("");
  const maxPrice = Math.max(...allProducts.map((p) => p.price));
  const [price, setPrice] = React.useState([0, maxPrice]);
  const [minRating, setMinRating] = React.useState(0);
  const [selectedCategories, setSelectedCategories] = React.useState(
    new Set(allProducts.map((p) => p.category))
  );
  const [page, setPage] = React.useState(1);
  const [showFilters, setShowFilters] = React.useState(false);
  const pageSize = 12;

  const filtered = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      p.price >= price[0] &&
      p.price <= price[1] &&
      p.rating >= minRating &&
      selectedCategories.has(p.category)
  );

  React.useEffect(() => {
    setPage(1);
  }, [query, price, minRating, selectedCategories]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Count active filters
  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (query) count++;
    if (price[0] > 0 || price[1] < maxPrice) count++;
    if (minRating > 0) count++;
    if (selectedCategories.size < allProducts.length) count++;
    return count;
  }, [query, price, minRating, selectedCategories, maxPrice]);

  // Close filters when clicking outside on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilters(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const FilterContent = () => (
    <div className="bg-white rounded-2xl p-4 h-max shadow">
      <div className="font-display text-xl mb-4 flex items-center justify-between">
        <span>
          Filters
          <span className="text-slate-600 text-sm">
            {" "}
            ({filtered.length} results)
          </span>
        </span>
        {/* Close button for mobile */}
        <IconButton
          className="lg:hidden"
          onClick={() => setShowFilters(false)}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        fullWidth
        size="small"
        className="mb-5"
      />

      <div className="mb-6">
        <div className="text-slate-600 mt-2">Price Range</div>
        <Slider
          value={price}
          onChange={(_, v) => setPrice(v)}
          min={0}
          max={maxPrice}
          valueLabelDisplay="auto"
        />
      </div>

      <div className="mb-6">
        <div className="text-slate-600 mb-2">Category</div>
        {[...new Set(allProducts.map((p) => p.category))].map((c) => (
          <FormControlLabel
            key={c}
            control={
              <Checkbox
                checked={selectedCategories.has(c)}
                onChange={(e) => {
                  const newCategories = new Set(selectedCategories);
                  if (e.target.checked) {
                    newCategories.add(c);
                  } else {
                    newCategories.delete(c);
                  }
                  setSelectedCategories(newCategories);
                }}
              />
            }
            label={c}
          />
        ))}
      </div>

      <div>
        <div className="text-slate-600 mb-2">Rating</div>
        <Rating
          value={minRating}
          onChange={(_, v) => setMinRating(v)}
          precision={0.5}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Badge badgeContent={activeFiltersCount} color="primary">
          <IconButton
            onClick={() => setShowFilters(true)}
            className="bg-blue-600 text-white shadow-lg hover:bg-blue-700"
            size="large"
          >
            <FilterIcon />
          </IconButton>
        </Badge>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="w-80 max-w-[80vw] h-full bg-white overflow-y-auto pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <FilterContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container max-w-7xl mx-auto py-5 grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-2">
        {/* Desktop Filters */}
        <aside className="hidden lg:block sticky top-24">
          <FilterContent />
        </aside>

        {/* Mobile Results Header */}
        <div className="lg:hidden px-4 mb-4">
          <div className="text-slate-600 text-sm">
            {filtered.length} results
          </div>
        </div>

        <main className="text-center px-4 lg:px-0">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="text-slate-600 text-lg">
                No products found. Try adjusting your filters.
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                <AnimatePresence>
                  {paged.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-8 flex justify-center  lg:pb-8">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, v) => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setPage(v);
                  }}
                  color="primary"
                  shape="rounded"
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default PLP;
