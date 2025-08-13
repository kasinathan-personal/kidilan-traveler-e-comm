import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './StyleSections.module.scss';

const { Title, Text } = Typography;

const styleSections = [
  {
    title: "Comfy Styles for Her",
    subtitle: "Shop women's fashion including clothing, shoes, jewelry, watches, bags and more that complement your adventurous spirit.",
    image: "https://images.unsplash.com/photo-1562262199-f6b3dfb3ec43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjBtb2RlbCUyMHRyYXZlbCUyMG91dGRvb3IlMjBjbG90aGluZ3xlbnwwfDF8fHwxNzU0OTMyNTM4fDA&ixlib=rb-4.1.0&q=85",
    alt: "Female adventure style - Ali Pazani on Unsplash",
    product: {
      name: "Adventure Sweater",
      price: "$49.99"
    },
    reverse: false
  },
  {
    title: "Comfy Styles for Him",
    subtitle: "Shop men's fashion including clothing, shoes, accessories, and gear designed for the modern adventurer.",
    image: "https://images.unsplash.com/photo-1597363598373-98cf99f08269?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxtYWxlJTIwbW9kZWwlMjB0cmF2ZWwlMjBvdXRkb29yJTIwY2xvdGhpbmd8ZW58MHwxfHx8MTc1NDkzMjUzOHww&ixlib=rb-4.1.0&q=85",
    alt: "Male adventure style - Adam McClean on Unsplash",
    product: {
      name: "Travel Jacket",
      price: "$89.99"
    },
    reverse: true
  }
];

const StyleSections = () => {
  return (
    <div className={styles.styleContainer}>
      {styleSections.map((section, index) => (
        <div className={styles.styleSection} key={index}>
          <div className={styles.contentWrapper}>
            <Row align="middle" gutter={[48, 32]}>
              <Col xs={24} lg={12} order={section.reverse ? 2 : 1}>
                <Title level={2} className={styles.sectionTitle}>{section.title}</Title>
                <Text className={styles.sectionSubtitle}>{section.subtitle}</Text>
                <Button className={styles.styledButton} type="primary" size="large" icon={<ArrowRightOutlined />}>
                  Shop Now
                </Button>
              </Col>
              <Col xs={24} lg={12} order={section.reverse ? 1 : 2}>
                <div className={styles.modelImage}>
                  <img
                    src={section.image}
                    alt={section.alt}
                    style={{ width: '100%', height: '400px' }}
                  />
                  <div className={styles.productHighlight}>
                    <div className={styles.productName}>{section.product.name}</div>
                    <div className={styles.productPrice}>{section.product.price}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyleSections;
