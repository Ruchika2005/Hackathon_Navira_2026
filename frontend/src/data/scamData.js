import { PhoneCall, Zap, Award, ShieldAlert, Cpu } from 'lucide-react';

export const SCAM_SCENARIOS = [
    {
        id: 'voice-cloning',
        title: 'AI Voice Cloning',
        description: 'Someone pretending to be a family member in an emergency calls asking for urgent financial help.',
        icon: Cpu,
        color: 'rose',
        startMessage: 'HELP! I am at the police station. I had an accident and they are asking for fine money immediately or they will lock me up! Please send ₹20,000 to this UPI ID right now!',
        redFlags: [
            'Urgent emotional pressure',
            'Request for immediate money transfer',
            'Voice sounds slightly robotic or unnatural',
            'Unknown UPI ID or account'
        ]
    },
    {
        id: 'electricity-bill',
        title: 'Electricity Bill Scam',
        description: 'A fake official warns that your power will be cut off tonight unless you pay a pending fee.',
        icon: Zap,
        color: 'amber',
        startMessage: 'Dear Consumer, your electricity connection will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Please contact our officer at 98765-XXXXX immediately.',
        redFlags: [
            'Threat of service disconnection',
            'Grammar errors in the message',
            'Sent from a private mobile number, not official ID',
            'Requirement to call a specific personal number'
        ]
    },
    {
        id: 'whatsapp-gift',
        title: 'WhatsApp Gift Scam',
        description: 'You receive a message claiming you won a lucky draw or a luxury gift from a famous brand.',
        icon: Award,
        color: 'emerald',
        startMessage: 'CONGRATULATIONS! You have been selected as the lucky winner of a NEW iPhone 15 and ₹50,000 cash prize from Amazon Lucky Draw! To claim your gift, click here: bit.ly/claim-your-gift',
        redFlags: [
            'Too good to be true',
            'Shortened suspicious links (bit.ly, etc.)',
            'Request for "processing fee" or "tax"',
            'Unofficial sender identity'
        ]
    },
    {
        id: 'bank-kyc',
        title: 'Bank KYC Threat',
        description: 'A scammer pretending to be a bank manager claims your account is blocked and needs OTP.',
        icon: ShieldAlert,
        color: 'indigo',
        startMessage: 'IMPORTANT: Your HDFC Bank account has been temporarily blocked due to pending KYC. To avoid permanent closure, please verify your ownership by sharing the 6-digit OTP sent to your mobile.',
        redFlags: [
            'Banks NEVER ask for OTP over chat/call',
            'Language used creates panic',
            'Request for sensitive security codes',
            'Sent from a personal mobile number'
        ]
    }
];
