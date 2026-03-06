/**
 * Cloudflare Pages Function: Verifikasi Turnstile Token
 * 
 * Endpoint: POST /api/verify-turnstile
 * Body: { token: string }
 * 
 * Fungsi ini memverifikasi token Turnstile di sisi server
 * untuk memastikan request berasal dari manusia, bukan bot.
 * 
 * Environment Variable yang diperlukan:
 * - TURNSTILE_SECRET_KEY: Secret key dari dashboard Cloudflare Turnstile
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    // CORS Headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    try {
        const { token } = await request.json();

        if (!token) {
            return new Response(
                JSON.stringify({ success: false, error: 'Token tidak ditemukan.' }),
                { status: 400, headers: corsHeaders }
            );
        }

        // Verifikasi token ke Cloudflare Turnstile API
        const verifyResponse = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret: env.TURNSTILE_SECRET_KEY,
                    response: token,
                    remoteip: request.headers.get('CF-Connecting-IP'),
                }),
            }
        );

        const result = await verifyResponse.json();

        if (result.success) {
            return new Response(
                JSON.stringify({ success: true }),
                { status: 200, headers: corsHeaders }
            );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Verifikasi gagal. Silakan coba lagi.',
                    codes: result['error-codes'],
                }),
                { status: 403, headers: corsHeaders }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Server error.' }),
            { status: 500, headers: corsHeaders }
        );
    }
}
