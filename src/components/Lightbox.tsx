import { useEffect, useCallback } from 'react';
import styles from './Lightbox.module.css';

export type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const current = images[index];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev();
      if (e.key === 'ArrowRight' && hasMultiple) goNext();
    },
    [onClose, goPrev, goNext, hasMultiple],
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  if (!current) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
        ×
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Предыдущее изображение"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.navNext}`}
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Следующее изображение"
          >
            ›
          </button>
          <p className={styles.counter} aria-live="polite">
            {index + 1} / {images.length}
          </p>
        </>
      )}

      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        className={styles.image}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
