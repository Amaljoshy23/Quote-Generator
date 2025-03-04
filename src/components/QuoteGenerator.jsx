import { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBackground, setShowBackground] = useState(true);

  // Author images mapping
 // Map of author names to their image URLs
 const authorImages = {
  "Rumi": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Maulana.jpg/220px-Maulana.jpg",
  "Abdul Kalam": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/220px-A._P._J._Abdul_Kalam.jpg",
  "Bill Gates": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/220px-Bill_Gates_2018.jpg",
  "Albert Einstein": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
  "Abraham Lincoln": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  "Oprah Winfrey": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/220px-Oprah_in_2014.jpg",
  "Muhammad Ali": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg",
  "William Shakespeare": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg",
  "Mother Teresa": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/220px-Mother_Teresa_1.jpg",
  "Nelson Mandela": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/220px-Nelson_Mandela_1994.jpg",
  "Walt Disney": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Walt_Disney_1946.JPG/220px-Walt_Disney_1946.JPG",
  "Aristotle": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/220px-Aristotle_Altemps_Inv8575.jpg",
  "Abu Bakr (R.A)": "/api/placeholder/150/150",
  "Ali ibn Abi Talib (R.A)": "/api/placeholder/150/150",
  "Umar ibn Al-Khattāb (R.A)": "/api/placeholder/150/150",
  // Default image for authors not in the list
  "default": "/api/placeholder/150/150"
};

  // Get background image for author
  const getAuthorBackground = (author) => {
    return authorImages[author] 
      ? `url(/images/${authorImages[author]})` 
      : 'url(/images/default-background.jpg)';
  };

  // Fetch random quote
  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dummyjson.com/quotes/random');
      setQuote(response.data);
    } catch (err) {
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch quote on component mount
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  // Toggle background visibility
  const toggleBackground = () => {
    setShowBackground(prev => !prev);
  };

  return (
    <div 
      className={`quote-container ${showBackground ? 'with-background' : ''}`}
      style={showBackground && quote ? { backgroundImage: getAuthorBackground(quote.author) } : {}}
    >
      <div className="content-wrapper">
        <h1>Quote Generator</h1>
        
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          quote && (
            <div className="quote-box">
              <p className="quote-text">"{quote.quote}"</p>
              <p className="author">— {quote.author}</p>
            </div>
          )
        )}
        
        <div className="button-container">
          <button className="toggle-btn" onClick={toggleBackground}>
            {showBackground ? 'Show' : 'Hide'}  Background 
          </button>
          <button className="next-btn" onClick={fetchRandomQuote} disabled={loading}>
            Next Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
