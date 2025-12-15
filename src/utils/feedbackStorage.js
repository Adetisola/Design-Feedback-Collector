/**
 * feedbackStorage.js
 * Centralized helper for managing design feedback in localStorage
 */

const STORAGE_KEY = 'designFeedback';

/**
 * Get all feedback items from localStorage
 * @returns {Array} Array of feedback objects
 */
export function getAllFeedback() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Add new feedback to localStorage
 * @param {Object} feedback - Feedback data (without id and timestamp)
 * @returns {Object} The new feedback object with id and timestamp added
 */
export function addFeedback(feedback) {
    const existingFeedback = getAllFeedback();

    const newFeedback = {
        ...feedback,
        id: Date.now(),
        timestamp: new Date().toISOString()
    };

    existingFeedback.push(newFeedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingFeedback));

    return newFeedback;
}

/**
 * Delete feedback by id
 * @param {number} id - The id of the feedback to delete
 * @returns {Array} Updated array of feedback items
 */
export function deleteFeedback(id) {
    const existingFeedback = getAllFeedback();
    const updatedFeedback = existingFeedback.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedback));

    return updatedFeedback;
}
