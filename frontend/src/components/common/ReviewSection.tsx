import React, { useState } from 'react';
import { Star, User, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import RatingStars from './RatingStars';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
}

interface ReviewSectionProps {
  businessId: string;
  businessName: string;
  currentRating: number;
  reviewCount: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  businessId,
  businessName,
  currentRating,
  reviewCount
}) => {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      comment: 'Excellent service and great atmosphere! Highly recommended.',
      date: '2024-01-15',
      helpful: 12,
      notHelpful: 1
    },
    {
      id: '2',
      userName: 'Sarah Smith',
      rating: 4,
      comment: 'Good food and friendly staff. The wait time was a bit long but worth it.',
      date: '2024-01-10',
      helpful: 8,
      notHelpful: 0
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      rating: 3,
      comment: 'Average experience. The location is convenient but the service could be better.',
      date: '2024-01-05',
      helpful: 3,
      notHelpful: 2
    }
  ]);

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = async () => {
    if (newReviewRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive"
      });
      return;
    }

    if (newReviewComment.trim().length < 10) {
      toast({
        title: "Comment too short",
        description: "Please write at least 10 characters in your review.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. Your review will be published after moderation."
      });
      
      setNewReviewRating(0);
      setNewReviewComment('');
      setShowWriteReview(false);
      setIsSubmitting(false);
    }, 1500);
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse(); // 5 stars first
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {currentRating.toFixed(1)}
            </div>
            <RatingStars rating={currentRating} size="lg" />
            <p className="text-muted-foreground mt-2">
              Based on {reviewCount} reviews
            </p>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm w-6">{stars}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ 
                      width: `${reviews.length > 0 ? (ratingDistribution[index] / reviews.length) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <Button 
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="w-full md:w-auto"
          >
            Write a Review
          </Button>
        </div>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Rating
              </label>
              <RatingStars
                rating={newReviewRating}
                interactive
                onRatingChange={setNewReviewRating}
                size="lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Review
              </label>
              <Textarea
                placeholder={`Share your experience with ${businessName}...`}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 10 characters ({newReviewComment.length}/10)
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="flex-1 md:flex-initial"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowWriteReview(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Recent Reviews</h4>
        
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium">{review.userName}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3">{review.comment}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsDown className="w-3 h-3" />
                    Not helpful ({review.notHelpful})
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;