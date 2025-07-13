import React from 'react';

const Footer: React.FC = () => (
    <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem', color: '#888' }}>
        © {new Date().getFullYear()} My Projects
    </footer>
);

export default Footer;