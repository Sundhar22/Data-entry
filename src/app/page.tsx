import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import React from 'react';



export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafbfc'
    }}>
      <Header />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 style={{ color: '#333', fontWeight: 400 }}>Welcome to the Data Entry App</h2>
      </main>
      <Footer />
    </div>
  );
}