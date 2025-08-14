import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/slices/uiSlice";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiService } from "@/services/api";
import { useApi, useAsyncApi } from "@/hooks/useApi";
import ImageWithFallback from "@/components/ImageWithFallback";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import NotFound from "./NotFound";

const PDP = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.ui.wishlist);
  const [tab, setTab] = React.useState(0);
  const [activeImage, setActiveImage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [imageErrorMap, setImageErrorMap] = React.useState({});

  // Fetch product and reviews
  const { data: product, loading: productLoading, error: productError, retry: retryProduct } = useApi(() => apiService.getProduct(id), [id]);
  const { data: reviews, loading: reviewsLoading, error: reviewsError } = useApi(() => apiService.getProductReviews(id), [id]);
  const { data: relatedProducts } = useApi(() => 
    product ? apiService.getProducts({ categoryId: product.categoryId, limit: 8 }) : Promise.resolve({ products: [] }), 
    [product?.categoryId]
  );

  const isWishlisted = product && wishlist.includes(product._id);
  const related = relatedProducts?.products?.filter(p => p._id !== product?._id) || [];

  React.useEffect(() => {
    setActiveImage(0);
    setTab(0);
    setImageErrorMap({});
  }, [id]);

  // Show loading state
  if (productLoading) {
    return <LoadingSpinner fullScreen message="Loading product..." />;
  }

  // Show error state
  if (productError) {
    if (productError.status === 404) {
      return <NotFound />;
    }
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <ErrorMessage error={productError} onRetry={retryProduct} />
        </div>
      </div>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  const toggleWishlist = () => {
    if (isWishlisted) dispatch(removeFromWishlist(product._id));
    else dispatch(addToWishlist(product._id));
  };

  const handleMainImageClick = () => {
    if (!imageErrorMap[activeImage]) {
      setIsModalOpen(true);
    }
  };

  const markImageError = (index) => () =>
    setImageErrorMap((m) => ({ ...m, [index]: true }));

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="container max-w-6xl mx-auto py-4 sm:py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Gallery */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div
              className={`relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow ${
                imageErrorMap[activeImage] ? "cursor-default" : "cursor-zoom-in"
              }`}
              onClick={handleMainImageClick}
            >
              <ImageWithFallback
                src={product.images?.[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onImageError={markImageError(activeImage)}
              />
            </div>
            
            {/* Thumbnail grid - responsive */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 w-full max-w-md lg:max-w-none">
              {product.images?.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i 
                      ? "border-slate-900 ring-2 ring-slate-900/20 scale-95" 
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <ImageWithFallback
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                    onImageError={markImageError(i)}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24 h-max text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Header with wishlist button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-3 sm:gap-4">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>
              <Button
                onClick={toggleWishlist}
                startIcon={
                  isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
                color={isWishlisted ? "error" : "inherit"}
                size="small"
                className="shrink-0"
              >
                <span className="hidden sm:inline">
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </span>
                <span className="sm:hidden">
                  {isWishlisted ? "♥" : "♡"}
                </span>
              </Button>
            </div>

            {/* Rating and reviews */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <Rating value={product.rating || 4.5} precision={0.5} readOnly size="small" />
              <span className="text-slate-500 text-sm">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-slate-900 text-xl sm:text-2xl font-semibold">
              ${product.price}
            </div>

            {/* Description */}
            <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
              Premium materials and thoughtful organization for all-day comfort.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className="sm:w-auto"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0],
                    })
                  )
                }
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                className="sm:w-auto"
                onClick={toggleWishlist}
              >
                {isWishlisted ? "Remove" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Inline details/specs/reviews */}
            <div className="mt-6 sm:mt-8">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow text-slate-700 space-y-4 sm:space-y-6 max-w-2xl mx-auto lg:mx-0">
                <div>
                  <h2 className="font-display text-lg sm:text-xl mb-2">Details</h2>
                  <p className="text-sm sm:text-base">
                    Designed with weatherproof fabrics, ergonomic support, and
                    modular storage.
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl mb-2">Specifications</h2>
                  <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                    <li>45L capacity</li>
                    <li>900D nylon</li>
                    <li>YKK zips</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl mb-2">Customer Reviews</h2>
                  <div className="text-slate-600 text-sm sm:text-base">Reviews coming soon.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related?.length > 0 && (
        <section className="container max-w-6xl mx-auto py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-xl sm:text-2xl mb-4 sm:mb-6">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 justify-items-center">
            {related.map((p) => (
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow hover:-translate-y-1 transition text-center w-full max-w-48"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl">
                  <ImageWithFallback
                    src={p.images?.[0]}
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                {p.name && (
                  <div className="mt-2 sm:mt-3">
                    <div className="text-slate-700 text-xs sm:text-sm line-clamp-2">
                      {p.name}
                    </div>
                    <div className="text-slate-900 font-semibold text-sm sm:text-base">
                      ${p.price}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen image modal (improved and responsive) */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        maxWidth="lg"
        className="lg:p-4"
        PaperProps={{
          className: "m-2 sm:m-4 lg:m-8 max-h-[95vh] lg:max-h-[90vh]"
        }}
      >
        <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Close button - improved positioning and styling */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
            <IconButton
              onClick={() => setIsModalOpen(false)}
              className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
              size="small"
            >
              <CloseIcon className="text-slate-700" />
            </IconButton>
          </div>
          
          {/* Main image container */}
          <div className="relative bg-slate-50">
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
            <ImageWithFallback
              src={product.images?.[activeImage]}
              alt={`Full ${product.name}`}
              className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] lg:max-h-[75vh] object-contain"
            />
          </div>
          
          {/* Thumbnail navigation - responsive */}
          <div className="p-3 sm:p-4 bg-white/95 backdrop-blur sticky bottom-0 border-t border-slate-100">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 max-w-2xl mx-auto">
              {product.images?.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-12 sm:h-14 md:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i
                      ? "border-slate-900 ring-2 ring-slate-900/20 scale-95"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <ImageWithFallback
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PDP;