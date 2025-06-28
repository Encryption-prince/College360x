import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full mx-4 bg-white rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};


const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const [uploadSelectedPhoto, setUploadSelectedPhoto] = useState(null);
  const [uploadIsEditMode, setUploadIsEditMode] = useState(false);
  const [uploadEditedCaption, setUploadEditedCaption] = useState('');


  const filters = ['All', 'Fests', 'Cultural', 'Sports'];

  const albums = [
    {
      id: 1,
      name: 'TechFest 2024',
      photoCount: 42,
      category: 'Fests',
      color: 'bg-sky-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20vibrant%20college%20tech%20fest%20event%20with%20students%20showcasing%20innovative%20projects%2C%20colorful%20booths%2C%20and%20interactive%20displays.%20The%20atmosphere%20is%20energetic%20with%20modern%20technology%20demonstrations%20and%20enthusiastic%20participants.%20Soft%20pastel%20background%20with%20clean%20lighting%20and%20professional%20setup&width=600&height=400&seq=1&orientation=landscape'
    },
    {
      id: 2,
      name: 'Cultural Night 2024',
      photoCount: 78,
      category: 'Cultural',
      color: 'bg-green-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20mesmerizing%20college%20cultural%20night%20performance%20with%20students%20in%20traditional%20costumes%20performing%20on%20stage.%20Colorful%20decorations%2C%20dramatic%20lighting%2C%20and%20an%20engaged%20audience%20watching%20diverse%20cultural%20performances.%20Soft%20pastel%20background%20with%20warm%20ambient%20lighting&width=600&height=400&seq=2&orientation=landscape'
    },
    {
      id: 3,
      name: 'Annual Sports Meet',
      photoCount: 56,
      category: 'Sports',
      color: 'bg-orange-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=An%20exciting%20college%20sports%20meet%20with%20students%20competing%20in%20various%20athletic%20events%20on%20a%20well-maintained%20field.%20Spectators%20cheering%20from%20the%20sidelines%2C%20athletes%20in%20action%2C%20and%20a%20festive%20competitive%20atmosphere.%20Soft%20pastel%20background%20with%20clear%20blue%20sky&width=600&height=400&seq=3&orientation=landscape'
    },
    {
      id: 4,
      name: 'Graduation Day 2024',
      photoCount: 124,
      category: 'Fests',
      color: 'bg-purple-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20joyful%20college%20graduation%20ceremony%20with%20students%20in%20caps%20and%20gowns%20celebrating%20their%20achievement.%20Proud%20moments%20of%20receiving%20diplomas%2C%20tossing%20caps%20in%20the%20air%2C%20and%20embracing%20friends%20and%20family.%20Soft%20pastel%20background%20with%20elegant%20decorations&width=600&height=400&seq=4&orientation=landscape'
    },
    {
      id: 5,
      name: 'Science Exhibition',
      photoCount: 35,
      category: 'Fests',
      color: 'bg-pink-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=An%20impressive%20college%20science%20exhibition%20with%20innovative%20student%20projects%2C%20interactive%20displays%2C%20and%20scientific%20demonstrations.%20Curious%20visitors%20examining%20exhibits%2C%20professors%20evaluating%20projects%2C%20and%20an%20atmosphere%20of%20discovery%20and%20learning.%20Soft%20pastel%20background%20with%20modern%20laboratory%20setting&width=600&height=400&seq=5&orientation=landscape'
    },
    {
      id: 6,
      name: 'Dance Competition',
      photoCount: 67,
      category: 'Cultural',
      color: 'bg-yellow-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=An%20energetic%20college%20dance%20competition%20with%20performers%20in%20colorful%20costumes%20showcasing%20various%20dance%20styles%20on%20stage.%20Dynamic%20movements%2C%20expressive%20choreography%2C%20and%20an%20enthusiastic%20audience.%20Soft%20pastel%20background%20with%20theatrical%20lighting%20effects&width=600&height=400&seq=6&orientation=landscape'
    },
    {
      id: 7,
      name: 'Basketball Tournament',
      photoCount: 48,
      category: 'Sports',
      color: 'bg-blue-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=An%20intense%20college%20basketball%20tournament%20with%20players%20in%20action%20on%20the%20court.%20Fast-paced%20gameplay%2C%20strategic%20moves%2C%20and%20spectators%20cheering%20from%20the%20bleachers.%20Soft%20pastel%20background%20with%20indoor%20sports%20facility%20lighting&width=600&height=400&seq=7&orientation=landscape'
    },
    {
      id: 8,
      name: 'Freshers Welcome',
      photoCount: 92,
      category: 'Fests',
      color: 'bg-teal-100',
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20welcoming%20college%20freshers%20party%20with%20new%20students%20mingling%20and%20enjoying%20activities.%20Decorative%20venue%2C%20interactive%20games%2C%20performances%2C%20and%20a%20friendly%20atmosphere%20of%20new%20beginnings.%20Soft%20pastel%20background%20with%20festive%20decorations&width=600&height=400&seq=8&orientation=landscape'
    },

  ];

  const albumPhotos = [
    {
id: 1,
imageUrl: "https://readdy.ai/api/search-image?query=A%20professional%20photo%20of%20a%20tech%20conference%20with%20students%20presenting%20innovative%20projects%2C%20bright%20modern%20exhibition%20hall%20with%20colorful%20displays%20and%20technology%20gadgets%2C%20clean%20minimalist%20background%20with%20soft%20lighting%2C%20high%20resolution%20professional%20photography&width=800&height=600&seq=1&orientation=landscape",
caption: "Opening ceremony with the dean",
uploader: "Emma Johnson",
date: "June 24, 2025",
color: "#E6F3FF"
},
{
id: 2,
imageUrl: "https://readdy.ai/api/search-image?query=Students%20collaborating%20on%20a%20robotics%20project%20at%20a%20technology%20festival%2C%20showing%20teamwork%20and%20innovation%2C%20modern%20tech%20environment%20with%20clean%20minimalist%20background%2C%20professional%20lighting%20highlighting%20the%20project%20details%2C%20high%20quality%20professional%20photography&width=800&height=600&seq=2&orientation=landscape",
caption: "Robotics team showcase",
uploader: "Michael Chen",
date: "June 24, 2025",
color: "#FFE6E6"
},
{
id: 3,
imageUrl: "https://readdy.ai/api/search-image?query=A%20group%20presentation%20at%20a%20technology%20conference%20with%20students%20explaining%20their%20innovative%20software%20project%20on%20large%20screens%2C%20modern%20auditorium%20setting%20with%20clean%20minimalist%20background%2C%20professional%20lighting%20and%20composition%2C%20high%20resolution%20photography&width=800&height=600&seq=3&orientation=landscape",
caption: "Software project presentation",
uploader: "Sophia Williams",
date: "June 25, 2025",
color: "#E6FFE6"
},
{
id: 4,
imageUrl: "https://readdy.ai/api/search-image?query=Students%20networking%20and%20exchanging%20ideas%20at%20a%20tech%20festival%2C%20casual%20professional%20setting%20with%20exhibition%20booths%20in%20background%2C%20clean%20minimalist%20environment%20with%20soft%20lighting%2C%20candid%20professional%20photography%20capturing%20genuine%20interactions&width=800&height=600&seq=4&orientation=landscape",
caption: "Networking session",
uploader: "James Rodriguez",
date: "June 25, 2025",
color: "#E6F3FF"
},
{
id: 5,
imageUrl: "https://readdy.ai/api/search-image?query=An%20award%20ceremony%20at%20a%20technology%20festival%20with%20students%20receiving%20recognition%20for%20their%20innovations%2C%20professional%20stage%20setting%20with%20clean%20minimalist%20background%2C%20spotlight%20highlighting%20the%20winners%2C%20high%20quality%20professional%20photography&width=800&height=600&seq=5&orientation=landscape",
caption: "Award ceremony",
uploader: "Olivia Thompson",
date: "June 26, 2025",
color: "#FFE6E6"
},
{
id: 6,
imageUrl: "https://readdy.ai/api/search-image?query=A%20workshop%20session%20at%20a%20tech%20conference%20with%20students%20learning%20new%20programming%20skills%2C%20classroom-style%20setting%20with%20computers%20and%20instructors%2C%20clean%20minimalist%20background%20with%20professional%20lighting%2C%20high%20resolution%20photography%20showing%20engaged%20participants&width=800&height=600&seq=6&orientation=landscape",
caption: "Coding workshop",
uploader: "Daniel Kim",
date: "June 26, 2025",
color: "#E6FFE6"
},
{
id: 7,
imageUrl: "https://readdy.ai/api/search-image?query=Students%20demonstrating%20virtual%20reality%20technology%20at%20a%20tech%20festival%2C%20visitors%20trying%20VR%20headsets%20with%20amazed%20expressions%2C%20clean%20minimalist%20exhibition%20space%20with%20professional%20lighting%2C%20high%20quality%20photography%20capturing%20the%20excitement%20of%20new%20technology&width=800&height=600&seq=7&orientation=landscape",
caption: "VR demonstration",
uploader: "Ava Martinez",
date: "June 27, 2025",
color: "#E6F3FF"
},
{
id: 8,
imageUrl: "https://readdy.ai/api/search-image?query=A%20panel%20discussion%20with%20industry%20experts%20and%20students%20at%20a%20technology%20conference%2C%20professional%20stage%20setting%20with%20panelists%20seated%20at%20a%20table%20with%20microphones%2C%20clean%20minimalist%20background%20with%20soft%20lighting%2C%20high%20resolution%20photography&width=800&height=600&seq=8&orientation=landscape",
caption: "Industry panel discussion",
uploader: "Noah Wilson",
date: "June 27, 2025",
color: "#FFE6E6"
}

  ];

  const [uploads, setUploads] = useState([
    {
id: 1,
thumbnail: 'https://readdy.ai/api/search-image?query=professional%20photo%20of%20modern%20minimalist%20interior%20design%20with%20soft%20natural%20lighting%2C%20elegant%20furniture%20arrangement%2C%20muted%20pastel%20colors%2C%20creating%20a%20serene%20atmosphere&width=400&height=300&seq=1&orientation=landscape',
eventName: 'Summer Gathering',
uploadDate: '2025-06-20'
},
{
id: 2,
thumbnail: 'https://readdy.ai/api/search-image?query=contemporary%20architectural%20photography%20featuring%20clean%20lines%20and%20geometric%20shapes%2C%20bathed%20in%20warm%20sunlight%2C%20showcasing%20modern%20design%20aesthetics%20with%20subtle%20pastel%20tones&width=400&height=300&seq=2&orientation=landscape',
eventName: 'Architecture Exhibition',
uploadDate: '2025-06-15'
},
{
id: 3,
thumbnail: 'https://readdy.ai/api/search-image?query=artistic%20still%20life%20composition%20with%20soft%20pastel%20colored%20objects%2C%20gentle%20shadows%2C%20and%20delicate%20textures%20creating%20a%20harmonious%20and%20peaceful%20scene&width=400&height=300&seq=3&orientation=landscape',
eventName: 'Art Gallery Opening',
uploadDate: '2025-06-10'
},
{
id: 4,
thumbnail: 'https://readdy.ai/api/search-image?query=natural%20landscape%20photography%20with%20rolling%20hills%2C%20soft%20morning%20light%2C%20pastel%20sky%20colors%2C%20creating%20a%20dreamy%20and%20ethereal%20atmosphere&width=400&height=300&seq=4&orientation=landscape',
eventName: 'Nature Collection',
uploadDate: '2025-06-05'
},
{
id: 5,
thumbnail: 'https://readdy.ai/api/search-image?query=urban%20street%20photography%20with%20soft%20lighting%2C%20pastel%20building%20facades%2C%20and%20minimal%20human%20presence%2C%20capturing%20city%20life%20in%20gentle%20tones&width=400&height=300&seq=5&orientation=landscape',
eventName: 'Urban Scenes',
uploadDate: '2025-06-01'
},
{
id: 6,
thumbnail: 'https://readdy.ai/api/search-image?query=fashion%20photography%20in%20studio%20setting%20with%20soft%20pastel%20backdrop%2C%20elegant%20styling%2C%20and%20diffused%20lighting%20creating%20a%20sophisticated%20atmosphere&width=400&height=300&seq=6&orientation=landscape',
eventName: 'Fashion Week',
uploadDate: '2025-05-28'
},
  ]);

  const filteredAlbums = selectedFilter === 'All' ? albums : albums.filter(album => album.category === selectedFilter);

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setActiveTab('album');
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction) => {
    if (!selectedPhoto) return;
    const currentIndex = albumPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex = direction === 'prev' ? (currentIndex <= 0 ? albumPhotos.length - 1 : currentIndex - 1) : (currentIndex >= albumPhotos.length - 1 ? 0 : currentIndex + 1);
    setSelectedPhoto(albumPhotos[newIndex]);
  };

  const handleEditCaption = (upload) => {
    setIsEditMode(true);
    setEditedCaption(upload.eventName);
  };

  const saveCaption = () => {
    if (selectedPhoto) {
      selectedPhoto.eventName = editedCaption;
      setIsEditMode(false);
    }
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.jpg`;
    link.click();
  };

  const handleUploadEdit = (upload) => {
 setUploadEditedCaption(upload.eventName);
 setUploadIsEditMode(true);
 setUploadSelectedPhoto(upload);
};

const saveUploadCaption = () => {
 if (uploadSelectedPhoto) {
 setUploads(uploads.map(upload =>
 upload.id === uploadSelectedPhoto.id
 ? { ...upload, eventName: uploadEditedCaption }
 : upload
 ));
 setUploadIsEditMode(false);
 }
};

const handleUploadDelete = (id) => {
 const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
 if (confirmDelete) {
 setUploads(uploads.filter(upload => upload.id !== id));
 setUploadSelectedPhoto(null);
 }
};

const handleUploadDownload = (url, filename) => {
 const link = document.createElement('a');
 link.href = url;
 link.download = `${filename}.jpg`;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
};


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 rounded ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>Gallery</button>
        <button onClick={() => setActiveTab('uploads')} className={`px-4 py-2 rounded ${activeTab === 'uploads' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>My Uploads</button>
        {activeTab === 'album' && <button onClick={() => setActiveTab('gallery')} className="ml-auto text-blue-600 hover:underline"><i className="fas fa-arrow-left"></i> Back to Gallery</button>}
      </div>

      {activeTab === 'gallery' && (
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">College Gallery</h1>
              <p className="text-gray-600 mt-1">Browse campus events and moments</p>
            </div>
            <div className="relative">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg flex items-center">
                Filter: {selectedFilter} <i className={`fas fa-chevron-down ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2">
                  {filters.map(filter => (
                    <div key={filter} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedFilter === filter ? 'bg-blue-50 text-blue-700' : ''}`} onClick={() => { setSelectedFilter(filter); setIsFilterOpen(false); }}>{filter}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map(album => (
              <div key={album.id} className={`rounded-xl shadow-md overflow-hidden ${album.color} hover:scale-[1.02] transition-transform duration-300`}>
                <img src={album.imageUrl} alt={album.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{album.name}</h3>
                  <p className="text-gray-600">{album.photoCount} photos</p>
                  <button onClick={() => openAlbum(album)} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"><i className="fas fa-eye mr-2"></i>View Album</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'uploads' && (
 <div>
 <div className="flex justify-between items-center mb-8">
 <h1 className="text-3xl font-semibold text-gray-800">My Uploads</h1>
 <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-2 rounded-button flex items-center cursor-pointer whitespace-nowrap">
 <i className="fas fa-upload mr-2"></i> Upload More Photos
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {uploads.map((upload) => (
 <div key={upload.id} className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => setUploadSelectedPhoto(upload)}>
 <div className="relative group">
 <img src={upload.thumbnail} className="w-full h-48 object-cover" alt={upload.eventName} />
 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
 <div className="flex space-x-2">
 <button onClick={(e) => { e.stopPropagation(); handleUploadEdit(upload); }} className="bg-white text-gray-700 px-3 py-1 rounded-button text-sm hover:bg-gray-100"><i className="fas fa-edit mr-1"></i> Edit</button>
 <button onClick={(e) => { e.stopPropagation(); handleUploadDelete(upload.id); }} className="bg-red-100 text-red-600 px-3 py-1 rounded-button text-sm hover:bg-red-200"><i className="fas fa-trash-alt mr-1"></i> Delete</button>
 
 </div>
 </div>
 </div>
 <div className="p-4">
 <h3 className="text-lg font-medium text-gray-800 mb-1">{upload.eventName}</h3>
 <p className="text-sm text-gray-500">
 <i className="far fa-calendar-alt mr-2"></i>
 {new Date(upload.uploadDate).toLocaleDateString('en-US', {
 year: 'numeric', month: 'long', day: 'numeric'
 })}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
)}


      {activeTab === 'album' && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedAlbum?.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albumPhotos.map(photo => (
              <div key={photo.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer" style={{ backgroundColor: photo.color }} onClick={() => openLightbox(photo)}>
                <img src={photo.imageUrl} alt={photo.caption} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-gray-800 font-medium mb-1">{photo.caption}</p>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span>{photo.uploader}</span>
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLightboxOpen && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-white max-w-4xl w-full rounded-lg overflow-hidden relative">
            <button className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70" onClick={closeLightbox}><X className="w-5 h-5" /></button>
            <img src={selectedPhoto.imageUrl} alt={selectedPhoto.caption} className="w-full h-[60vh] object-contain" />
            <div className="absolute left-4 top-1/2 -translate-y-1/2"><button onClick={() => navigatePhoto('prev')} className="text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70"><ChevronLeft className="w-5 h-5" /></button></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2"><button onClick={() => navigatePhoto('next')} className="text-white bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70"><ChevronRight className="w-5 h-5" /></button></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedPhoto.caption}</h3>
              <div className="flex justify-between text-gray-600">
                <span>Uploaded by: {selectedPhoto.uploader}</span>
                <span>{selectedPhoto.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {uploadSelectedPhoto && !uploadIsEditMode && (
 <Modal isOpen={true} onClose={() => setUploadSelectedPhoto(null)}>
 <div className="bg-white rounded-lg overflow-hidden">
 <img src={uploadSelectedPhoto.thumbnail} alt={uploadSelectedPhoto.eventName} className="w-full h-auto" />
 <div className="p-4 flex justify-between items-center">
 <div>
 <h3 className="text-xl font-medium text-gray-800">{uploadSelectedPhoto.eventName}</h3>
 <p className="text-sm text-gray-500">
 <i className="far fa-calendar-alt mr-2"></i>
 {new Date(uploadSelectedPhoto.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
 </p>
 </div>
 <div className="flex space-x-3">
 <button onClick={() => handleUploadDownload(uploadSelectedPhoto.thumbnail, uploadSelectedPhoto.eventName)} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-button hover:bg-blue-200"><i className="fas fa-download mr-2"></i> Download</button>
 <button onClick={() => handleUploadEdit(uploadSelectedPhoto)} className="bg-green-100 text-green-700 px-4 py-2 rounded-button hover:bg-green-200"><i className="fas fa-edit mr-2"></i> Edit</button>
 <button onClick={() => handleUploadDelete(uploadSelectedPhoto.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-button hover:bg-red-200"><i className="fas fa-trash-alt mr-2"></i> Delete</button>
 </div>
 </div>
 </div>
 </Modal>
)}

{uploadIsEditMode && uploadSelectedPhoto && (
 <Modal isOpen={true} onClose={() => setUploadIsEditMode(false)}>
 <div className="bg-white rounded-lg p-6">
 <h3 className="text-xl font-semibold mb-4">Edit Caption</h3>
 <input
 type="text"
 value={uploadEditedCaption}
 onChange={(e) => setUploadEditedCaption(e.target.value)}
 className="w-full px-4 py-2 border rounded-lg mb-4"
 placeholder="Enter new caption"
 />
 <div className="flex justify-end space-x-3">
 <button onClick={() => setUploadIsEditMode(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
 <button onClick={saveUploadCaption} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">Save</button>
 </div>
 </div>
 </Modal>
)}

    </div>
  );
};

export default Gallery;
