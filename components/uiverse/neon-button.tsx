import React from 'react';
import styles from './neon-button.module.css';
import Link from 'next/link';

interface NeonButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string; // Allow overrides
}

export const NeonButton: React.FC<NeonButtonProps> = ({ text, href, onClick, className }) => {
  const ButtonContent = () => (
    <button className={`${styles.btn} ${className || ''}`} onClick={onClick}>
      {text}
    </button>
  );

  if (href) {
    return (
        <Link href={href} className={className}>
             <button className={`${styles.btn} w-full`} tabIndex={-1}>
                {text}
             </button>
        </Link>
    );
  }

  return <ButtonContent />;
};
