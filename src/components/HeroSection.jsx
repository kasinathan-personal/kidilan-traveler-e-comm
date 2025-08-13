import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Badge, Rate } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './HeroSection.module.scss';

const { Title, Text } = Typography;

const heroProducts = [
  {
    title: "PREMIUM HIKING BACKPACK",
    subtitle: "Ultra-lightweight design with advanced weather protection. Perfect for multi-day adventures with 65L capacity and ergonomic support system.",
    currentPrice: "$125.00",
    originalPrice: "$180.00",
    discount: "30% OFF",
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1635745488837-ffa006eaf9cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGhpa2luZyUyMG91dGRvb3IlMjBtb3VudGFpbnxlbnwwfDB8fHwxNzU0OTMyNTM1fDA&ixlib=rb-4.1.0&q=85",
    alt: "Premium hiking backpack - Colby Winfield on Unsplash"
  },
  {
    title: "ADVENTURE TRAVEL JACKET",
    subtitle: "Waterproof and breathable jacket designed for extreme weather conditions. Features multiple pockets and adjustable ventilation.",
    currentPrice: "$89.99",
    originalPrice: "$129.99",
    discount: "31% OFF",
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1597363598373-98cf99f08269?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxtYWxlJTIwbW9kZWwlMjB0cmF2ZWwlMjBvdXRkb29yJTIwY2xvdGhpbmd8ZW58MHwxfHx8MTc1NDkzMjUzOHww&ixlib=rb-4.1.0&q=85",
    alt: "Adventure travel jacket - Adam McClean on Unsplash"
  },
  {
    title: "PORTABLE CAMPING STOVE",
    subtitle: "Compact and efficient camping stove with wind-resistant design. Perfect for outdoor cooking with easy setup and cleanup.",
    currentPrice: "$45.99",
    originalPrice: "$65.99",
    discount: "30% OFF",
    rating: 4.7,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1557467980-f494e6992722?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHxjYW1waW5nJTIwc3RvdmUlMjBjb29raW5nJTIwcG9ydGFibGUlMjBvdXRkb29yfGVufDB8Mnx8fDE3NTQ5MzI1Mzd8MA&ixlib=rb-4.1.0&q=85",
    alt: "Portable camping stove - Shaqyl Shamsudheen on Unsplash"
  }
];

const HeroSection = () => {
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % heroProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const product = heroProducts[currentProduct];

  return (
    <div className={styles.heroContainer}>
      <div className={styles.contentContainer}>
        <Row align="middle" gutter={[48, 32]}>
          <Col xs={24} lg={12}>
            <Badge className={styles.discountBadge} count={product.discount} />
            <Title className={styles.heroTitle} level={1}>{product.title}</Title>
            <Text className={styles.heroSubtitle}>{product.subtitle}</Text>
            
            <div className={styles.ratingContainer}>
              <Rate disabled defaultValue={product.rating} allowHalf />
              <Text style={{ color: '#666666' }}>
                {product.rating} ({product.reviews} reviews)
              </Text>
            </div>
            
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>{product.currentPrice}</span>
              <span className={styles.originalPrice}>{product.originalPrice}</span>
            </div>
            
            <Button 
              className={styles.styledButton}
              type="primary" 
              size="large" 
              icon={<ArrowRightOutlined />}
            >
              View More
            </Button>
          </Col>
          
          <Col xs={24} lg={12}>
            <div className={styles.productImage}>
              <img 
                src={product.image} 
                alt={product.alt}
                style={{ width: '100%', height: '400px' }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSection;