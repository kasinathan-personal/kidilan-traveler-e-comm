import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Rate } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './ProductGrid.module.scss';
import { products } from '../data/products';

const { Title, Text } = Typography;

const productsData = products.map(product => ({
  id: product.id,
  title: product.name,
  currentPrice: `$${product.price}`,
  originalPrice: `$${Math.round(product.price * 1.2)}`,
  discount: '20%',
  rating: product.rating,
  reviews: Math.floor(product.rating * 50),
  image: product.images && product.images[0],
  alt: product.name,
}));
// ...existing code...

const ProductGrid = ({ title = "Best Sellers" }) => {
  const [wishlist, setWishlist] = useState(new Set());

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  return (
    <div className={styles.productSection}>
      <Title level={2} className={styles.sectionTitle}>{title}</Title>
      <Row gutter={[24, 24]}>
        {productsData.map((product) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
            <Card hoverable className={styles.productCard}>
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={product.alt}
                  style={{ width: '100%', height: '200px' }}
                />
                <div className={styles.discountBadge}>{product.discount} OFF</div>
                <div className={styles.wishlistIcon} onClick={() => toggleWishlist(product.id)}>
                  <HeartOutlined
                    style={{
                      color: wishlist.has(product.id) ? '#e0aa84' : '#666666'
                    }}
                  />
                </div>
                <div className={styles.productOverlay}>
                  <Button
                    className={styles.addToCartButton}
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className={styles.productTitle}>{product.title}</div>

              <Rate disabled defaultValue={product.rating} allowHalf size="small" />
              <Text style={{ marginLeft: 8, fontSize: 12, color: '#666666' }}>
                ({product.reviews})
              </Text>

              <div className={styles.productPrice}>
                <span className={styles.currentPrice}>{product.currentPrice}</span>
                <span className={styles.originalPrice}>{product.originalPrice}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;
