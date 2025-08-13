import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import styles from './Footer.module.scss';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const footerSections = [
  {
    title: "Get to Know Us",
    links: [
      "Careers",
      "Blog",
      "About Nomad Gear",
      "Investor Relations",
      "Nomad Gear Devices",
      "Nomad Gear Science"
    ]
  },
  {
    title: "Make Money with Us",
    links: [
      "Sell products on Nomad Gear",
      "Sell on Nomad Gear Business",
      "Sell apps on Nomad Gear",
      "Become an Affiliate",
      "Advertise Your Products",
      "Self-Publish with Us"
    ]
  },
  {
    title: "Nomad Gear Payment Products",
    links: [
      "Nomad Gear Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Nomad Gear Currency Converter"
    ]
  },
  {
    title: "Let Us Help You",
    links: [
      "Nomad Gear and COVID-19",
      "Your Account",
      "Your Orders",
      "Shipping Rates & Policies",
      "Returns & Replacements",
      "Manage Your Content and Devices"
    ]
  }
];

const Footer = () => {
  return (
    <AntFooter className={styles.styledFooter}>
      <div className={styles.footerContent}>
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={6}>
            <div className={styles.footerLogo}>Nomad Gear</div>
            <Text className={styles.footerDescription}>
              Your trusted companion for every adventure. From hiking trails to city streets,
              we provide quality gear that empowers your journey.
            </Text>
            <div className={styles.socialIcons}>
              <div className={styles.socialIcon}>
                <FacebookOutlined />
              </div>
              <div className={styles.socialIcon}>
                <TwitterOutlined />
              </div>
              <div className={styles.socialIcon}>
                <InstagramOutlined />
              </div>
              <div className={styles.socialIcon}>
                <YoutubeOutlined />
              </div>
            </div>
          </Col>

          {footerSections.map((section, index) => (
            <Col xs={12} sm={6} lg={4} key={index}>
              <Title level={4} className={styles.sectionTitle}>{section.title}</Title>
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex}>
                  <Link href="#" className={styles.footerLink}>{link}</Link>
                </div>
              ))}
            </Col>
          ))}
        </Row>

        <div className={styles.copyright}>
          <Row align="middle" justify="space-between">
            <Col>
              © 2024 Nomad Gear. All rights reserved.
            </Col>
            <Col>
              <GlobalOutlined style={{ marginRight: 8 }} />
              Shipping worldwide
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
