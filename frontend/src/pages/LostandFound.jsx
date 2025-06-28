import React, { useState, useRef } from 'react';

const App=() => {
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


  // Sample data for lost items
  const lostItems = [
    {
      id: 1,
      name: 'Blue Backpack',
      location: 'Library, 2nd Floor',
      status: 'Lost',
      date: 'June 25, 2025',
      type: 'Bag',
      description: 'Blue Jansport backpack with laptop and notebooks inside',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20high-quality%20image%20of%20a%20blue%20Jansport%20backpack%20sitting%20on%20a%20clean%20white%20surface%2C%20with%20soft%20natural%20lighting%20highlighting%20its%20texture%20and%20zippers.%20The%20background%20is%20minimalist%20and%20clean%20with%20subtle%20shadows.&width=400&height=300&seq=1&orientation=landscape'
    },
    {
      id: 2,
      name: 'iPhone 17 Pro',
      location: 'Cafeteria',
      status: 'Lost',
      date: 'June 26, 2025',
      type: 'Electronics',
      description: 'Black iPhone with green case, screen lock enabled',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20sleek%20black%20iPhone%20with%20a%20mint%20green%20protective%20case%20placed%20on%20a%20clean%20white%20surface.%20The%20phone%20is%20displayed%20at%20an%20angle%20with%20soft%20studio%20lighting%20creating%20gentle%20highlights%20on%20its%20edges%20and%20screen.&width=400&height=300&seq=2&orientation=landscape'
    },
    {
      id: 3,
      name: 'Car Keys',
      location: 'Parking Lot B',
      status: 'Lost',
      date: 'June 24, 2025',
      type: 'Keys',
      description: 'Toyota car keys with house key and small rabbit keychain',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20set%20of%20Toyota%20car%20keys%20with%20a%20house%20key%20and%20small%20decorative%20rabbit%20keychain%2C%20placed%20on%20a%20clean%20white%20surface.%20The%20keys%20are%20arranged%20neatly%20with%20soft%20natural%20lighting%20highlighting%20their%20metallic%20texture.&width=400&height=300&seq=3&orientation=landscape'
    },
    {
      id: 4,
      name: 'Prescription Glasses',
      location: 'Conference Room 103',
      status: 'Lost',
      date: 'June 23, 2025',
      type: 'Accessories',
      description: 'Black-rimmed prescription glasses in a red case',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20pair%20of%20stylish%20black-rimmed%20prescription%20glasses%20next%20to%20an%20open%20red%20glasses%20case%20on%20a%20clean%20white%20surface.%20The%20glasses%20are%20positioned%20at%20a%20slight%20angle%20with%20soft%20studio%20lighting%20creating%20subtle%20reflections%20on%20the%20lenses.&width=400&height=300&seq=4&orientation=landscape'
    },
    {
      id: 5,
      name: 'Water Bottle',
      location: 'Gym',
      status: 'Lost',
      date: 'June 22, 2025',
      type: 'Personal Item',
      description: 'Blue Hydro Flask with stickers, 32oz',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20blue%2032oz%20Hydro%20Flask%20water%20bottle%20decorated%20with%20various%20colorful%20stickers%2C%20standing%20upright%20on%20a%20clean%20white%20surface.%20The%20bottle%20is%20photographed%20with%20soft%20natural%20lighting%20that%20highlights%20its%20matte%20finish%20and%20vibrant%20sticker%20details.&width=400&height=300&seq=5&orientation=landscape'
    },
    {
      id: 6,
      name: 'Notebook',
      location: 'Study Hall',
      status: 'Lost',
      date: 'June 21, 2025',
      type: 'School Supply',
      description: 'Red spiral notebook with physics notes',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20red%20spiral-bound%20notebook%20with%20the%20cover%20slightly%20open%20revealing%20handwritten%20physics%20notes%20and%20diagrams.%20The%20notebook%20is%20placed%20on%20a%20clean%20white%20surface%20with%20soft%20natural%20lighting%20highlighting%20its%20vibrant%20color%20and%20texture.&width=400&height=300&seq=6&orientation=landscape'
    }
  ];

  // Sample data for found items
  const foundItems = [
    {
      id: 7,
      name: 'Silver Watch',
      location: 'Restroom, Main Hall',
      status: 'Found',
      date: 'June 26, 2025',
      type: 'Accessories',
      description: 'Silver analog watch with leather strap',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20elegant%20silver%20analog%20watch%20with%20a%20brown%20leather%20strap%20placed%20on%20a%20clean%20white%20surface.%20The%20watch%20face%20is%20clearly%20visible%20with%20soft%20studio%20lighting%20highlighting%20its%20metallic%20details%20and%20creating%20subtle%20shadows.&width=400&height=300&seq=7&orientation=landscape'
    },
    {
      id: 8,
      name: 'Student ID Card',
      location: 'Computer Lab',
      status: 'Found',
      date: 'June 25, 2025',
      type: 'ID',
      description: 'Student ID for Sarah Johnson',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20student%20identification%20card%20placed%20on%20a%20clean%20white%20surface.%20The%20card%20shows%20a%20professional%20photo%20ID%20with%20some%20text%20details%2C%20photographed%20with%20soft%20lighting%20that%20highlights%20its%20plastic%20texture%20without%20revealing%20personal%20information.&width=400&height=300&seq=8&orientation=landscape'
    },
    {
      id: 9,
      name: 'Umbrella',
      location: 'Lobby',
      status: 'Found',
      date: 'June 24, 2025',
      type: 'Accessories',
      description: 'Black folding umbrella with wooden handle',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20black%20folding%20umbrella%20with%20a%20distinctive%20wooden%20handle%20placed%20on%20a%20clean%20white%20surface.%20The%20umbrella%20is%20partially%20open%2C%20photographed%20with%20soft%20studio%20lighting%20that%20accentuates%20its%20fabric%20texture%20and%20wooden%20details.&width=400&height=300&seq=9&orientation=landscape'
    },
    {
      id: 10,
      name: 'Textbook',
      location: 'Classroom 201',
      status: 'Found',
      date: 'June 23, 2025',
      type: 'Book',
      description: 'Introduction to Psychology textbook, 4th edition',
      imageUrl: 'https://readdy.ai/api/search-image?query=An%20Introduction%20to%20Psychology%20textbook%20with%204th%20edition%20clearly%20visible%20on%20the%20cover%2C%20placed%20on%20a%20clean%20white%20surface.%20The%20textbook%20is%20photographed%20with%20soft%20natural%20lighting%20highlighting%20its%20glossy%20cover%20and%20educational%20design%20elements.&width=400&height=300&seq=10&orientation=landscape'
    },
    {
      id: 11,
      name: 'Wireless Earbuds',
      location: 'Fitness Center',
      status: 'Found',
      date: 'June 22, 2025',
      type: 'Electronics',
      description: 'White wireless earbuds in charging case',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20pair%20of%20white%20wireless%20earbuds%20in%20an%20open%20charging%20case%20placed%20on%20a%20clean%20white%20surface.%20The%20earbuds%20are%20photographed%20with%20soft%20studio%20lighting%20that%20highlights%20their%20sleek%20design%20and%20creates%20subtle%20shadows%20around%20the%20case.&width=400&height=300&seq=11&orientation=landscape'
    },
    {
      id: 12,
      name: 'Scarf',
      location: 'Auditorium',
      status: 'Claimed',
      date: 'June 21, 2025',
      type: 'Clothing',
      description: 'Blue and white patterned scarf',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20neatly%20folded%20blue%20and%20white%20patterned%20scarf%20with%20elegant%20design%20elements%2C%20placed%20on%20a%20clean%20white%20surface.%20The%20scarf%20is%20photographed%20with%20soft%20natural%20lighting%20that%20highlights%20its%20fabric%20texture%20and%20intricate%20pattern%20details.&width=400&height=300&seq=12&orientation=landscape'
    }
  ];

  const displayedItems = activeTab === 'lost' ? lostItems : foundItems;
  
  const filteredItems = displayedItems.filter(item => {
    const matchesLocation = locationFilter === 'all' || item.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesLocation && matchesType;
  });

  const locations = [...new Set([...lostItems, ...foundItems].map(item => item.location))];
  const types = [...new Set([...lostItems, ...foundItems].map(item => item.type))];

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
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'lost'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="fas fa-search mr-2"></i>
                  Lost Items
                </button>
                <button
                  onClick={() => setActiveTab('found')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'found'
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
                    {filteredItems.length} items
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
    :activeTab === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
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

 <form onSubmit={(e) => {
 e.preventDefault();
 console.log('Form submitted:', { ...formData, image: previewImage });
 setShowForm(false);
 }}>
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
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md ${getCardColor(item.status)}`}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.imageUrl}
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
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <button 
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          item.status === 'Claimed' 
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
