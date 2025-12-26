import React from 'react';
import styles from './cyber-button.module.css';
import Link from 'next/link';

interface CyberButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string; // Allow overrides
  icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ text, href, onClick, className, icon }) => {
  const ButtonContent = () => (
    <button className={`${styles.cyber_btn} ${className || ''}`} onClick={onClick}>
      <span className={styles.cyber_btn__text}>
        {icon && <span className="mr-2 inline-block">{icon}</span>}
        {text}
      </span>
      <span className={styles.cyber_glitch}></span>
    </button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <ButtonContent />
      </Link>
    );
  }

  return <ButtonContent />;
};
