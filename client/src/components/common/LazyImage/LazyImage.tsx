import React, { useState, useEffect } from 'react';
import './LazyImage.css';

const placeHolder =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const LazyImage = ({
  src = '',
  alt = '',
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState<any>();

  const onLoad = (event: any) => {
    event.target.classList.add('loaded');
  };

  const onError = (event: any) => {
    event.target.classList.add('has-error');
    console.log('error loading image...');
  };

  useEffect(() => {
    let observer: any;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef);
      } else {
        // Old browsers fallback
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <img
      src={src}
      alt={alt}
      {...props}
      ref={setImageRef}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default LazyImage;
