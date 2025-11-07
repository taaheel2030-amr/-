import React, { useState, useRef, useMemo } from 'react';
import { Article, User, Comment } from '../types';
import { HeartIcon, ChatBubbleIcon, CameraIcon, PaperAirplaneIcon } from './icons';

interface ArticleCardProps {
  article: Article;
  onViewProfile: (user: User) => void;
}

const parseTimestampForSort = (timestamp: string): number => {
  // Returns a value in minutes. Lower is more recent.
  if (timestamp === 'الآن') return 0;

  const parts = timestamp.split(' ');
  if (parts[0] !== 'منذ') return Infinity; // Should be at the end

  const valueStr = parts[1];
  const unit = parts.length > 2 ? parts[2] : parts[1];

  let value: number;
  if (valueStr === 'ساعة' || valueStr === 'يوم') {
    value = 1;
  } else if (valueStr === 'ساعتين') {
    value = 2;
  } else {
    value = parseInt(valueStr, 10);
  }

  if (isNaN(value)) return Infinity;

  if (unit.startsWith('دقيق')) return value; // minutes
  if (unit.startsWith('ساع')) return value * 60; // hours
  if (unit.startsWith('يوم') || unit.startsWith('أيام')) return value * 24 * 60; // days

  return Infinity; // unknown unit
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onViewProfile }) => {
  const [likes, setLikes] = useState(article.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState(article.imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<Comment[]>(article.comments);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => parseTimestampForSort(a.timestamp) - parseTimestampForSort(b.timestamp));
  }, [comments]);


  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    if (newIsLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    
    // Using mockUsers[0] as the current user for simplicity
    const currentUser = {
        id: 1,
        name: 'فاطمة الأحمد',
        avatarUrl: 'https://picsum.photos/seed/fatima/200',
    };

    const newCommentObject: Comment = {
      id: Date.now(), // simple unique id
      user: currentUser,
      text: newComment.trim(),
      timestamp: 'الآن',
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative group">
        <img src={imageSrc} alt={article.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
            <button
                onClick={handleImageUploadClick}
                className="p-3 rounded-full bg-white bg-opacity-75 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Change article image"
            >
                <CameraIcon className="w-6 h-6" />
            </button>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-blue-600">{article.category}</p>
        <h3 className="text-xl font-bold text-gray-800 mt-1 hover:text-blue-800 cursor-pointer">{article.title}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3 flex-grow">{article.excerpt}</p>

        {showComments && (
          <div className="mt-4 border-t pt-4">
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 mb-4">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 space-x-reverse">
                  <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-8 h-8 rounded-full cursor-pointer" onClick={() => onViewProfile(article.author)} />
                  <div className="flex-1 bg-gray-100 p-2 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 cursor-pointer" onClick={() => onViewProfile(article.author)}>{comment.user.name}</p>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-400 mt-1 text-left">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
              {sortedComments.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">لا توجد تعليقات. كن أول من يعلق!</p>
              )}
            </div>
            <form onSubmit={handleAddComment} className="flex items-center space-x-2 space-x-reverse">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="أضف تعليقاً..."
                className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Add a comment"
              />
              <button type="submit" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Post comment">
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <img src={article.author.avatarUrl} alt={article.author.name} className="w-10 h-10 rounded-full me-3 cursor-pointer" onClick={() => onViewProfile(article.author)} />
            <div>
              <p className="text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => onViewProfile(article.author)}>{article.author.name}</p>
              <p className="text-xs text-gray-500">{article.publishedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={handleLike} 
              className={`flex items-center transition-all duration-300 focus:outline-none ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              aria-label="Like article"
            >
              <HeartIcon className={`w-5 h-5 me-1 transition-transform ${isLiked ? 'transform scale-125' : ''}`} style={{ fill: isLiked ? 'currentColor' : 'none' }}/>
              <span className="text-sm font-medium">{likes}</span>
            </button>
            <button 
              onClick={handleToggleComments}
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors focus:outline-none"
              aria-label="View comments"
            >
              <ChatBubbleIcon className="w-5 h-5 me-1" />
              <span className="text-sm font-medium">{comments.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
