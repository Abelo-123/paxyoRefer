"use client"
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'

const ReferralButton = () => {
  const [referralLink, setReferralLink] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase
        .from('users')
        .select('id')
        .eq('id', 100)
        .single(); // Assuming the email is unique

      if (user.data) {
        setUserEmail(user.data.id);
      }
    };

    fetchUser();
  }, []);

  const handleGenerateReferralLink = async () => {
    if (!userEmail) return;

    // Fetch or generate referral code if it doesn't exist
    const { data, error } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', 100)
      .single();

    if (error) {
      console.error('Error fetching referral code:', error);
      return;
    }

    let referralLink = data?.referral_code;

    if (!referralLink) {
      // Generate and update referral code if it doesn't exist
      referralLink = `${userEmail}-${Math.random().toString(36).substr(2, 9)}`;

      const { error: updateError } = await supabase
        .from('users')
        .update({ referral_code: referralLink })
        .eq('id', 100);

      if (updateError) {
        console.error('Error updating referral code:', updateError);
        return;
      }
    }

    // Show the generated referral link
    const referralUrl = `https://your-app-url.com/referral/${referralLink}`;
    setReferralLink(referralUrl);
  };

  return (
    <div>
      <button onClick={handleGenerateReferralLink}>Generate Referral Link</button>
      {referralLink && <p>Your referral link: <a href={referralLink}>{referralLink}</a></p>}
    </div>
  );
};

export default ReferralButton;
