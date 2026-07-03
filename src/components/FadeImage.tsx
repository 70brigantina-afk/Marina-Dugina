import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import styles from './FadeImage.module.css';

type FadeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
};

export function FadeImage({
  wrapperClassName,
  objectFit = 'cover',
  objectPosition,
  className,
  alt = '',
  loading = 'lazy',
  style,
  ...props
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`${styles.wrap} ${wrapperClassName ?? ''}`}>
      <img
        ref={imgRef}
        alt={alt}
        loading={loading}
        className={`${styles.img} ${styles[objectFit]} ${loaded ? styles.loaded : ''} ${className ?? ''}`}
        style={{ objectPosition, ...style }}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ''} ${className ?? ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
