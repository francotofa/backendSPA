import React, { useRef, useEffect } from 'react';
import styles from './PromoVideo.module.css';

const PromoVideo = () => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Cuando el video es visible
            videoRef.current.play().catch(error => {
              console.log('Autoplay bloqueado:', error);
              // Mostrar botón de play si el autoplay está bloqueado
              const playButton = document.createElement('button');
              playButton.className = styles.playButton;
              playButton.innerHTML = '▶ Reproducir Video';
              playButton.onclick = () => {
                videoRef.current.play();
                playButton.remove();
              };
              videoContainerRef.current.appendChild(playButton);
            });
          } else {
            // Cuando el video no es visible
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 } // Se activa cuando el 50% del video es visible
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.videoSection} ref={videoContainerRef}>
      <div className={styles.videoContainer}>
        <h2 className={styles.videoTitle}>DESCUBRE NUESTRA EXPERIENCIA</h2>
        <p className={styles.videoSubtitle}>Sumérgete en el ambiente de relajación que hemos creado para ti</p>
        
        <div className={styles.videoWrapper}>
          <video 
            ref={videoRef}
            controls 
            className={styles.videoElement}
            muted // Necesario para el autoplay en muchos navegadores
            playsInline
            loop // Opcional: para que se repita
          >
            <source src="/videos/promo-spa.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>

        <div className={styles.timeMarks}>
          <span>0:00</span>
          <span>1:00</span>
        </div>
        
        <p className={styles.videoCaption}>
          Un breve recorrido por nuestras instalaciones y los servicios que ofrecemos para tu bienestar
        </p>
      </div>
    </section>
  );
};

export default PromoVideo;