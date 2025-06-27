import React from 'react';
import styles from './ReviewsSection.module.css';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Laura M.",
      comment: "Desde el momento en que entré, sentí una atmósfera de calma y tranquilidad. El masaje fue increíblemente relajante y el personal muy atento. ¡Definitivamente volveré!",
      image: "/images/china.jpg"
    },
    {
      id: 2,
      name: "Carlos P.",
      comment: "El tratamiento facial que recibí fue maravilloso. Mi piel se siente fresca y radiante. ¡Gracias por esta experiencia tan agradable!",
      image: "/images/chino.jpg"
    },
    {
      id: 3,
      name: "Elena R.",
      comment: "Las clases de yoga son excelentes para conectar cuerpo y mente. La instructora es muy profesional y crea un ambiente muy positivo. ¡Me siento con mucha más energía y equilibrio!",
      image: "/images/fondoflores.jpg"
    }
  ];

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Reseñas</h2>
        <p className={styles.sectionSubtitle}>
          Descubre lo que dicen quienes ya han experimentado la relajación y el bienestar en SPA "Sentirse Bien". 
          Sus experiencias son nuestro mayor testimonio.
        </p>
        
        <div className={styles.reviewsGrid}>
          {reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <img 
                src={review.image} 
                alt={review.name} 
                className={styles.reviewImage}
              />
              <h3 className={styles.reviewName}>{review.name}</h3>
              <p className={styles.reviewComment}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;