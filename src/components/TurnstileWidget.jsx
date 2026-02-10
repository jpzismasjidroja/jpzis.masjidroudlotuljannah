import React, { useRef, useEffect } from 'react';

const TurnstileWidget = ({ onVerify }) => {
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

    useEffect(() => {
        // Wait for the Turnstile API to load
        const renderWidget = () => {
            if (!containerRef.current || !window.turnstile) return;

            // Clean up any existing widget before rendering a new one
            if (widgetIdRef.current !== null) {
                try {
                    window.turnstile.remove(widgetIdRef.current);
                } catch (e) {
                    // Ignore cleanup errors
                }
                widgetIdRef.current = null;
            }

            widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey: siteKey,
                callback: (token) => {
                    onVerify(token);
                },
                'expired-callback': () => {
                    onVerify(null);
                },
                'error-callback': () => {
                    onVerify(null);
                },
                theme: 'light',
            });
        };

        // Check if Turnstile is already loaded
        if (window.turnstile) {
            renderWidget();
        } else {
            // Poll until the script loads
            const interval = setInterval(() => {
                if (window.turnstile) {
                    clearInterval(interval);
                    renderWidget();
                }
            }, 200);

            return () => clearInterval(interval);
        }

        // Cleanup on unmount
        return () => {
            if (widgetIdRef.current !== null && window.turnstile) {
                try {
                    window.turnstile.remove(widgetIdRef.current);
                } catch (e) {
                    // Ignore cleanup errors
                }
                widgetIdRef.current = null;
            }
        };
    }, [siteKey, onVerify]);

    if (!siteKey) {
        return (
            <div className="text-sm text-red-500 p-3 bg-red-50 rounded-lg border border-red-200">
                ⚠️ Turnstile Site Key belum dikonfigurasi. Tambahkan VITE_TURNSTILE_SITE_KEY di file .env
            </div>
        );
    }

    return <div ref={containerRef} className="flex justify-center my-4"></div>;
};

export default TurnstileWidget;
