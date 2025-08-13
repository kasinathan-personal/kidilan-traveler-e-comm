// Modern travel-themed design tokens for Nomad Gear e-commerce
const config = {
  token: {
    // Primary color palette - travel inspired
    colorPrimary: '#70c1c1', // Teal - ocean/sky
    colorSuccess: '#dbc4a2', // Sand - earth/beach
    colorWarning: '#e0aa84', // Warm orange - sunset/adventure
    
    // Background colors
    colorBgBase: '#f9f9f9', // Clean white
    colorBgContainer: '#f0f2f4', // Light gray surface
    
    // Typography
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontSizeLG: 16,
    fontSizeSM: 12,
    
    // Border radius for modern look
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    
    // Shadows for glassmorphism effect
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    boxShadowSecondary: '0 2px 8px rgba(0, 0, 0, 0.06)',
    
    // Text colors
    colorTextBase: '#333333',
    colorTextSecondary: '#666666',
    colorTextTertiary: '#999999',
  },
  components: {
    Button: {
      borderRadius: 12,
      fontWeight: 500,
      paddingBlock: 12,
      paddingInline: 24,
    },
    Card: {
      borderRadius: 16,
      bodyPadding: 24,
      headerPadding: 20,
    },
    Input: {
      borderRadius: 12,
      paddingBlock: 12,
      paddingInline: 16,
    },
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 0,
    },
  },
};

export default config;