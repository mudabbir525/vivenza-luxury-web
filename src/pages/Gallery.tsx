import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://admin.webhostdevs.com/api";

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories first
      const categoriesResponse = await fetch(`${BASE_URL}/categories.php`);
      const categoriesData = await categoriesResponse.json();

      if (!categoriesData.success) {
        throw new Error(categoriesData.message || 'Failed to fetch categories');
      }

      // Fetch gallery items
      const galleryResponse = await fetch(`${BASE_URL}/gallery.php?limit=100`);
      const galleryData = await galleryResponse.json();

      if (!galleryData.success) {
        throw new Error(galleryData.message || 'Failed to fetch gallery items');
      }

      // Group gallery items by category
      const groupedData = categoriesData.data
        .filter(category => category.is_active === 1)
        .map(category => {
          const categoryImages = galleryData.data.items
            .filter(item => item.category_id === category.id && item.is_active === 1)
            .map(item => ({
              id: item.id,
              title: item.title,
              imageName: item.image_name,
              path: item.path,
              altText: item.alt_text || item.title,
              // Construct full image URL
              imageUrl: `https://admin.webhostdevs.com/${item.path}`
            }));

          return {
            category: category.name,
            categorySlug: category.slug,
            categoryId: category.id,
            images: categoryImages
          };
        })
        .filter(section => section.images.length > 0); // Only include categories with images

      setGalleryData(groupedData);
    } catch (err) {
      console.error('Error fetching gallery data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow mt-12 bg-vivenza-offWhite">
          <div className="luxury-container mt-4 py-20">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vivenza-gold mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Loading gallery...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow mt-12 bg-vivenza-offWhite">
          <div className="luxury-container mt-4 py-20">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-lg text-red-600 mb-4">Error loading gallery</p>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={fetchGalleryData}
                  className="bg-vivenza-gold text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-12 bg-vivenza-offWhite pt-10">
        <div className="luxury-container mt-4 py-20">
          <h1 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Gallery
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>
          
          {galleryData.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No gallery items found.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {galleryData.map((section) => (
                <div key={section.categoryId}>
                  <h2 className="font-display text-3xl mb-8">{section.category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.images.map((image) => (
                      <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-lg shadow-lg"
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.altText}
                          title={image.title}
                          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                          // onError={(e) => {
                          //   // Fallback for broken images
                          //   e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MlYxMzhIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MlYxMzhIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MlYxMzhIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                          //   e.target.alt = 'Image not available';
                          // }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="font-semibold text-2xl mb-1">{image.imageName}</h3>
                            {/* <p className="text-sm">{image.imageName}</p> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Gallery;