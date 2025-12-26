import React from 'react';
import styles from './neumorphic-button.module.css';
import Link from 'next/link';

interface NeumorphicButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  href?: string;
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({ text, onClick, className, icon, href }) => {
  const ButtonContent = () => (
    <button className={`${styles.btn} ${className || ''}`} onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>}
      {text}
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
