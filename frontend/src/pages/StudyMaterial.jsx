// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';

const App = () => {
  // Backend integration state
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Study material data with pricing
  const [studyMaterialsData, setStudyMaterialsData] = useState([
    {
      id: 1,
      title: "DBMS Unit 2 - Normalization",
      subject: "Database Management",
      semester: "3rd Semester",
      fileType: "PDF",
      uploadedBy: "Prof. Sarah Johnson",
      uploadDate: "June 15, 2025",
      downloads: 342,
      trending: true,
      favorite: false,
      color: "bg-blue-100",
      price: 50,
      driveLink: "https://drive.google.com/file/d/1abc123/view"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Notes",
      subject: "Computer Science",
      semester: "2nd Semester",
      fileType: "DOC",
      uploadedBy: "Alex Thompson",
      uploadDate: "June 10, 2025",
      downloads: 289,
      trending: false,
      favorite: true,
      color: "bg-green-100",
      price: 75,
      driveLink: "https://drive.google.com/file/d/2def456/view"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      subject: "Artificial Intelligence",
      semester: "4th Semester",
      fileType: "PPT",
      uploadedBy: "Dr. Michael Chen",
      uploadDate: "June 20, 2025",
      downloads: 156,
      trending: false,
      favorite: false,
      color: "bg-purple-100",
      price: 100,
      driveLink: "https://drive.google.com/file/d/3ghi789/view"
    },
    {
      id: 4,
      title: "Web Development Crash Course",
      subject: "Internet Technologies",
      semester: "3rd Semester",
      fileType: "PDF",
      uploadedBy: "Emily Parker",
      uploadDate: "June 5, 2025",
      downloads: 421,
      trending: true,
      favorite: true,
      color: "bg-orange-100",
      price: 60,
      driveLink: "https://drive.google.com/file/d/4jkl012/view"
    },
    {
      id: 5,
      title: "Operating Systems Previous Year Papers",
      subject: "Computer Science",
      semester: "4th Semester",
      fileType: "PDF",
      uploadedBy: "Prof. Robert Wilson",
      uploadDate: "May 28, 2025",
      downloads: 312,
      trending: true,
      favorite: false,
      color: "bg-blue-100",
      price: 80,
      driveLink: "https://drive.google.com/file/d/5mno345/view"
    },
    {
      id: 6,
      title: "Computer Networks Complete Notes",
      subject: "Networking",
      semester: "5th Semester",
      fileType: "DOC",
      uploadedBy: "Jessica Adams",
      uploadDate: "June 18, 2025",
      downloads: 178,
      trending: false,
      favorite: true,
      color: "bg-green-100",
      price: 65,
      driveLink: "https://drive.google.com/file/d/6pqr678/view"
    },
    {
      id: 7,
      title: "Software Engineering Principles",
      subject: "Software Development",
      semester: "6th Semester",
      fileType: "PPT",
      uploadedBy: "Prof. David Miller",
      uploadDate: "June 12, 2025",
      downloads: 203,
      trending: false,
      favorite: false,
      color: "bg-purple-100",
      price: 90,
      driveLink: "https://drive.google.com/file/d/7stu901/view"
    },
    {
      id: 8,
      title: "Artificial Intelligence Assignment Help",
      subject: "AI & ML",
      semester: "5th Semester",
      fileType: "PDF",
      uploadedBy: "Sophia Garcia",
      uploadDate: "June 8, 2025",
      downloads: 267,
      trending: true,
      favorite: false,
      color: "bg-orange-100",
      price: 120,
      driveLink: "https://drive.google.com/file/d/8vwx234/view"
    },
    {
      id: 9,
      title: "Cloud Computing Architecture",
      subject: "Cloud Technologies",
      semester: "7th Semester",
      fileType: "PDF",
      uploadedBy: "Prof. James Anderson",
      uploadDate: "June 22, 2025",
      downloads: 145,
      trending: false,
      favorite: true,
      color: "bg-blue-100",
      price: 110,
      driveLink: "https://drive.google.com/file/d/9yza567/view"
    }
  ]);

  // State for search, filters and preview
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [previewItem, setPreviewItem] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // State for section toggle
  const [activeSection, setActiveSection] = useState("browse"); // "browse" or "upload"

  // State for upload form
  const [uploadForm, setUploadForm] = useState({
    title: "",
    subject: "",
    semester: "",
    fileType: "PDF",
    description: "",
    driveLink: "",
    price: ""
  });
  const [isUploading, setIsUploading] = useState(false);

  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Fetch study materials from backend
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:8080/api/study-materials')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch study materials');
        return res.json();
      })
      .then(data => {
        // Map backend fields to frontend fields
        setStudyMaterials(Array.isArray(data) ? data.map(m => ({
          id: m.id,
          title: m.title,
          subject: m.subject,
          semester: m.semester,
          fileType: m.fileType,
          uploadedBy: '', // Not available in backend
          uploadDate: m.uploadedAt ? new Date(m.uploadedAt).toLocaleDateString() : '',
          downloads: 0, // Not available in backend
          trending: false, // Not available in backend
          favorite: false, // Not available in backend
          color: 'bg-blue-100', // Default color
          price: m.price,
          driveLink: m.url,
          description: m.description,
        })) : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter study materials based on search term and filters
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (material.uploadedBy || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "" || material.subject === subjectFilter;
    const matchesSemester = semesterFilter === "" || material.semester === semesterFilter;
    const matchesFileType = fileTypeFilter === "" || material.fileType === fileTypeFilter;
    let matchesTag = true;
    if (activeTag === "#ExamNotes") {
      matchesTag = material.title.includes("Notes") || material.title.includes("notes");
    } else if (activeTag === "#PreviousYear") {
      matchesTag = material.title.includes("Previous") || material.title.includes("papers");
    } else if (activeTag === "#AssignmentHelp") {
      matchesTag = material.title.includes("Assignment") || material.title.includes("Help");
    }
    return matchesSearch && matchesSubject && matchesSemester && matchesFileType && matchesTag;
  });

  // Handle download click - now shows payment modal
  const handleDownload = material => {
    setSelectedMaterial(material);
    setShowPaymentModal(true);
  };

  // Handle payment processing
  const handlePayment = async () => {
    setIsProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      setSelectedMaterial(null);

      // Simulate successful download
      setDownloadingId(selectedMaterial.id);
      setTimeout(() => {
        setDownloadingId(null);
        alert(`Payment successful! File downloaded successfully!`);
      }, 1500);
    }, 2000);
  };

  // Handle drive link change and auto-detect file type
  const handleDriveLinkChange = (e) => {
    const link = e.target.value;
    let fileType = "PDF";

    if (link.includes(".doc") || link.includes(".docx")) {
      fileType = "DOC";
    } else if (link.includes(".ppt") || link.includes(".pptx")) {
      fileType = "PPT";
    } else if (link.includes(".pdf")) {
      fileType = "PDF";
    }

    setUploadForm(prev => ({
      ...prev,
      driveLink: link,
      fileType: fileType
    }));
  };

  // Handle upload form submission
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.driveLink) {
      alert("Please provide a drive link");
      return;
    }
    if (!uploadForm.price || uploadForm.price <= 0) {
      alert("Please set a valid price");
      return;
    }
    setIsUploading(true);
    // Compose payload for backend
    const payload = {
      title: uploadForm.title,
      url: uploadForm.driveLink,
      subject: uploadForm.subject,
      semester: uploadForm.semester,
      fileType: uploadForm.fileType,
      price: parseFloat(uploadForm.price),
      description: uploadForm.description,
      // uploadedAt: new Date().toISOString(), // Let backend set
    };
    try {
      const res = await fetch('http://localhost:8080/api/study-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Document uploaded successfully!");
        setUploadForm({
          title: "",
          subject: "",
          semester: "",
          fileType: "PDF",
          description: "",
          driveLink: "",
          price: ""
        });
        // Refresh materials
        fetch('http://localhost:8080/api/study-materials')
          .then(res => res.json())
          .then(data => setStudyMaterials(Array.isArray(data) ? data.map(m => ({
            id: m.id,
            title: m.title,
            subject: m.subject,
            semester: m.semester,
            fileType: m.fileType,
            uploadedBy: '',
            uploadDate: m.uploadedAt ? new Date(m.uploadedAt).toLocaleDateString() : '',
            downloads: 0,
            trending: false,
            favorite: false,
            color: 'bg-blue-100',
            price: m.price,
            driveLink: m.url,
            description: m.description,
          })) : []));
      } else {
        alert("Failed to upload document");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Get unique subjects, semesters and file types for filters
  const subjects = Array.from(new Set(studyMaterials.map(material => material.subject)));
  const semesters = Array.from(new Set(studyMaterials.map(material => material.semester)));
  const fileTypes = Array.from(new Set(studyMaterials.map(material => material.fileType)));

  // Show loading and error states
  if (loading) return <div className="p-8 text-gray-500">Loading study materials...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📘 Study Material</h1>
          <p className="text-gray-600">Browse notes, papers & resources shared by your peers</p>
        </div>

        {/* Section Toggle */}
        <div className="mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${activeSection === "browse"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              onClick={() => setActiveSection("browse")}
            >
              <i className="fas fa-search mr-2"></i>
              Browse & Download
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${activeSection === "upload"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              onClick={() => setActiveSection("upload")}
            >
              <i className="fas fa-upload mr-2"></i>
              Upload Files
            </button>
          </div>
        </div>

        {/* Browse Section */}
        {activeSection === "browse" && (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by title, subject, or uploader"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                    value={semesterFilter}
                    onChange={(e) => setSemesterFilter(e.target.value)}
                  >
                    <option value="">All Semesters</option>
                    {semesters.map((semester, index) => (
                      <option key={index} value={semester}>{semester}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>

                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                    value={fileTypeFilter}
                    onChange={(e) => setFileTypeFilter(e.target.value)}
                  >
                    <option value="">All File Types</option>
                    {fileTypes.map((fileType, index) => (
                      <option key={index} value={fileType}>{fileType}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {["#ExamNotes", "#PreviousYear", "#AssignmentHelp"].map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap !rounded-button cursor-pointer ${activeTag === tag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Materials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className={`${material.color} rounded-lg p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative overflow-hidden`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {material.fileType === "PDF" && <i className="fas fa-file-pdf text-red-500"></i>}
                        {material.fileType === "DOC" && <i className="fas fa-file-word text-blue-500"></i>}
                        {material.fileType === "PPT" && <i className="fas fa-file-powerpoint text-orange-500"></i>}
                      </span>
                      <div>
                        <span className="inline-block text-xs font-medium px-2 py-1 bg-white rounded-full">
                          {material.fileType}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {material.trending && (
                        <span className="inline-block text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded-full">
                          🔥 Trending
                        </span>
                      )}
                      {material.favorite && (
                        <span className="inline-block text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full">
                          ⭐ Favorite
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{material.title}</h3>

                  <div className="flex items-center mb-3">
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-white rounded-full mr-2">
                      {material.subject}
                    </span>
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-white rounded-full">
                      {material.semester}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>Uploaded by {material.uploadedBy}</p>
                    <p>{material.uploadDate}</p>
                  </div>

                  {/* Price Display */}
                  <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="text-lg font-bold text-green-600">₹{material.price}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 !rounded-button whitespace-nowrap cursor-pointer ${downloadingId === material.id ? "opacity-75" : ""
                        }`}
                      onClick={() => handleDownload(material)}
                      disabled={downloadingId === material.id}
                    >
                      {downloadingId === material.id ? (
                        <>
                          <i className="fas fa-circle-notch fa-spin"></i>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart"></i>
                          <span>Buy & Download</span>
                        </>
                      )}
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-white transition-colors duration-200 cursor-pointer"
                      onClick={() => setPreviewItem(material.id)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Upload Section */}
        {activeSection === "upload" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">📤 Upload Study Material</h2>

              <form onSubmit={handleUpload} className="space-y-6">
                {/* Drive Link Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Drive Link *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                    <div className="text-4xl mb-4">
                      <i className="fab fa-google-drive text-blue-500"></i>
                    </div>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://drive.google.com/file/d/..."
                      value={uploadForm.driveLink}
                      onChange={handleDriveLinkChange}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Paste your Google Drive file link here
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter document title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Computer Science"
                      value={uploadForm.subject}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={uploadForm.semester}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, semester: e.target.value }))}
                      required
                    >
                      <option value="">Select Semester</option>
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Type
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      value={uploadForm.fileType}
                      readOnly
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price in rupees"
                      value={uploadForm.price}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, price: e.target.value }))}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Brief description of the document..."
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Upload Button */}
                <button
                  type="submit"
                  className={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${isUploading ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-upload"></i>
                      <span>Upload Document</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Payment Required</h3>
                <button
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowPaymentModal(false)}
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">{selectedMaterial.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{selectedMaterial.subject} • {selectedMaterial.semester}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="text-lg font-bold text-green-600">₹{selectedMaterial.price}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <span>UPI</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <span>Net Banking</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${isProcessingPayment ? "opacity-75 cursor-not-allowed" : "hover:bg-green-700"
                    }`}
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card"></i>
                      <span>Pay ₹{selectedMaterial.price}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {studyMaterials.find(m => m.id === previewItem)?.title}
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setPreviewItem(null)}
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="bg-gray-100 p-8 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  {(() => {
                    const material = studyMaterials.find(m => m.id === previewItem);
                    if (material?.fileType === "PDF") {
                      return <i className="fas fa-file-pdf text-red-500 text-6xl mb-4"></i>;
                    } else if (material?.fileType === "DOC") {
                      return <i className="fas fa-file-word text-blue-500 text-6xl mb-4"></i>;
                    } else {
                      return <i className="fas fa-file-powerpoint text-orange-500 text-6xl mb-4"></i>;
                    }
                  })()}
                  <p className="text-gray-500">Preview not available. Purchase to access the full document.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">File Details</h4>
                {(() => {
                  const material = studyMaterials.find(m => m.id === previewItem);
                  return (
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Subject:</span> {material?.subject}</p>
                      <p><span className="font-medium">Semester:</span> {material?.semester}</p>
                      <p><span className="font-medium">File Type:</span> {material?.fileType}</p>
                      <p><span className="font-medium">Uploaded By:</span> {material?.uploadedBy}</p>
                      <p><span className="font-medium">Upload Date:</span> {material?.uploadDate}</p>
                      <p><span className="font-medium">Downloads:</span> {material?.downloads}</p>
                      <p><span className="font-medium">Price:</span> <span className="text-green-600 font-bold">₹{material?.price}</span></p>
                    </div>
                  );
                })()}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    const material = studyMaterials.find(m => m.id === previewItem);
                    setPreviewItem(null);
                    handleDownload(material);
                  }}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span>Buy & Download</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
