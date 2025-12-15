import { useState, useEffect } from 'react';
import { getAllFeedback, deleteFeedback as removeFeedback } from '../utils/feedbackStorage';

export default function ViewFeedback() {
    const [feedback, setFeedback] = useState([]);
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'highest', 'lowest'

    useEffect(() => {
        // Load feedback using helper
        setFeedback(getAllFeedback());
    }, []);

    const handleDeleteFeedback = (id) => {
        const updatedFeedback = removeFeedback(id);
        setFeedback(updatedFeedback);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span
                key={index}
                className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
            >
                ★
            </span>
        ));
    };

    const calculateAverage = (item) => {
        const avg = (item.clarity + item.visualAppeal + item.brandFit) / 3;
        return Math.round(avg * 10) / 10; // Round to 1 decimal place
    };

    const getSortedFeedback = () => {
        const feedbackCopy = [...feedback];

        if (sortOrder === 'highest') {
            return feedbackCopy.sort((a, b) => {
                const avgA = (a.clarity + a.visualAppeal + a.brandFit) / 3;
                const avgB = (b.clarity + b.visualAppeal + b.brandFit) / 3;
                return avgB - avgA; // Highest first
            });
        }

        if (sortOrder === 'lowest') {
            return feedbackCopy.sort((a, b) => {
                const avgA = (a.clarity + a.visualAppeal + a.brandFit) / 3;
                const avgB = (b.clarity + b.visualAppeal + b.brandFit) / 3;
                return avgA - avgB; // Lowest first
            });
        }

        if (sortOrder === 'oldest') {
            return feedbackCopy.sort((a, b) => a.id - b.id); // Oldest first
        }

        // Default: newest first (sort by id/timestamp descending)
        return feedbackCopy.sort((a, b) => b.id - a.id);
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Design Feedback Collection
                </h1>

                {feedback.length === 0 ? (
                    <div className="glass rounded-3xl p-12 text-center">
                        <p className="text-white text-xl">No feedback submitted yet.</p>
                        <p className="text-gray-300 mt-2">Submit your first design feedback to see it here!</p>
                    </div>
                ) : (
                    <>
                        {/* Sorting Controls */}
                        <div className="mb-6 flex justify-end">
                            <div className="glass rounded-xl px-4 py-2">
                                <label className="text-sm text-gray-200 mr-3">Sort by:</label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                                >
                                    <option value="default" className="bg-gray-800">Newest First</option>
                                    <option value="oldest" className="bg-gray-800">Oldest First</option>
                                    <option value="highest" className="bg-gray-800">Highest Score</option>
                                    <option value="lowest" className="bg-gray-800">Lowest Score</option>
                                </select>
                            </div>
                        </div>

                        {/* Feedback Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {getSortedFeedback().map((item) => (
                                <div key={item.id} className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02]">
                                    {/* Image */}
                                    <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.designName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden w-full h-full items-center justify-center text-white text-sm">
                                            Image unavailable
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">{item.designName}</h3>

                                        {/* Average Score */}
                                        <div className="mb-4 pb-4 border-b border-white/20">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-200 font-medium">Overall Score</span>
                                                <span className="text-lg text-white font-bold">{calculateAverage(item).toFixed(1)}/5.0</span>
                                            </div>
                                            <div className="flex gap-1">
                                                {renderStars(Math.round(calculateAverage(item)))}
                                            </div>
                                        </div>

                                        {/* Ratings */}
                                        <div className="space-y-3 mb-4">
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm text-gray-200">Clarity</span>
                                                    <span className="text-sm text-white font-semibold">{item.clarity}/5</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    {renderStars(item.clarity)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm text-gray-200">Visual Appeal</span>
                                                    <span className="text-sm text-white font-semibold">{item.visualAppeal}/5</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    {renderStars(item.visualAppeal)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm text-gray-200">Brand Fit</span>
                                                    <span className="text-sm text-white font-semibold">{item.brandFit}/5</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    {renderStars(item.brandFit)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comment */}
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-200 leading-relaxed">{item.comment}</p>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteFeedback(item.id)}
                                            className="w-full bg-red-500/30 hover:bg-red-500/50 text-red-200 font-medium py-2 rounded-lg transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
