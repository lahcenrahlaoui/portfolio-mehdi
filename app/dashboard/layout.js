import React from "react";
import { AuthProvider } from "./Providers";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthProvider>
                {/* Header */}
                <header className="bg-gray-900 text-white p-4">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow container mx-auto p-6">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white text-center p-4">
                    <p>© 2024 Your Company. All rights reserved.</p>
                </footer>
            </AuthProvider>
        </div>
    );
}
