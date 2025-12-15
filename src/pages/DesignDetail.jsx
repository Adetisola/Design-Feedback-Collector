import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDesignById, sortFeedback, calculateDesignAverage } from '../utils/designStorage';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackCard from '../components/FeedbackCard';

export default function DesignDetail() {
    const { id } = useParams();
    const [design, setDesign] = useState(null);
    const [sortOrder, setSortOrder] = useState('newest');

    const loadDesign = () => {
        const loadedDesign = getDesignById(id);
        setDesign(loadedDesign);
    };

    useEffect(() => {
        loadDesign();
    }, [id]);

    if (!design) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="glass rounded-3xl p-12 text-center">
                        <p className="text-white text-xl mb-4">Design not found</p>
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                        >
                            Back to Browse
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const sortedFeedback = sortFeedback(design.feedback || [], sortOrder);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span
                key={index}
                className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
            >
                ★
            </span>
        ));
    };

    const overallRating = calculateDesignAverage(design);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Browse
                </Link>

                {/* Design Header */}
                <div className="glass rounded-3xl overflow-hidden shadow-2xl mb-8">
                    {/* Large Image */}
                    <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                        <img
                            src={design.imageUrl}
                            alt={design.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="hidden w-full h-full items-center justify-center text-white text-lg">
                            Image unavailable
                        </div>
                    </div>

                    {/* Design Info */}
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    {design.title}
                                </h1>
                                <p className="text-lg text-gray-200 mb-4">
                                    {design.description}
                                </p>
                                <p className="text-sm text-white">
                                    Posted on {formatDate(design.createdAt)}
                                </p>
                            </div>

                            {/* Overall Rating */}
                            {design.feedback && design.feedback.length > 0 && (
                                <div className="glass rounded-2xl p-6 ml-6 min-w-[240px]">
                                    <p className="text-sm text-gray-300 mb-2 text-center">Overall Rating</p>
                                    <div className="text-center mb-3">
                                        <p className="text-4xl font-bold text-white">{overallRating.toFixed(1)}/5.0</p>
                                    </div>
                                    <div className="flex gap-1 justify-center">
                                        {renderStars(Math.round(overallRating))}
                                    </div>
                                    <p className="text-xs text-gray-200 mt-3 text-center">
                                        Based on {design.feedback.length} {design.feedback.length === 1 ? 'review' : 'reviews'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Feedback Form */}
                <FeedbackForm
                    designId={design.id}
                    onFeedbackSubmitted={loadDesign}
                />

                {/* Feedback List */}
                <div className="glass rounded-3xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Feedback ({design.feedback?.length || 0})
                        </h2>

                        {/* Sorting Dropdown */}
                        {design.feedback && design.feedback.length > 0 && (
                            <div className="glass rounded-xl px-4 py-2">
                                <label className="text-sm text-gray-200 mr-3">Sort by:</label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                                >
                                    <option value="newest" className="bg-gray-800">Newest First</option>
                                    <option value="oldest" className="bg-gray-800">Oldest First</option>
                                    <option value="highest" className="bg-gray-800">Highest Score</option>
                                    <option value="lowest" className="bg-gray-800">Lowest Score</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Feedback Cards or Empty State */}
                    {design.feedback && design.feedback.length > 0 ? (
                        <div className="space-y-4">
                            {sortedFeedback.map((feedback) => (
                                <FeedbackCard key={feedback.id} feedback={feedback} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-300 text-lg">No feedback yet</p>
                            <p className="text-gray-400 text-sm mt-2">
                                Be the first to share your thoughts!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
