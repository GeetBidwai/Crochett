import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';

const studioPhotos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    likes: '428',
    caption: 'Soft morning tea and blocking out daisy granny square borders. Happy Sunday!',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
    likes: '612',
    caption: 'The Daisy meadow shoulder bag in oatmeal & buttercup is officially restocked in 7 pieces.',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
    likes: '890',
    caption: 'Everlasting tulip stems heading to their new home in kraft paper wrap.',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80',
    likes: '519',
    caption: 'Tiny strawberry amigurumi keyrings ready for weekend market gifting.',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    likes: '344',
    caption: 'Hands at work on a custom 24-piece wedding bouquet order.',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    likes: '723',
    caption: 'Waffle textured cushion covers adding earthy comfort to the reading nook.',
  },
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 bg-[#FDFBF7] border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
            <Instagram className="w-3.5 h-3.5 text-[#A67C52]" />
            <span>Studio Journal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium">
            Follow Our Studio Days
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5F54] font-light">
            Tag <span className="font-semibold text-[#4A3F35]">@knotandbloom.craft</span> to be featured with your handmade companions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {studioPhotos.map((photo) => (
            <a
              key={photo.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden bg-[#EFEBE4] border border-[#E5E0D8] shadow-xs block"
            >
              <img
                src={photo.url}
                alt="Studio craft moment"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#4A3F35]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-[#FDFBF7]">
                <Instagram className="w-5 h-5 text-white mb-2" />
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{photo.likes}</span>
                </div>
                <p className="text-[10px] text-[#FDFBF7]/90 mt-1 line-clamp-2 leading-tight">
                  {photo.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
