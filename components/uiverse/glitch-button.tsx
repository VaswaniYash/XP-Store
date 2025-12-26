import React from 'react';
import styles from './glitch-button.module.css';
import Link from 'next/link';

interface GlitchButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const GlitchButton: React.FC<GlitchButtonProps> = ({ text, href, onClick, className }) => {
  const ButtonContent = () => (
    <button className={`${styles['ui-btn']} ${className || ''}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );

  if (href) {
    return (
      <Link href={href}>
        <ButtonContent />
      </Link>
    );
  }

  return <ButtonContent />;
};
