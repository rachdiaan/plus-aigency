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
    const [user, setUser] = useState<any>(null);

    // Sync auth state on mount and listen to changes
    useEffect(() => {
        if (!supabase) return;

        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
                setView('app');
            }
        });

        // Listen to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser(session.user);
                setView('app');
            } else {
                setUser(null);
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
        setUser(null);
        setView('landing');
    };

    return (
        <>
            {/* Main Content Area */}
            {view === 'landing' && <StudioLanding onStart={() => setView('login')} onLoginClick={() => setView('login')} />}
            {view === 'login' && <StudioLogin onLoginSuccess={() => setView('app')} onBack={() => setView('landing')} />}
            {view === 'app' && <StudioDashboard onLogout={handleLogout} user={user} />}
        </>
    );
};

export default StudioApp;
