import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, BookOpen, Clock, Heart } from 'lucide-react';
import { getBlogPosts } from '../sanityClient';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  useEffect(() => {
    setBlogPosts(getBlogPosts());
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(pId => pId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  return (
    <section id="blog" className="py-16 bg-[#FDFBF7] relative border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-[#A4864A] tracking-widest uppercase block mb-3 font-sans">Academic Blog</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D312A] tracking-tight serif-font">
            Learning Insights & Parent Guides
          </h2>
          <p className="text-warm-text/80 mt-3 text-sm sm:text-base leading-relaxed font-light">
            Stay informed with curated articles by our experienced Academy Manager (15 years in education) on online learning standards, Tajweed rules, and children\'s motivation.
          </p>
          <div className="h-1 w-20 bg-gold-accent mx-auto rounded-full mt-5" />
        </div>

        {/* Blog Post Detail View Modal / Expanding Box */}
        {selectedPost ? (
          <div className="max-w-3xl mx-auto bg-[#F5F2ED] border border-gold-accent/30 rounded p-6 sm:p-8 shadow-md mb-12 transition-all duration-300">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="bg-emerald-deep text-[#FDFBF7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                {selectedPost.category}
              </span>
              <button 
                onClick={() => setSelectedPost(null)}
                className="text-xs font-bold text-emerald-deep hover:text-gold-accent transition uppercase hover:underline"
              >
                ← Back to all posts
              </button>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D312A] serif-font mb-4 leading-tight">{selectedPost.title}</h3>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-warm-text/60 font-mono mb-6 pb-4 border-b border-[#E5E1DA]">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold-accent" /> {selectedPost.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-accent" /> {selectedPost.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-accent" /> {selectedPost.readTime}</span>
            </div>

            <div className="text-warm-text/90 text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p className="font-medium text-[#2D312A]">{selectedPost.excerpt}</p>
              <p>{selectedPost.content}</p>
              <p className="pt-2">Our modern Academy values parent cooperation above all else. Daily review sheets are sent via WhatsApp after every lesson to ensure no lessons are forgotten and student progress stays on an accelerated track.</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E1DA] flex items-center justify-between">
              <button 
                onClick={(e) => handleLike(selectedPost.id, e)}
                className="flex items-center gap-1.5 text-xs font-bold text-warm-text hover:text-rose-500 transition cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${likedPosts.includes(selectedPost.id) ? 'fill-rose-500 text-rose-500' : 'text-warm-text/60'}`} />
                <span>{selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)} Likes</span>
              </button>
              <button 
                onClick={() => setSelectedPost(null)}
                className="bg-emerald-deep text-[#FDFBF7] text-xs font-bold px-5 py-2.5 rounded border border-gold-accent/25 hover:bg-emerald-deep/90 transition shadow-sm"
              >
                Close Article
              </button>
            </div>
          </div>
        ) : null}

        {/* Grid of posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <div 
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  // Scroll to top of the blog section so they can read smoothly
                  document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FDFBF7] border border-[#E5E1DA] rounded p-6 shadow-xs hover:shadow-md hover:border-gold-accent/40 transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold text-gold-accent uppercase tracking-wider font-mono">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-warm-text/50 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#2D312A] serif-font group-hover:text-gold-accent transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-warm-text/75 leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E1DA] flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-emerald-deep group-hover:text-gold-accent transition inline-flex items-center gap-1">
                    <span>Read Full Post</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className="p-1 text-warm-text/50 hover:text-rose-500 transition flex items-center gap-1 font-mono"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Book Trial Call to Action inside Blog */}
        <div className="mt-12 text-center bg-[#F5F2ED] border border-[#E5E1DA] p-6 rounded max-w-2xl mx-auto shadow-2xs">
          <h4 className="text-sm font-bold text-[#2D312A] serif-font flex items-center justify-center gap-1.5 mb-1">
            <BookOpen className="w-4 h-4 text-gold-accent" />
            <span>Ready to Begin Your Educational Journey?</span>
          </h4>
          <p className="text-[11px] text-warm-text/80 mb-4 max-w-md mx-auto">Get free custom study consultations directly from our expert Academy Management team.</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-1 text-xs font-bold uppercase bg-emerald-deep hover:bg-emerald-deep/90 text-[#FDFBF7] px-6 py-2.5 rounded border border-gold-accent/25 transition shadow-sm cursor-pointer"
          >
            Book Free Trial Now
          </a>
        </div>

      </div>
    </section>
  );
}
