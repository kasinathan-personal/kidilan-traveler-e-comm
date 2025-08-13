import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import styles from './CategoryGrid.module.scss';

import { products } from '../data/products';

const { Title } = Typography;

// Extract unique categories and their first product's image/description
const categoryMap = {};
products.forEach(product => {
  if (!categoryMap[product.category]) {
    categoryMap[product.category] = {
      name: product.category,
      image: product.images && product.images[0],
      description: product.description,
    };
  }
});
const categoriesData = Object.values(categoryMap);

const CategoryGrid = () => {
  return (
    <div className={styles.categoryContainer}>
      <Title level={2} className={styles.sectionTitle}>Shop by Categories</Title>
      <Row gutter={[24, 24]}>
        {categoriesData.map((category, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: '100%', height: '280px' }}
                />
                <div className={styles.categoryOverlay}>
                  <div className={styles.categoryTitle}>{category.name}</div>
                  <div className={styles.categoryDescription}>{category.description}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryGrid;
