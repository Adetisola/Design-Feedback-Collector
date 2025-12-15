import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFeedback } from '../utils/feedbackStorage';

export default function SubmitFeedback() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        designName: '',
        imageUrl: '',
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

        // Save feedback using helper
        addFeedback(formData);

        // Reset form
        setFormData({
            designName: '',
            imageUrl: '',
            clarity: 3,
            visualAppeal: 3,
            brandFit: 3,
            comment: ''
        });

        // Navigate to view page
        navigate('/view');
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="glass rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">
                        Submit Design Feedback
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Design Name */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Design Name
                            </label>
                            <input
                                type="text"
                                name="designName"
                                value={formData.designName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                placeholder="Enter design name"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Design Image URL
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Clarity Rating */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Clarity Rating: {formData.clarity}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={formData.clarity}
                                onChange={(e) => handleSliderChange('clarity', e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-200 mt-1">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>
                        </div>

                        {/* Visual Appeal Rating */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Visual Appeal: {formData.visualAppeal}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={formData.visualAppeal}
                                onChange={(e) => handleSliderChange('visualAppeal', e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-200 mt-1">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>
                        </div>

                        {/* Brand Fit Rating */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Brand Fit: {formData.brandFit}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={formData.brandFit}
                                onChange={(e) => handleSliderChange('brandFit', e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-200 mt-1">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Write a Comment ✍️
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                                placeholder="Share your thoughts on this design..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
