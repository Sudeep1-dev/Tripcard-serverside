import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PackagePage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/package/${slug}`)
      .then((res) => {
        setPkg(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Package not found or server error.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading package...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>{pkg.title}</h1>
      <img 
        src={pkg.image || 'https://via.placeholder.com/800x400'} 
        alt={pkg.title} 
        style={{ width: '100%', borderRadius: '10px', marginBottom: '1rem' }} 
      />
      <p>{pkg.description}</p>
      <p><strong>Price:</strong> ₹{pkg.price.toLocaleString()}</p>

      {/* Demo "deeplink" action */}
      <a
        href={`/book-now/${pkg.slug}`}
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Book Now
      </a>
    </div>
  );
}

export default PackagePage;
