import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.get('http://localhost:5000/api/random-package');
      const { slug } = res.data;
      navigate(`/package/${slug}`);
    } catch (err) {
      console.error('Error fetching package:', err);
      setError('Failed to fetch a package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Explore Holiday Packages</h1>

      {/* Random Package Button */}
      <button onClick={handleClick} disabled={loading} style={{ margin: '1rem', padding: '1rem 2rem' }}>
        {loading ? 'Loading...' : 'Show Me a Package'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Static Image Button for Domestic */}
      <div style={{ marginTop: '3rem' }}>
        <a
          href="https://holidayz.makemytrip.com/holidays/india/search?packageIds=58865%2C60047%2C59723%2C58825%2C59726%2C59727%2C59729%2C55589%2C59769%2C59758%2C58825%2C59877%2C59888%2C60047%2C60064%2C60065%2C60117%2C60067%2C56901%2C26143%2C57407%2C60752%2C60755%2C60760%2C60762%2C60763%2C60764%2C60765%2C60766%2C55582%2C60223%2C60759%2C60761%2C60775%2C60776%2C60777%2C60774%2C60773%2C60771%2C60770%2C53164%2C60772&redirectionPage=listing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/phonixImages/beach.jpeg"
            alt="Domestic Holiday"
            style={{ width: '60%', borderRadius: '12px', cursor: 'pointer' }}
          />
        </a>
        <p>Click the image to explore Domestic Packages</p>
      </div>

      {/* Text Button for Kerala */}
      <div style={{ marginTop: '2rem' }}>
        <a
          href="https://holidayz.makemytrip.com/holidays/india/search?packageIds=59726%2C60764%2C60765%2C60766&dest=Kerala&redirectionPage=listing"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '1.2rem', color: 'blue', textDecoration: 'underline' }}
        >
          Explore Kerala Packages →
        </a>
      </div>
    </div>
  );
}

export default HomePage;
