import { useState } from 'react';
import { addFeedbackToDesign } from '../utils/designStorage';

export default function FeedbackForm({ designId, onFeedbackSubmitted }) {
    const [formData, setFormData] = useState({
        authorName: '',
        clarity: 3,
        visualAppeal: 3,
        brandFit: 3,
        comment: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add feedback to design
        addFeedbackToDesign(designId, formData);

        // Reset form
        setFormData({
            authorName: '',
            clarity: 3,
            visualAppeal: 3,
            brandFit: 3,
            comment: ''
        });

        // Notify parent to refresh feedback list
        if (onFeedbackSubmitted) {
            onFeedbackSubmitted();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Leave Feedback</h3>

            {/* Author Name (Optional) */}
            <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                    Your Name (Optional)
                </label>
                <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Leave empty to post anonymously"
                />
                <p className="text-xs text-gray-300 mt-1">
                    Leave empty to post as Anonymous
                </p>
            </div>

            {/* Rating Sliders */}
            <div className="space-y-6 mb-6">
                {/* Clarity */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-white font-medium">Clarity</label>
                        <span className="text-blue-300 font-bold">{formData.clarity}/5</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.clarity}
                        onChange={(e) => handleSliderChange('clarity', e.target.value)}
                        className="w-full slider"
                    />
                </div>

                {/* Visual Appeal */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-white font-medium">Visual Appeal</label>
                        <span className="text-blue-300 font-bold">{formData.visualAppeal}/5</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.visualAppeal}
                        onChange={(e) => handleSliderChange('visualAppeal', e.target.value)}
                        className="w-full slider"
                    />
                </div>

                {/* Brand Fit */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-white font-medium">Brand Fit</label>
                        <span className="text-blue-300 font-bold">{formData.brandFit}/5</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.brandFit}
                        onChange={(e) => handleSliderChange('brandFit', e.target.value)}
                        className="w-full slider"
                    />
                </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                    Comment
                </label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                    placeholder="Share your thoughts about this design..."
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
            >
                Submit Feedback
            </button>
        </form>
    );
}
