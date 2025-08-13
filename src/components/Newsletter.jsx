import React, { useState } from 'react';
import { Row, Col, Typography, Input, Button, message } from 'antd';
import { MailOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './Newsletter.module.scss';

const { Title, Text } = Typography;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      message.warning('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      message.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.iconContainer}>
          <MailOutlined />
        </div>

        <Title level={1} className={styles.newsletterTitle}>
          SUBSCRIBE TO THE JOURNEY
        </Title>

        <Text className={styles.newsletterSubtitle}>
          Get exclusive travel deals and adventure inspiration. Don't miss our
          weekly newsletter with the latest gear reviews and destination guides.
        </Text>

        <div className={styles.emailForm}>
          <Input
            className={styles.styledInput}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onPressEnter={handleSubscribe}
            prefix={<MailOutlined style={{ color: '#999999' }} />}
          />
          <Button
            className={styles.subscribeButton}
            type="primary"
            loading={loading}
            onClick={handleSubscribe}
            icon={<ArrowRightOutlined />}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
