"use client";

import React, { useState } from "react";
import { StudioDashboard } from "./StudioDashboard";
import { StudioLogin } from "./StudioLogin";
import { StudioLanding } from "./StudioLanding";

// Main App Component that manages high-level state (Auth, Routing)
// Theme is managed globally by src/components/ThemeProvider
const StudioApp = () => {
    const [view, setView] = useState<'landing' | 'login' | 'app'>('landing');

    return (
        <>
            {/* Main Content Area */}
            {view === 'landing' && <StudioLanding onStart={() => setView('login')} onLoginClick={() => setView('login')} />}
            {view === 'login' && <StudioLogin onLoginSuccess={() => setView('app')} onBack={() => setView('landing')} />}
            {view === 'app' && <StudioDashboard onLogout={() => setView('landing')} />}
        </>
    );
};

export default StudioApp;
