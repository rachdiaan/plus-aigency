"use client";

import React, { useState, useEffect } from "react";
import { StudioDashboard } from "./StudioDashboard";
import { StudioLogin } from "./StudioLogin";
import { StudioLanding } from "./StudioLanding";
import { supabase } from "@/lib/supabase";

// Main App Component that manages high-level state (Auth, Routing)
// Theme is managed globally by src/components/ThemeProvider
const StudioApp = () => {
    const [view, setView] = useState<'landing' | 'login' | 'app'>('landing');

    // Sync auth state on mount and listen to changes
    useEffect(() => {
        if (!supabase) return;

        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setView('app');
            }
        });

        // Listen to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setView('app');
            } else {
                setView('landing');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        setView('landing');
    };

    return (
        <>
            {/* Main Content Area */}
            {view === 'landing' && <StudioLanding onStart={() => setView('login')} onLoginClick={() => setView('login')} />}
            {view === 'login' && <StudioLogin onLoginSuccess={() => setView('app')} onBack={() => setView('landing')} />}
            {view === 'app' && <StudioDashboard onLogout={handleLogout} />}
        </>
    );
};

export default StudioApp;
