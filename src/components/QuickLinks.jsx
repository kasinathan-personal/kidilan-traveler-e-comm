import React from 'react';
import { Row, Col, Card } from 'antd';
import { HistoryOutlined, CompassOutlined, HomeOutlined, ShoppingOutlined } from '@ant-design/icons';
import styles from './QuickLinks.module.scss';

const quickLinksData = [
  {
    icon: <HistoryOutlined />,
    title: "Order History",
    subtitle: "Track your orders"
  },
  {
    icon: <CompassOutlined />,
    title: "Travel Accessories",
    subtitle: "Essential gear"
  },
  {
    icon: <HomeOutlined />,
    title: "Camping Gear",
    subtitle: "Outdoor equipment"
  },
  {
    icon: <ShoppingOutlined />,
    title: "Luggage & Bags",
    subtitle: "Travel storage"
  }
];

const QuickLinks = () => {
  return (
    <div className={styles.quickLinksContainer}>
      <Row gutter={[16, 16]}>
        {quickLinksData.map((link, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card hoverable className={styles.styledCard}>
              <div className={styles.iconContainer}>
                {link.icon}
              </div>
              <div className={styles.linkTitle}>{link.title}</div>
              <div className={styles.linkSubtitle}>{link.subtitle}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuickLinks;
