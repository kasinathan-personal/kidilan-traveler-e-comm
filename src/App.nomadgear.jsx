// Legacy landing composition using Ant Design. This file is no longer used as entry. See App.jsx for the new MUI/Tailwind app.
import React, { useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import QuickLinks from './components/QuickLinks';
import CategoryGrid from './components/CategoryGrid';
import PromoBanner from './components/PromoBanner';
import ProductGrid from './components/ProductGrid';
import StyleSections from './components/StyleSections';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import theme from './theme/config';

const { Content } = Layout;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh', background: '#f9f9f9' }}>
        <Header />
        <Content>
          <HeroSection />
          <QuickLinks />
          <CategoryGrid />
          <PromoBanner />
          <ProductGrid title="Just Viewed" />
          <ProductGrid title="Best Sellers" />
          <StyleSections />
          <ProductGrid title="Trends this must have for you" />
          <Newsletter />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default App;