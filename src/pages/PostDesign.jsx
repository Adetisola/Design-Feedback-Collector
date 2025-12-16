import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDesign } from '../utils/designStorage';
import { CATEGORIES } from '../utils/categories';

export default function PostDesign() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        category: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Update image preview when URL changes
        if (name === 'imageUrl') {
            setImagePreview(value);
            setImageError(false);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add design to localStorage
        addDesign(formData);

        // Reset form
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            category: ''
        });
        setImagePreview('');

        // Navigate to design list
        navigate('/');
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="glass rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">
                        Post a New Design
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Design Title */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Design Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                placeholder="Enter design title"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Description
                                <span className="text-gray-300 text-xs ml-2">
                                    ({formData.description.length}/200 chars)
                                </span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                maxLength="200"
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl glass text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                                placeholder="Brief description of your design..."
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

                        {/* Category Dropdown */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Design Category <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl glass text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer"
                            >
                                <option value="" disabled className="bg-gray-800">
                                    Select a category
                                </option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat} className="bg-gray-800">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Image Preview
                                </label>
                                <div className="rounded-xl overflow-hidden glass">
                                    {!imageError ? (
                                        <img
                                            src={imagePreview}
                                            alt="Design preview"
                                            className="w-full h-64 object-cover"
                                            onError={handleImageError}
                                        />
                                    ) : (
                                        <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                                            <p className="text-white text-sm">
                                                Unable to load image. Please check the URL.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
                        >
                            Post Design
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
