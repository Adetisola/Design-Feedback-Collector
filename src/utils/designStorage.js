/**
 * designStorage.js
 * Centralized helper for managing designs and their feedback in localStorage
 * 
 * Data Model:
 * Design {
 *   id: string (UUID),
 *   title: string,
 *   designerName: string | null,
 *   description: string,
 *   imageUrl: string,
 *   category: string,
 *   createdAt: ISO timestamp,
 *   feedback: Feedback[]
 * }
 * 
 * Feedback {
 *   id: string (UUID),
 *   authorName: string | null (null = anonymous),
 *   clarity: number (1-5),
 *   visualAppeal: number (1-5),
 *   brandFit: number (1-5),
 *   comment: string,
 *   createdAt: ISO timestamp
 * }
 */

const STORAGE_KEY = 'designs';

/**
 * Generate a unique ID using crypto.randomUUID() if available,
 * otherwise fallback to timestamp-based ID
 */
function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback: timestamp + random suffix for uniqueness
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all designs from localStorage
 * @returns {Array} Array of design objects
 */
export function getAllDesigns() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Get a single design by ID
 * @param {string} id - Design ID
 * @returns {Object|null} Design object or null if not found
 */
export function getDesignById(id) {
    const designs = getAllDesigns();
    return designs.find(design => design.id === id) || null;
}

/**
 * Add a new design (without feedback)
 * @param {Object} designData - { title, designerName, description, imageUrl, category }
 * @returns {Object} The newly created design object
 */
export function addDesign({ title, designerName, description, imageUrl, category }) {
    const designs = getAllDesigns();

    const newDesign = {
        id: generateId(),
        title,
        designerName: designerName?.trim() || null, // Trim whitespace, null if empty
        description,
        imageUrl,
        category,
        createdAt: new Date().toISOString(),
        feedback: []
    };

    designs.push(newDesign);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));

    return newDesign;
}

/**
 * Add feedback to a specific design
 * @param {string} designId - ID of the design
 * @param {Object} feedbackData - { authorName, clarity, visualAppeal, brandFit, comment }
 * @returns {Object} Updated design object
 */
export function addFeedbackToDesign(designId, { authorName, clarity, visualAppeal, brandFit, comment }) {
    const designs = getAllDesigns();
    const designIndex = designs.findIndex(d => d.id === designId);

    if (designIndex === -1) {
        throw new Error(`Design with ID ${designId} not found`);
    }

    const newFeedback = {
        id: generateId(),
        authorName: authorName || null, // Empty string becomes null (anonymous)
        clarity: parseInt(clarity),
        visualAppeal: parseInt(visualAppeal),
        brandFit: parseInt(brandFit),
        comment,
        createdAt: new Date().toISOString()
    };

    designs[designIndex].feedback.push(newFeedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));

    return designs[designIndex];
}

/**
 * Delete a design by ID
 * @param {string} id - Design ID
 * @returns {Array} Updated designs array
 */
export function deleteDesign(id) {
    const designs = getAllDesigns();
    const updatedDesigns = designs.filter(design => design.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDesigns));

    return updatedDesigns;
}

/**
 * Calculate average score for a design based on all feedback
 * @param {Object} design - Design object with feedback array
 * @returns {number} Average score (0 if no feedback)
 */
export function calculateDesignAverage(design) {
    if (!design.feedback || design.feedback.length === 0) {
        return 0;
    }

    const totalAverage = design.feedback.reduce((sum, feedback) => {
        const avg = (feedback.clarity + feedback.visualAppeal + feedback.brandFit) / 3;
        return sum + avg;
    }, 0);

    return Math.round((totalAverage / design.feedback.length) * 10) / 10;
}

/**
 * Calculate average score for a single feedback entry
 * @param {Object} feedback - Feedback object
 * @returns {number} Average score
 */
export function calculateFeedbackAverage(feedback) {
    const avg = (feedback.clarity + feedback.visualAppeal + feedback.brandFit) / 3;
    return Math.round(avg * 10) / 10;
}

/**
 * Sort feedback array by different criteria
 * @param {Array} feedbackArray - Array of feedback objects
 * @param {string} sortOrder - 'newest', 'oldest', 'highest', 'lowest'
 * @returns {Array} Sorted feedback array
 */
export function sortFeedback(feedbackArray, sortOrder = 'newest') {
    const copy = [...feedbackArray];

    switch (sortOrder) {
        case 'highest':
            return copy.sort((a, b) => {
                const avgA = (a.clarity + a.visualAppeal + a.brandFit) / 3;
                const avgB = (b.clarity + b.visualAppeal + b.brandFit) / 3;
                return avgB - avgA;
            });

        case 'lowest':
            return copy.sort((a, b) => {
                const avgA = (a.clarity + a.visualAppeal + a.brandFit) / 3;
                const avgB = (b.clarity + b.visualAppeal + b.brandFit) / 3;
                return avgA - avgB;
            });

        case 'oldest':
            // Sort by createdAt timestamp (ascending)
            return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        case 'newest':
        default:
            // Sort by createdAt timestamp (descending)
            return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
}
