import React, { useState } from 'react';

interface Styles {
  [key: string]: React.CSSProperties;
}

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    console.log('Feedback:', feedback);
    console.log('Rating:', rating);
    alert('Thank you for your feedback!');
  };

  return (
    <div style={styles.container}>
      <h2>Feedback</h2>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Write your feedback here..."
        style={styles.textarea}
      />
      <div style={styles.ratingContainer}>
        <h3>Give Rating:</h3>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={starValue}
              style={styles.ratingButton}
              onClick={() => handleRatingChange(starValue)}
            >
              {starValue <= rating ? '★' : '☆'}
            </button>
          );
        })}
      </div>
      <button onClick={handleSubmit} style={styles.submitButton}>
        Done
      </button>
    </div>
  );
};

const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  textarea: {
    width: '300px',
    height: '100px',
    marginBottom: '20px',
    padding: '10px',
    fontSize: '16px',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  ratingButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#ffc107',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default Feedback;