import { calculateFeedbackAverage } from '../utils/designStorage';

export default function FeedbackCard({ feedback }) {
    const average = calculateFeedbackAverage(feedback);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span
                key={index}
                className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
            >
                ★
            </span>
        ));
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffInMs = now - then;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return then.toLocaleDateString();
    };

    return (
        <div className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            {/* Header: Author and Average Score */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className={`text-sm font-medium ${feedback.authorName ? 'text-white' : 'text-gray-400 italic'}`}>
                        {feedback.authorName || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {getTimeAgo(feedback.createdAt)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-white">{average.toFixed(1)}/5.0</p>
                    <div className="flex gap-0.5 mt-1">
                        {renderStars(Math.round(average))}
                    </div>
                </div>
            </div>

            {/* Individual Ratings */}
            <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-white/10">
                <div className="text-center">
                    <p className="text-xs text-gray-300 mb-1">Clarity</p>
                    <p className="text-sm font-semibold text-white">{feedback.clarity}/5</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-300 mb-1">Visual</p>
                    <p className="text-sm font-semibold text-white">{feedback.visualAppeal}/5</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-300 mb-1">Brand</p>
                    <p className="text-sm font-semibold text-white">{feedback.brandFit}/5</p>
                </div>
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-200 leading-relaxed">
                {feedback.comment}
            </p>
        </div>
    );
}
