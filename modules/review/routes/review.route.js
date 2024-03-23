import { Router } from "express";


const router = Router();
// Routes for reviews
router.get('/:productId', ); // Get all reviews for a product
router.post('/:productId', /* middleware for authentication */); // Create a new review (requires authentication)

// Add other review routes here (optional)
router.get('/:reviewId', ); // Get a specific review
router.patch('/:reviewId', ); // Update a review
router.delete('/:reviewId', ); // Delete a review