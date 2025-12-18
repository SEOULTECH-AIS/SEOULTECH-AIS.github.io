import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <AnimatedRoutes />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
