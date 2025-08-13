import React from 'react';
import { Layout, Row, Col, Input, Badge, Menu } from 'antd';
import { SearchOutlined, UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styles from './Header.module.scss';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const menuItems = [
  { key: 'home', label: 'Home' },
  { key: 'products', label: 'All Products' },
  { key: 'deals', label: "Today's Deals" },
  { key: 'cards', label: 'Gift Cards' },
  { key: 'kits', label: 'Travel Kits' },
];

const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <Row align="middle" justify="space-between" style={{ height: '100%' }}>
        <Col>
          <div className={styles.logo}>Nomad Gear</div>
        </Col>
        
        <Col>
          <Menu
            className={styles.menu}
            mode="horizontal"
            items={menuItems}
            selectedKeys={['home']}
          />
        </Col>
        
        <Col>
          <div className={styles.searchContainer}>
            <Search
              className={styles.search}
              placeholder="Search for travel gear..."
              enterButton={<SearchOutlined />}
              size="large"
            />
          </div>
        </Col>
        
        <Col>
          <div className={styles.iconContainer}>
            <div className={styles.iconButton}>
              <UserOutlined />
            </div>
            <div className={styles.iconButton}>
              <Badge count={3} size="small">
                <HeartOutlined />
              </Badge>
            </div>
            <div className={styles.iconButton}>
              <Badge count={2} size="small">
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </div>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;