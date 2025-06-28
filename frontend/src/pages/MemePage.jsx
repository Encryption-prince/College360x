import React, { useState, useEffect, useRef } from 'react';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  BookmarkIcon as BookmarkSolid,
} from '@heroicons/react/24/solid';



const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);
  const lastPostRef = useRef(null);

  // Mock data for meme posts
  const mockPosts = [
    {
      id: 1,
      user: {
        id: 101,
        name: 'meme_lord',
        avatar: 'https://readdy.ai/api/search-image?query=young%20college%20student%20with%20stylish%20haircut%20and%20friendly%20smile%2C%20portrait%20photo%20with%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=101&orientation=squarish'
      },
      timestamp: '2 hours ago',
      media: {
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=funny%20meme%20about%20college%20life%20with%20students%20studying%20in%20library%20with%20exaggerated%20tired%20expressions%2C%20vibrant%20colors%2C%20high%20quality%20digital%20art%20with%20clean%20background%2C%20humorous%20content&width=600&height=600&seq=201&orientation=squarish'
      },
      caption: 'When the professor says the exam will be easy but you open the first question 😂',
      likes: 342,
      isLiked: false,
      comments: [
        { id: 1001, user: 'study_buddy', text: 'This is literally me every finals week!', timestamp: '1h ago' },
        { id: 1002, user: 'coffee_addict', text: 'I feel personally attacked right now 😭', timestamp: '45m ago' }
      ],
      commentCount: 24
    },
    {
      id: 2,
      user: {
        id: 102,
        name: 'campus_jester',
        avatar: 'https://readdy.ai/api/search-image?query=college%20student%20with%20glasses%20and%20curly%20hair%2C%20friendly%20smile%2C%20portrait%20photo%20with%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=102&orientation=squarish'
      },
      timestamp: '5 hours ago',
      media: {
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=funny%20meme%20about%20college%20cafeteria%20food%20with%20exaggerated%20unidentifiable%20dish%20on%20plate%2C%20bright%20colors%2C%20digital%20illustration%20with%20simple%20background%2C%20humorous%20content&width=600&height=500&seq=202&orientation=landscape'
      },
      caption: 'Campus cafeteria be like: "Is it chicken? Is it fish? The world may never know" 🍽️',
      likes: 517,
      isLiked: true,
      comments: [
        { id: 2001, user: 'food_critic', text: 'Mystery meat Monday strikes again!', timestamp: '4h ago' },
        { id: 2002, user: 'ramen_survivor', text: 'This is why I stick to instant noodles 🍜', timestamp: '3h ago' }
      ],
      commentCount: 42
    },
    {
      id: 3,
      user: {
        id: 103,
        name: 'dorm_life',
        avatar: 'https://readdy.ai/api/search-image?query=young%20female%20college%20student%20with%20ponytail%2C%20casual%20style%2C%20portrait%20photo%20with%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=103&orientation=squarish'
      },
      timestamp: '1 day ago',
      media: {
        type: 'image',
        url: 'https://readdy.ai/api/search-image?query=funny%20meme%20about%20college%20student%20sleeping%20through%20alarm%20clocks%20with%20multiple%20clocks%20surrounding%20bed%2C%20colorful%20digital%20illustration%20with%20simple%20background%2C%20humorous%20content&width=600&height=550&seq=203&orientation=landscape'
      },
      caption: 'Setting 15 alarms and still sleeping through all of them. My 8am class never stood a chance ⏰💤',
      likes: 892,
      isLiked: false,
      comments: [
        { id: 3001, user: 'morning_hater', text: 'Whoever invented 8am classes needs to be investigated', timestamp: '20h ago' },
        { id: 3002, user: 'snooze_master', text: 'The accuracy hurts 😂 I set alarms from 6:30 to 7:45 in 5 min intervals', timestamp: '18h ago' }
      ],
      commentCount: 67
    }
  ];

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);

    // Set up intersection observer for infinite scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Load more posts when last post is visible
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Observe the last post for infinite scroll
    if (lastPostRef.current && observerRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }
  }, [posts]);

  const loadMorePosts = () => {
    // Simulate loading more posts
    setLoading(true);
    setTimeout(() => {
      const newPosts = [...posts];
      // Create new posts by modifying existing ones
      mockPosts.forEach((post, index) => {
        const newPost = { 
          ...post, 
          id: post.id + posts.length,
          timestamp: `${index + 4} hours ago`,
          caption: `${post.caption} #collegelife`,
          likes: post.likes + Math.floor(Math.random() * 100)
        };
        newPosts.push(newPost);
      });
      setPosts(newPosts);
      setLoading(false);
    }, 1000);
  };

  const handleLike = postId => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const [expandedComments, setExpandedComments] = useState([]);

  const toggleComments = postId => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter(id => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };

  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                user: 'me',
                text: newComment,
                timestamp: 'just now'
              }
            ],
            commentCount: post.commentCount + 1
          };
        }
        return post;
      }));
      setNewComment('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex justify-center w-full px-4 py-6">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Meme Feed</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search memes..." 
                className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Meme Feed */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                ref={index === posts.length - 1 ? lastPostRef : null}
              >
                {/* Post Header */}
                <div className="p-4 flex items-center space-x-3">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                  <button className="ml-auto text-gray-400 hover:text-gray-600">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>

                {/* Post Media */}
                <div className="w-full overflow-hidden">
                  {post.media.type === 'image' ? (
                    <img 
                      src={post.media.url} 
                      alt="Meme" 
                      className="w-full object-cover object-top"
                    />
                  ) : (
                    <video 
                      src={post.media.url} 
                      autoPlay 
                      muted 
                      loop 
                      className="w-full"
                      controls
                    ></video>
                  )}
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
                    >
                      <i className={`${post.isLiked ? 'fas' : 'far'} fa-heart text-xl`}></i>
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <i className="far fa-comment text-xl"></i>
                      <span className="font-medium">{post.commentCount}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-green-500 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-share text-xl"></i>
                      <span className="font-medium">Share</span>
                    </button>
                    <button className="ml-auto text-gray-700 hover:text-blue-500 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="far fa-bookmark text-xl"></i>
                    </button>
                  </div>

                  {/* Caption */}
                  <div className="mb-3">
                    <p><span className="font-semibold">{post.user.name}</span> <span className="text-gray-700">{post.caption}</span></p>
                  </div>

                  {/* Comments */}
                  <div className={`space-y-2 ${expandedComments.includes(post.id) ? '' : 'max-h-20 overflow-hidden'}`}>
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex space-x-2">
                        <p>
                          <span className="font-semibold">{comment.user}</span> 
                          <span className="text-gray-700"> {comment.text}</span>
                          <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                        </p>
                      </div>
                    ))}
                    
                    {post.commentCount > 2 && !expandedComments.includes(post.id) && (
                      <button 
                        onClick={() => toggleComments(post.id)}
                        className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        View all {post.commentCount} comments
                      </button>
                    )}
                  </div>

                  {/* Comment Input */}
                  <form 
                    onSubmit={(e) => handleCommentSubmit(post.id, e)}
                    className="mt-3 flex items-center space-x-2"
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 border-none"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="text-gray-400 hover:text-blue-500 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <FaceSmileIcon className="h-6 w-6" />
                    </button>
                    <button 
                      type="submit"
                      className="text-blue-500 font-medium cursor-pointer !rounded-button whitespace-nowrap"
                      disabled={!newComment.trim()}
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer !rounded-button whitespace-nowrap">
        <i className="fas fa-plus mr-2"></i>
        Upload Meme
      </button>
    </div>
  );
};



export default App;
