import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('lost');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    lastSeenLocation: '',
    description: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Backend integration state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch all items from backend
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/lost-found')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch items');
        return res.json();
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtered items by tab and filters
  const displayedItems = items.filter(item => {
    const status = item.status?.toLowerCase();
    if (activeTab === 'lost' && status !== 'lost') return false;
    if (activeTab === 'found' && status !== 'found' && status !== 'claimed') return false;
    const matchesLocation = locationFilter === 'all' || (item.location || '').toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || (item.type || '').toLowerCase() === typeFilter.toLowerCase();
    return matchesLocation && matchesType;
  });

  // Unique locations and types for filters
  const locations = [...new Set(items.map(item => item.location))];
  const types = [...new Set(items.map(item => item.type || ''))];

  const getStatusColor = status => {
    switch (status) {
      case 'Lost':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Found':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Claimed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCardColor = status => {
    switch (status) {
      case 'Lost':
        return 'bg-orange-50';
      case 'Found':
        return 'bg-purple-50';
      case 'Claimed':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  // Submit handler for new lost/found item
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    // Compose payload for backend
    const payload = {
      itemName: formData.itemName,
      location: formData.lastSeenLocation,
      description: formData.description,
      photoUrl: '', // Not implemented
      reportedDate: new Date().toISOString().slice(0, 10),
      status: activeTab === 'lost' ? 'LOST' : 'FOUND',
      reporterContact: '', // Not implemented
      createdAt: new Date().toISOString(),
      type: '', // Not implemented
    };
    try {
      const res = await fetch('https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/lost-found', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Item reported successfully!' });
        setShowForm(false);
        setFormData({ itemName: '', lastSeenLocation: '', description: '' });
        setPreviewImage(null);
        // Refresh items
        fetch('https://careful-vikky-koyebdeployacc1-6fac48b5.koyeb.app/api/lost-found')
          .then(res => res.json())
          .then(data => setItems(Array.isArray(data) ? data : []));
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to report item.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error: ' + err.message });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button className="text-gray-500 md:hidden cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="ml-4 md:ml-0">
              <h1 className="text-2xl font-semibold text-gray-800">Lost and Found</h1>
              <p className="text-sm text-gray-600">Post or claim belongings</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer">
              <i className="fas fa-bell"></i>
            </button>
            <button className="p-2 ml-2 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer">
              <i className="fas fa-question-circle"></i>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('lost')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'lost'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <i className="fas fa-search mr-2"></i>
                  Lost Items
                </button>
                <button
                  onClick={() => setActiveTab('found')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'found'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <i className="fas fa-hand-holding mr-2"></i>
                  Found Items
                </button>
              </nav>
            </div>

            {/* Filters */}
            <div className="mb-6 bg-white rounded-lg shadow p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <h2 className="text-lg font-medium text-gray-900">
                    {activeTab === 'lost' ? 'Lost Items' : 'Found Items'}
                  </h2>
                  <span className="ml-2 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {displayedItems.length} items
                  </span>
                </div>
                <div className="flex items-center w-full md:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-filter mr-2"></i>
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {showForm
                      ? 'Close Form'
                      : activeTab === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
                  </button>


                </div>
              </div>

              {showFilters && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="mt-1 relative">
                      <select
                        id="location"
                        name="location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="all">All Locations</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Item Type
                    </label>
                    <div className="mt-1 relative">
                      <select
                        id="type"
                        name="type"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="all">All Types</option>
                        {types.map((type, index) => (
                          <option key={index} value={type.toLowerCase()}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {showForm && (
                <div className="w-full flex justify-center">
                  <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      {activeTab === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
                    </h2>

                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                          {activeTab === 'lost' ? 'Item Name (Lost)' : 'Item Name (Found)'}
                        </label>
                        <input
                          type="text"
                          name="itemName"
                          value={formData.itemName}
                          onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                          className="w-full h-10 px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={activeTab === 'lost' ? 'What did you lose?' : 'What item did you find?'}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                          {activeTab === 'lost' ? 'Last Seen Location' : 'Found Location'}
                        </label>
                        <input
                          type="text"
                          name="lastSeenLocation"
                          value={formData.lastSeenLocation}
                          onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })}
                          className="w-full h-10 px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={activeTab === 'lost' ? 'Where did you last see it?' : 'Where did you find it?'}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full h-[100px] px-3 py-2 border rounded-lg resize-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={activeTab === 'lost'
                            ? 'Describe your lost item in detail...'
                            : 'Describe the found item clearly...'}
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm text-gray-600 mb-1">Upload Photo</label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                        >
                          {previewImage ? (
                            <>
                              <img src={previewImage} alt="Preview" className="max-h-40 mx-auto rounded" />
                              <p className="text-sm text-gray-500 mt-2">Click to change image</p>
                            </>
                          ) : (
                            <>
                              <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                              <p className="text-sm text-gray-500">Click to upload an image</p>
                              <p className="text-xs text-gray-400">JPG, PNG or GIF (Max 5MB)</p>
                            </>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPreviewImage(reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-11 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                      >
                        Submit Report
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>

            {/* Items Grid */}
            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md ${getCardColor(item.status)}`}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.photoUrl || item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-calendar-day mr-2 text-gray-400"></i>
                          <span>{item.reportedDate}</span>
                        </div>
                      </div>
                      <button
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${item.status === 'Claimed'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : item.status === 'Lost'
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                          } cursor-pointer !rounded-button whitespace-nowrap`}
                        disabled={item.status === 'Claimed'}
                      >
                        {item.status === 'Claimed' ? 'Already Claimed' : item.status === 'Lost' ? 'View Details' : 'Claim Item'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <i className="fas fa-search text-3xl"></i>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setLocationFilter('all');
                      setTypeFilter('all');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
