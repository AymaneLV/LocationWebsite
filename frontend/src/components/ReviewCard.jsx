import { FaStar, FaQuoteLeft } from "react-icons/fa";  
import "./ReviewCard.css";  

const ReviewCard = ({ review }) => {  
  return (  
    <div className="review-card">  
      <div className="review-quote">
        <FaQuoteLeft />
      </div>
      <div className="review-header">  
        <div className="user-info">
          <img src={review.user.avatar} alt={review.user.name} className="user-avatar" />
          <div>
            <h4>{review.user.name}</h4>
            <span className="review-date">{review.date}</span>
          </div>
        </div>
        <div className="rating">  
          {[...Array(5)].map((_, i) => (  
            <FaStar 
              key={i} 
              className={`star ${i < review.rating ? 'filled' : 'empty'}`} 
            />  
          ))}  
        </div>  
      </div>  
      <p className="review-comment">{review.comment}</p>  
    </div>  
  );  
};  

export default ReviewCard;