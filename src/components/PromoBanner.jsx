import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { GlobalOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './PromoBanner.module.scss';

const { Title, Text } = Typography;

const PromoBanner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.contentWrapper}>
        <Row align="middle" gutter={[48, 32]}>
          <Col xs={24} lg={16}>
            <Title level={1} className={styles.bannerTitle}>WE SHIP WORLDWIDE</Title>
            <Text className={styles.bannerSubtitle}>
              Free delivery on orders over $50 and express shipping to 190+ countries.
              Your adventure gear delivered anywhere, anytime.
            </Text>
            <Button className={styles.styledButton} type="primary" size="large" icon={<ArrowRightOutlined />}>
              Learn More
            </Button>
          </Col>
          <Col xs={24} lg={8}>
            <div className={styles.iconContainer}>
              <GlobalOutlined />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PromoBanner;
