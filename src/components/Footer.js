import React from 'react';

function Footer() {
  return (
    <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#f0f0f0', padding: '10px 0', textAlign: 'center' }}>
      <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()}, Apurv Sonawane</p>
    </footer>
  );
}

export default Footer;
