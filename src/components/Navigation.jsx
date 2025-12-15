import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        🎨 Design Feedback
                    </div>

                    <div className="flex gap-4">
                        <Link
                            to="/"
                            className={`px-6 py-2 rounded-xl font-medium transition-all ${isActive('/')
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'text-white hover:bg-white/20'
                                }`}
                        >
                            Browse Designs
                        </Link>
                        <Link
                            to="/post-design"
                            className={`px-6 py-2 rounded-xl font-medium transition-all ${isActive('/post-design')
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'text-white hover:bg-white/20'
                                }`}
                        >
                            Post Design
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
