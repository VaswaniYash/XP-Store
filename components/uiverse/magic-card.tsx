import React from 'react';
import styles from './magic-card.module.css';

interface MagicCardProps {
  image: string;
  title: string;
  price: number;
  onAddToCart?: () => void;
  className?: string; // Allow Tailwind overrides
}

export const MagicCard: React.FC<MagicCardProps> = ({ image, title, price, onAddToCart, className }) => {
  return (
    <div className={`${styles.card} ${className || ''} group`}>
      <div className={styles.content}>
        <div className={styles.image_container}>
            <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.details}>
            <div>
                <h3 className={styles.title}>{title}</h3>
                <p className="text-xs text-gray-400">Premium Gear</p>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className={styles.price}>₹{price.toLocaleString()}</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart?.();
                  }}
                  className="bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white px-3 py-1 rounded-md text-xs font-bold transition-all"
                >
                    ADD +
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
