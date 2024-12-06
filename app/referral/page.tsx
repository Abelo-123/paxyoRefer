"use client"
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Importing useSearchParams
import { supabase } from '@/lib/supabaseClient';

const ReferralPageContent = () => {
    const searchParams = useSearchParams(); // Access query parameters
    const referral_code = searchParams.get('referral_code'); // Get referral_code from the URL

    useEffect(() => {
        if (!referral_code) return; // If referral_code is not provided, exit early

        const handleReferral = async () => {
            // Get current user email or identifier
            const userEmail = 400;

            // Check if the user has already been referred
            const { data: existingUser, error } = await supabase
                .from('users')
                .select('referred_by')
                .eq('id', userEmail)
                .single();

            if (error) {
                console.error('Error updating referral:', error);
                return;
            }

            if (existingUser?.referred_by) return; // Already referred

            // Update the user with the referral code
            const { error: updateError } = await supabase
                .from('users')
                .update({ referred_by: referral_code })
                .eq('id', userEmail);

            if (updateError) {
                console.error('Error updating referral:', updateError);
                return;
            }

            // Increment the referral count of the referrer
            const { data: referrerData, error: countError } = await supabase
                .from('users')
                .select('referrals_count')
                .eq('referral_code', referral_code)
                .single();

            if (countError) {
                console.error('Error updating referral:', countError);
                return;
            } else {
                await supabase
                    .from('users')
                    .update({ referrals_count: referrerData.referrals_count + 1 })
                    .eq('referral_code', referral_code);
                console.log(9);
            }
        };

        handleReferral();
    }, [referral_code]); // Only rerun if referral_code changes

    return <div>Welcome to the Referral Page! Redirecting you...</div>;
};

const ReferralPage = () => {
    return (
        <Suspense fallback={<div>Loading referral information...</div>}>
            <ReferralPageContent />
        </Suspense>
    );
};

export default ReferralPage;
