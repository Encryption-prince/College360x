import React from 'react';

const images = [
    // Add your image URLs here
    'https://source.unsplash.com/random/400x300?sig=1',
    'https://source.unsplash.com/random/400x300?sig=2',
    'https://source.unsplash.com/random/400x300?sig=3',
    'https://source.unsplash.com/random/400x300?sig=4',
    'https://source.unsplash.com/random/400x300?sig=5',
    'https://source.unsplash.com/random/400x300?sig=6',
];

const Gallery = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Gallery</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                {images.map((src, idx) => (
                    <div key={idx} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#fafafa'
                    }}>
                        <img
                            src={src}
                            alt={`Gallery ${idx + 1}`}
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;