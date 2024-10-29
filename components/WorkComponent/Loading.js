export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="relative flex items-center justify-center">
                {/* Pulsing Circle Animation */}
                <div className="w-16 h-16 rounded-full bg-gray-400 opacity-75 animate-ping absolute"></div>
                <div className="w-16 h-16 rounded-full bg-gray-600"></div>
            </div>

            {/* Styles */}
            <style jsx>{`
                .animate-ping {
                    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                @keyframes ping {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    75% {
                        transform: scale(2);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
