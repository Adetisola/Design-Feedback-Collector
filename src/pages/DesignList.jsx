import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDesigns, calculateDesignAverage } from '../utils/designStorage';

export default function DesignList() {
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        // Load all designs
        setDesigns(getAllDesigns());
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span
                key={index}
                className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
            >
                ★
            </span>
        ));
    };

    if (designs.length === 0) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">
                        Browse Designs
                    </h1>
                    <div className="glass rounded-3xl p-12 text-center">
                        <p className="text-white text-xl mb-2">No designs posted yet.</p>
                        <p className="text-gray-300">Be the first to share your design!</p>
                        <Link
                            to="/post-design"
                            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                        >
                            Post Design
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Browse Designs
                    </h1>
                    <div className="glass rounded-xl px-4 py-2">
                        <span className="text-white font-medium">
                            {designs.length} {designs.length === 1 ? 'Design' : 'Designs'}
                        </span>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {designs.map((design) => (
                        <Link
                            key={design.id}
                            to={`/designs/${design.id}`}
                            className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer"
                        >
                            {/* Image */}
                            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                                <img
                                    src={design.imageUrl}
                                    alt={design.title}
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
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {design.title}
                                </h3>
                                <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                                    {design.description}
                                </p>

                                {/* Feedback Count and Rating */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-blue-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {design.feedback?.length || 0} feedback
                                        </span>
                                    </div>

                                    {/* Overall Rating */}
                                    {design.feedback && design.feedback.length > 0 && (
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 mb-1">
                                                {renderStars(Math.round(calculateDesignAverage(design)))}
                                            </div>
                                            <p className="text-xs text-white font-medium">
                                                {calculateDesignAverage(design).toFixed(1)}/5.0
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
