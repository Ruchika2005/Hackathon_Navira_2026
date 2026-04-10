export const quizData = {
  phishing: {
    english: [
      {
        id: 1,
        badgeColor: '#dc2626',
        email: {
          subject: 'URGENT: Account Suspension Notice',
          from: 'HDFC Bank Alerts',
          fromEmail: 'alerts@hdfc-secure.co',
          logo: true,
          body: [
            'Dear Customer,',
            '',
            'We have detected unusual activity in your account.',
            'Your account will be suspended within 24 hours unless verified.',
            '',
          ],
          cta: { text: '👉 Click here to verify immediately', href: null },
          footer: '— HDFC Bank Team',
        },
        question: 'What should you do?',
        options: [
          {
            text: 'Click the link quickly',
            correct: false,
            customFeedback: 'Do not click links in panic emails. Scammers create urgency so you act without thinking. Clicking this link could take you to a fake website that steals your bank login. Always go to your bank app directly.',
          },
          {
            text: 'Verify using official banking app/website',
            correct: true,
            customFeedback: 'Well done you spotted this. Whenever you get a scary email about your account, open your bank app yourself or call the official bank number. Never trust a link sent in an email, even if it looks real.',
          },
          {
            text: 'Reply to the email',
            correct: false,
            customFeedback: 'Do not reply to this email. Replying confirms to the scammer that your email is active, which leads to more attacks. A real bank never asks you to reply to fix your account.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This email has a very suspicious sender address that does not match a real bank. Real banks use addresses ending in hdfcbank.com, not hdfc-secure.co.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'Urgency is used to create panic.',
            'Always verify through official apps, not email links.',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#dc2626',
        email: {
          subject: 'Secure Login Notification',
          from: 'HDFC Support',
          fromEmail: 'support@hdfc-secure-login.xyz',
          logo: false,
          body: [
            'Dear Ruchika,',
            '',
            'Your account requires immediate login verification.',
            '',
          ],
          cta: null,
          footer: '— Support Team',
        },
        question: 'What is the red flag here?',
        options: [
          {
            text: 'Uses your name',
            correct: false,
            customFeedback: 'Do not ignore this message. Using your name does not make an email safe. Scammers can easily find your name from leaked data or social media. Always look at the sender email address, not just your name.',
          },
          {
            text: 'Suspicious email domain (.xyz)',
            correct: true,
            customFeedback: 'Well done you spotted this. The sender email ends in .xyz which is not a real bank domain. The official HDFC email always ends with hdfcbank.com. Any other ending is a warning sign.',
          },
          {
            text: 'Mentions login',
            correct: false,
            customFeedback: 'Do not ignore this message. Mentioning login alone is not the problem here. The real danger is the fake email domain .xyz. Always check the full email address of the sender before trusting the message.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. There is a major issue here. The sender email ends with .xyz which is not HDFCs official domain. Real bank emails come from hdfcbank.com only. This is clearly a phishing attempt.',
          },
        ],
        feedback: {
          icon: '🚨',
          lines: [
            'Always check the sender domain carefully.',
            'Fake domains often look similar but are NOT official.',
            'Real HDFC email → @hdfcbank.com, not .xyz or -secure-login',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#b45309',
        email: {
          subject: 'KYC Update Required',
          from: 'HDFC Bank',
          fromEmail: 'kyc@hdfcbank.co',
          logo: true,
          body: [
            'Dear Customer,',
            '',
            'Your KYC is pending. Please update immediately.',
            '',
          ],
          hoverLink: {
            display: '👉 Update KYC Now',
            realUrl: 'http://hdfcbank.verify-now.net',
          },
          cta: null,
          footer: '— HDFC Bank',
        },
        question: 'What is suspicious here?',
        options: [
          {
            text: 'It mentions KYC',
            correct: false,
            customFeedback: 'Do not ignore this message. KYC updates are real but scammers misuse them. The real danger here is the hidden link. If you hover over the Update KYC button you will see it leads to a fake website, not an official HDFC page.',
          },
          {
            text: 'Link leads to fake domain',
            correct: false,
            customFeedback: 'Do not ignore this message. You are on the right track but the specific trick here is that the link text looks real while the actual destination is a fake domain. Always hover before clicking to reveal the real destination.',
          },
          {
            text: 'Hidden link mismatch (hover to see!)',
            correct: true,
            customFeedback: 'Well done you spotted this. The button says Update KYC Now but hovering reveals the real link goes to hdfcbank.verify-now.net which is not an official domain. Scammers hide dangerous URLs behind friendly button text. Always hover before you click.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. There is a serious risk here. The button in this email hides a fake URL. Try hovering over the Update KYC Now button and you will see it leads to a suspicious website. Never click email links for KYC updates.',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'Always check the real link behind buttons.',
            'Scammers hide fake URLs behind trusted text.',
            'Hover over any link before you click it!',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#dc2626',
        email: {
          subject: 'Action Required: Account Verification Pending',
          from: 'HDFC Bank Support',
          fromEmail: 'support@hdfcbank-secure.co',
          logo: true,
          body: [
            'Dear Ruchika,',
            '',
            'Please download the attached file to complete verification.',
            '',
          ],
          attachment: 'Account_Verification.exe',
          cta: null,
          footer: '— Security Team',
        },
        question: 'What is the biggest red flag?',
        options: [
          {
            text: 'It mentions verification',
            correct: false,
            customFeedback: 'Do not ignore this message. Verification requests can be real but this email contains a far more dangerous threat. There is an executable .exe file attached. Banks never send any kind of file for verification via email.',
          },
          {
            text: 'There is an attachment',
            correct: false,
            customFeedback: 'Do not ignore this message. An attachment is suspicious but the specific danger is the file type. It is a .exe file which is a program that can take control of your device if opened. This is the biggest red flag here.',
          },
          {
            text: 'Executable (.exe) file attached',
            correct: true,
            customFeedback: 'Well done you spotted this. A .exe file is a program file that can install malware or ransomware on your device the moment you open it. Banks never send .exe files. Delete this email immediately and do not click the attachment.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This email is very dangerous. It contains a .exe program file as an attachment. Opening it could install a virus on your phone or computer. Banks never send program files. Delete this immediately.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'Never download .exe files from emails.',
            'They can install malware or ransomware on your device.',
            'Banks NEVER send .exe files.',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#dc2626',
        email: {
          subject: 'Important: Secure Your Account',
          from: 'HDFC Security',
          fromEmail: 'security@hdfcbank.co',
          logo: true,
          body: [
            'Dear Ruchika,',
            '',
            'We detected suspicious activity.',
            'Please reply with your OTP or UPI PIN immediately.',
            '',
          ],
          cta: null,
          footer: '— Security Team',
        },
        question: 'What is the biggest red flag?',
        options: [
          {
            text: 'Personalised email with your name',
            correct: false,
            customFeedback: 'Do not ignore this message. Your name alone does not make this email safe. The real danger is buried in the body of the email where it asks for your OTP and UPI PIN. No real organization ever asks for these in an email.',
          },
          {
            text: 'It is a security alert',
            correct: false,
            customFeedback: 'Do not ignore this message. Security alerts can be real but the content of this one reveals it is a scam. The message specifically asks for your OTP or UPI PIN which no bank or service ever requests.',
          },
          {
            text: 'Asking for OTP/PIN via email',
            correct: true,
            customFeedback: 'Well done you spotted this. No bank, app, or any legitimate service will ever ask for your OTP or UPI PIN via email or phone. Sharing your PIN gives the scammer complete access to your money. Delete this email immediately.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This email asks you to share your OTP and UPI PIN. This is the biggest possible red flag. No bank will ever ask for these. If you share them, a scammer can steal all your money instantly.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'Banks NEVER ask for OTP or PIN.',
            'No legitimate company will ever ask you to reply with your PIN.',
            'This is always a scam — hang up / delete immediately.',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#b45309',
        email: {
          subject: 'Update Your Contact Details',
          from: 'HDFC Bank',
          fromEmail: 'noreply@hdfcbank-support.com',
          logo: true,
          showLogoWarning: true,
          body: [
            'Dear Ruchika,',
            '',
            'We request you to update your contact details to avoid service interruptions.',
            '',
          ],
          plainLink: 'https://hdfcbank-support.com/update-details',
          cta: null,
          footer: '— HDFC Bank',
        },
        question: 'What is suspicious?',
        options: [
          {
            text: 'Email domain is slightly wrong',
            correct: false,
            customFeedback: 'Do not ignore this message. You noticed something important, but the more complete answer is that both the sender domain and the link in the email belong to hdfcbank-support.com which looks real but is a fake domain designed to trick you.',
          },
          {
            text: 'Suspicious link domain',
            correct: false,
            customFeedback: 'Do not ignore this message. The link domain is suspicious but the even bigger issue is that the entire presentation looks like HDFC but the domain hdfcbank-support.com is not official. The official HDFC website is hdfcbank.com only.',
          },
          {
            text: 'Looks like real bank — but domain has extra words',
            correct: true,
            customFeedback: 'Well done you spotted this. The email and link look very professional and the logo appears real but the domain hdfcbank-support.com is not official. Real HDFC uses hdfcbank.com. The extra word support makes it a completely different and fake website.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This email looks very convincing but the domain hdfcbank-support.com is not a real HDFC domain. The real HDFC website is hdfcbank.com. Extra words in a domain name are a sign of phishing.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'Phishing links often look very real at first glance.',
            'Always check the MAIN domain carefully.',
            '"hdfcbank-support.com" is not "hdfcbank.com" — extra words = danger!',
          ],
        },
      },
      {
        id: 7,
        badgeColor: '#dc2626',
        email: {
          subject: 'Final Warning: Account Access Restricted',
          from: 'Bank Alerts',
          fromEmail: 'alerts@secure-bank-login.net',
          logo: false,
          body: [
            'Dear Customer,',
            '',
            'This is your FINAL WARNING.',
            'Your account will be permanently restricted if you don\'t act NOW.',
            '',
          ],
          plainLink: 'http://secure-bank-login.net/resolve-now',
          cta: null,
          footer: '— Account Team',
        },
        question: 'What is suspicious?',
        options: [
          {
            text: 'Threatening language only',
            correct: false,
            customFeedback: 'Do not ignore this message. The threatening language is one red flag but it is more dangerous combined with the suspicious link in the email. Scammers use fear to push you toward clicking that link without thinking.',
          },
          {
            text: 'Unknown sender domain only',
            correct: false,
            customFeedback: 'Do not ignore this message. The unknown domain is a major red flag but the email also uses extreme fear language like FINAL WARNING. Scammers always combine pressure with fake links to make the attack more effective.',
          },
          {
            text: 'Pressure + suspicious link together',
            correct: true,
            customFeedback: 'Well done you spotted this. This email uses fear language FINAL WARNING combined with a suspicious link secure-bank-login.net. Real banks never send ultimatums this way. When you feel pressured to act fast online, always pause and verify through official channels.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This email is a classic scam. It uses threatening words combined with a suspicious link that is not from any official bank. Never click links in scary emails. Call your bank directly on their official number if worried.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'Scammers use fear + urgency + fake links together.',
            'Real banks don\'t force immediate action via random links.',
            'When in doubt — call your bank directly on their official number.',
          ],
        },
      },
      {
        id: 8,
        badgeColor: '#1d4ed8',
        email: {
          subject: 'Your Account Statement is Ready',
          from: 'HDFC NetBanking',
          fromEmail: 'statement@hdfcnetbank-online.co.in',
          logo: false,
          body: [
            'Dear Valued Customer,',
            '',
            'Your monthly account statement is ready.',
            'Click below to download your statement now.',
            '',
          ],
          hoverLink: {
            display: '📥 Download Statement',
            realUrl: 'http://hdfcnetbank-online.co.in/stmt.exe',
          },
          footer: '— HDFC NetBanking Team',
        },
        question: 'How many red flags can you spot?',
        options: [
          {
            text: 'Only the domain is suspicious',
            correct: false,
            customFeedback: 'Do not ignore this message. You spotted one red flag, well done. But there is a second danger. If you hover over the Download Statement button you will see the link also leads to a .exe program file, not a PDF. Both domain and file type are dangerous together.',
          },
          {
            text: 'Only the file type is suspicious',
            correct: false,
            customFeedback: 'Do not ignore this message. You noticed the dangerous .exe file which is a good catch. But there is another red flag too. The sender domain hdfcnetbank-online.co.in is not an official HDFC domain. Both issues together make this very dangerous.',
          },
          {
            text: 'Domain is fake AND link leads to .exe file',
            correct: true,
            customFeedback: 'Well done you spotted this. There are two red flags here. First the sender domain hdfcnetbank-online.co.in is fake and not from HDFC. Second hovering over the download button reveals the link leads to a .exe program file, not a PDF. Bank statements are always PDF files, never .exe.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This email has two major problems. The sender domain is fake and the download link leads to a .exe program file. A bank statement is always a PDF. If you download and open a .exe file it can take control of your device.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'Multiple red flags: fake domain + .exe hidden behind a button.',
            'Statements are NEVER .exe files.',
            'Always check BOTH the sender domain AND where links lead.',
          ],
        },
      },
    ],
    hindi: [
      {
        id: 1,
        badgeColor: '#dc2626',
        email: {
          subject: 'अत्यंत महत्वपूर्ण: खाता निलंबन सूचना',
          from: 'HDFC Bank Alerts',
          fromEmail: 'alerts@hdfc-secure.co',
          logo: true,
          body: [
            'प्रिय ग्राहक,',
            '',
            'हमें आपके खाते में संदिग्ध गतिविधि मिली है।',
            'यदि 24 घंटे के भीतर सत्यापन नहीं किया गया, तो आपका खाता निलंबित कर दिया जाएगा।',
            '',
          ],
          cta: { text: '👉 तुरंत सत्यापित करने के लिए यहाँ क्लिक करें', href: null },
          footer: '— एचडीएफसी बैंक टीम',
        },
        question: 'आपको क्या करना चाहिए?',
        options: [
          {
            text: 'लिंक पर जल्दी से क्लिक करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। घबराहट भरे ईमेल में लिंक पर क्लिक न करें। ठग जल्दबाजी इसलिए पैदा करते हैं ताकि आप बिना सोचे काम करें। यह लिंक आपको एक नकली वेबसाइट पर ले जा सकता है जो आपकी बैंक जानकारी चुरा लेती है।',
          },
          {
            text: 'आधिकारिक बैंकिंग ऐप/वेबसाइट का उपयोग करके सत्यापित करें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। जब भी खाते के बारे में डरावनी ईमेल मिले, खुद बैंक ऐप खोलें या आधिकारिक नंबर पर कॉल करें। ईमेल में दिए लिंक पर कभी भरोसा न करें, चाहे वह कितना भी असली लगे।',
          },
          {
            text: 'ईमेल का उत्तर दें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस ईमेल का जवाब न दें। जवाब देने से ठग को पता चल जाता है कि आपकी ईमेल सक्रिय है, जिससे और हमले होते हैं। असली बैंक कभी आपसे ईमेल का जवाब देकर खाता ठीक करने नहीं कहते।',
          },
          {
            text: 'यहाँ कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यहाँ बड़ी समस्या है। भेजने वाले का ईमेल पता hdfc-secure.co है जो असली बैंक का डोमेन नहीं है। असली एचडीएफसी ईमेल हमेशा hdfcbank.com से आता है।',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'जल्दबाजी और डर का उपयोग घबराहट पैदा करने के लिए किया जाता है।',
            'हमेशा आधिकारिक ऐप के माध्यम से जांचें, ईमेल लिंक से नहीं।',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#dc2626',
        email: {
          subject: 'सुरक्षित लॉगिन सूचना',
          from: 'HDFC Support',
          fromEmail: 'support@hdfc-secure-login.xyz',
          logo: false,
          body: [
            'प्रिय रुचिका,',
            '',
            'आपके खाते को तत्काल लॉगिन सत्यापन की आवश्यकता है।',
            '',
          ],
          cta: null,
          footer: '— सहायता टीम',
        },
        question: 'यहाँ "खतरे की घंटी" (Red Flag) क्या है?',
        options: [
          {
            text: 'आपके नाम का उपयोग करता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आपका नाम अकेले ईमेल को सुरक्षित नहीं बनाता। ठग लीक हुए डेटा या सोशल मीडिया से आपका नाम आसानी से जान सकते हैं। हमेशा भेजने वाले का पूरा ईमेल पता देखें।',
          },
          {
            text: 'संदिग्ध ईमेल डोमेन (.xyz)',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। भेजने वाले का ईमेल .xyz पर समाप्त होता है जो असली बैंक डोमेन नहीं है। आधिकारिक एचडीएफसी ईमेल हमेशा hdfcbank.com से आता है। कोई भी अन्य एक्सटेंशन चेतावनी का संकेत है।',
          },
          {
            text: 'लॉगिन का उल्लेख करता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। केवल लॉगिन का उल्लेख समस्या नहीं है। असली खतरा .xyz डोमेन है। किसी भी संदेश पर भरोसा करने से पहले भेजने वाले का पूरा ईमेल पता जाँचें।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यहाँ बड़ी समस्या है। भेजने वाले का ईमेल .xyz पर समाप्त होता है जो एचडीएफसी का आधिकारिक डोमेन नहीं है। असली बैंक ईमेल केवल hdfcbank.com से आते हैं।',
          },
        ],
        feedback: {
          icon: '🚨',
          lines: [
            'हमेशा भेजने वाले के डोमेन की सावधानीपूर्वक जांच करें।',
            'नकली डोमेन अक्सर असली जैसे दिखते हैं लेकिन आधिकारिक नहीं होते।',
            'असली एचडीएफसी ईमेल @hdfcbank.com से आता है, .xyz से नहीं।',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#b45309',
        email: {
          subject: 'केवाईसी अपडेट आवश्यक',
          from: 'HDFC Bank',
          fromEmail: 'kyc@hdfcbank.co',
          logo: true,
          body: [
            'प्रिय ग्राहक,',
            '',
            'आपका केवाईसी (KYC) लंबित है। कृपया तुरंत अपडेट करें।',
            '',
          ],
          hoverLink: {
            display: '👉 अभी KYC अपडेट करें',
            realUrl: 'http://hdfcbank.verify-now.net',
          },
          cta: null,
          footer: '— एचडीएफसी बैंक',
        },
        question: 'यहाँ क्या संदिग्ध है?',
        options: [
          {
            text: 'यह केवाईसी का उल्लेख करता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। केवाईसी अपडेट असली हो सकते हैं लेकिन यहाँ असली खतरा छिपा हुआ लिंक है। केवाईसी अपडेट बटन के पीछे एक नकली वेबसाइट का लिंक है, कोई आधिकारिक पेज नहीं।',
          },
          {
            text: 'लिंक नकली डोमेन पर ले जाता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आप सही दिशा में हैं लेकिन विशेष चाल यह है कि लिंक का टेक्स्ट असली दिखता है जबकि असली गंतव्य एक नकली डोमेन है। क्लिक करने से पहले होवर करके असली लिंक देखें।',
          },
          {
            text: 'छिपे हुए लिंक का मेल न खाना (देखने के लिए ऊपर माउस लाएं!)',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। बटन पर KYC अपडेट लिखा है लेकिन होवर करने पर असली लिंक hdfcbank.verify-now.net दिखता है जो आधिकारिक डोमेन नहीं है। ठग भरोसेमंद बटन के पीछे खतरनाक लिंक छिपाते हैं। क्लिक से पहले हमेशा होवर करें।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस ईमेल में गंभीर खतरा है। केवाईसी अपडेट बटन के पीछे एक नकली यूआरएल छिपा है। केवाईसी अपडेट के लिए ईमेल लिंक पर कभी क्लिक न करें।',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'हमेशा बटनों के पीछे के असली लिंक की जांच करें।',
            'ठग असली लगने वाले टेक्स्ट के पीछे नकली यूआरएल छिपाते हैं।',
            'किसी भी लिंक पर क्लिक करने से पहले उसे ध्यान से देखें!',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#dc2626',
        email: {
          subject: 'कार्रवाई आवश्यक: खाता सत्यापन लंबित',
          from: 'HDFC Bank Support',
          fromEmail: 'support@hdfcbank-secure.co',
          logo: true,
          body: [
            'प्रिय रुचिका,',
            '',
            'सत्यापन पूरा करने के लिए कृपया संलग्न फ़ाइल डाउनलोड करें।',
            '',
          ],
          attachment: 'Account_Verification.exe',
          cta: null,
          footer: '— सुरक्षा टीम',
        },
        question: 'सबसे बड़ी खतरे की घंटी क्या है?',
        options: [
          {
            text: 'यह सत्यापन का उल्लेख करता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। सत्यापन अनुरोध असली हो सकते हैं लेकिन इस ईमेल में बहुत बड़ा खतरा है। एक .exe फ़ाइल अटैच है जो आपके डिवाइस को नुकसान पहुंचा सकती है। बैंक कभी ईमेल से कोई फ़ाइल नहीं भेजते।',
          },
          {
            text: 'इसमें एक अटैचमेंट है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। अटैचमेंट संदिग्ध है लेकिन विशेष खतरा फ़ाइल प्रकार है। यह एक .exe फ़ाइल है जो खोलने पर आपके डिवाइस को नुकसान पहुंचा सकती है। यही सबसे बड़ा खतरा है।',
          },
          {
            text: 'एग्जीक्यूटेबल (.exe) फ़ाइल अटैच है',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। .exe फ़ाइल एक प्रोग्राम है जो खोलते ही आपके डिवाइस पर मैलवेयर या रैनसमवेयर इंस्टॉल कर सकता है। बैंक कभी .exe फ़ाइलें नहीं भेजते। इस ईमेल को तुरंत डिलीट करें।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यह ईमेल बहुत खतरनाक है। इसमें .exe प्रोग्राम फ़ाइल अटैचमेंट है। इसे खोलने से आपके फोन या कंप्यूटर पर वायरस आ सकता है। बैंक कभी प्रोग्राम फ़ाइलें नहीं भेजते। इसे तुरंत डिलीट करें।',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'ईमेल से कभी भी .exe फ़ाइलें डाउनलोड न करें।',
            'वे आपके डिवाइस पर वायरस या मैलवेयर इंस्टॉल कर सकते हैं।',
            'बैंक कभी भी .exe फ़ाइलें नहीं भेजते हैं।',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#dc2626',
        email: {
          subject: 'महत्वपूर्ण: अपने खाते को सुरक्षित करें',
          from: 'HDFC Security',
          fromEmail: 'security@hdfcbank.co',
          logo: true,
          body: [
            'प्रिय रुचिका,',
            '',
            'हमें संदिग्ध गतिविधि का पता चला है।',
            'कृपया तुरंत अपने ओटीपी (OTP) या यूपीआई पिन (UPI PIN) के साथ उत्तर दें।',
            '',
          ],
          cta: null,
          footer: '— सुरक्षा टीम',
        },
        question: 'सबसे बड़ी खतरे की घंटी क्या है?',
        options: [
          {
            text: 'आपके नाम के साथ व्यक्तिगत ईमेल',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आपका नाम अकेले ईमेल को सुरक्षित नहीं बनाता। असली खतरा ईमेल के उस हिस्से में है जहाँ ओटीपी और यूपीआई पिन माँगे जा रहे हैं। कोई भी असली संस्था ऐसा कभी नहीं करती।',
          },
          {
            text: 'यह एक सुरक्षा चेतावनी है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। सुरक्षा चेतावनियाँ असली हो सकती हैं लेकिन इस ईमेल का विषय बताता है कि यह एक घोटाला है। यह ईमेल विशेष रूप से आपका ओटीपी और यूपीआई पिन माँग रहा है जो कोई बैंक कभी नहीं करता।',
          },
          {
            text: 'ईमेल के माध्यम से ओटीपी/पिन मांगना',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। कोई बैंक, ऐप या कोई भी वैध सेवा कभी आपसे ईमेल या फोन पर ओटीपी या यूपीआई पिन नहीं माँगेगी। पिन शेयर करने पर ठग को आपके पैसे तक पूरी पहुँच मिल जाती है। इस ईमेल को तुरंत डिलीट करें।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यह ईमेल आपका ओटीपी और यूपीआई पिन माँग रहा है। यह सबसे बड़ी खतरे की घंटी है। कोई बैंक ऐसा कभी नहीं करेगा। अगर आप इन्हें शेयर करते हैं तो ठग आपके सारे पैसे चुरा सकता है।',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'बैंक कभी भी ओटीपी या पिन नहीं मांगते हैं।',
            'कोई भी वैध कंपनी आपसे कभी भी उत्तर में अपना पिन नहीं मांगेगी।',
            'यह हमेशा एक धोखाधड़ी है — तुरंत कॉल काट दें/हटा दें।',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#b45309',
        email: {
          subject: 'अपने संपर्क विवरण अपडेट करें',
          from: 'HDFC Bank',
          fromEmail: 'noreply@hdfcbank-support.com',
          logo: true,
          showLogoWarning: true,
          body: [
            'प्रिय रुचिका,',
            '',
            'हम आपसे सेवा में रुकावट से बचने के लिए अपने संपर्क विवरण अपडेट करने का अनुरोध करते हैं।',
            '',
          ],
          plainLink: 'https://hdfcbank-support.com/update-details',
          cta: null,
          footer: '— एचडीएफसी बैंक',
        },
        question: 'यहाँ क्या संदिग्ध है?',
        options: [
          {
            text: 'ईमेल डोमेन थोड़ा गलत है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आपने कुछ ज़रूरी चीज़ पकड़ी लेकिन पूरा उत्तर यह है कि ईमेल डोमेन और लिंक दोनों hdfcbank-support.com के हैं जो असली दिखता है लेकिन धोखा देने के लिए बनाया गया नकली डोमेन है।',
          },
          {
            text: 'संदिग्ध लिंक डोमेन',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। लिंक डोमेन संदिग्ध है लेकिन बड़ी बात यह है कि पूरी प्रस्तुति एचडीएफसी जैसी है लेकिन hdfcbank-support.com आधिकारिक नहीं है। असली एचडीएफसी वेबसाइट केवल hdfcbank.com है।',
          },
          {
            text: 'असली बैंक जैसा दिखता है — लेकिन डोमेन में अतिरिक्त शब्द हैं',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। ईमेल और लिंक बहुत पेशेवर दिखते हैं लेकिन hdfcbank-support.com आधिकारिक नहीं है। असली एचडीएफसी hdfcbank.com का उपयोग करता है। डोमेन में एक अतिरिक्त शब्द जोड़ना इसे पूरी तरह अलग और नकली वेबसाइट बनाता है।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यह ईमेल बहुत convincing है लेकिन hdfcbank-support.com असली एचडीएफसी डोमेन नहीं है। असली एचडीएफसी वेबसाइट hdfcbank.com है। डोमेन में अतिरिक्त शब्द फिशिंग की निशानी है।',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'फिशिंग लिंक पहली नज़र में बहुत असली लग सकते हैं।',
            'हमेशा मुख्य डोमेन की सावधानीपूर्वक जांच करें।',
            'hdfcbank-support.com असली एचडीएफसी नहीं है — अतिरिक्त शब्द = खतरा!',
          ],
        },
      },
      {
        id: 7,
        badgeColor: '#dc2626',
        email: {
          subject: 'अंतिम चेतावनी: खाता पहुंच प्रतिबंधित',
          from: 'Bank Alerts',
          fromEmail: 'alerts@secure-bank-login.net',
          logo: false,
          body: [
            'प्रिय ग्राहक,',
            '',
            'यह आपकी अंतिम चेतावनी है।',
            'यदि आप अभी कार्रवाई नहीं करते हैं तो आपका खाता स्थायी रूप से प्रतिबंधित कर दिया जाएगा।',
            '',
          ],
          plainLink: 'http://secure-bank-login.net/resolve-now',
          cta: null,
          footer: '— खाता टीम',
        },
        question: 'यहाँ क्या संदिग्ध है?',
        options: [
          {
            text: 'केवल धमकी भरी भाषा',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। धमकी भरी भाषा एक संकेत है लेकिन यह ईमेल में दिए गए संदिग्ध लिंक के साथ मिलकर और भी खतरनाक है। ठग डर का उपयोग करके आपको बिना सोचे लिंक पर क्लिक करवाते हैं।',
          },
          {
            text: 'केवल अज्ञात प्रेषक डोमेन',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। अज्ञात डोमेन बड़ा संकेत है लेकिन ईमेल में अत्यधिक डरावनी भाषा भी है जैसे अंतिम चेतावनी। ठग हमले को और प्रभावी बनाने के लिए दबाव और नकली लिंक दोनों को एक साथ उपयोग करते हैं।',
          },
          {
            text: 'दबाव और संदिग्ध लिंक एक साथ',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। यह ईमेल अंतिम चेतावनी जैसी डरावनी भाषा और secure-bank-login.net जैसे संदिग्ध लिंक को मिलाता है। असली बैंक इस तरह से काम नहीं करते। जब भी ऑनलाइन जल्दी करने का दबाव महसूस हो, रुकें और आधिकारिक तरीके से जाँच करें।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यह ईमेल एक क्लासिक घोटाला है। इसमें धमकी भरे शब्द हैं और एक संदिग्ध लिंक है जो किसी आधिकारिक बैंक का नहीं है। डरावनी ईमेल में कभी लिंक पर क्लिक न करें।',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'ठग डर + जल्दबाजी + नकली लिंक का एक साथ उपयोग करते हैं।',
            'असली बैंक रैंडम लिंक के जरिए तुरंत कार्रवाई के लिए मजबूर नहीं करते।',
            'संदेह होने पर — सीधे बैंक को उनके आधिकारिक नंबर पर कॉल करें।',
          ],
        },
      },
      {
        id: 8,
        badgeColor: '#1d4ed8',
        email: {
          subject: 'आपका खाता विवरण तैयार है',
          from: 'HDFC NetBanking',
          fromEmail: 'statement@hdfcnetbank-online.co.in',
          logo: false,
          body: [
            'प्रिय मूल्यवान ग्राहक,',
            '',
            'आपका मासिक खाता विवरण तैयार है।',
            'अपना विवरण अभी डाउनलोड करने के लिए नीचे क्लिक करें।',
            '',
          ],
          hoverLink: {
            display: '📥 विवरण (Statement) डाउनलोड करें',
            realUrl: 'http://hdfcnetbank-online.co.in/stmt.exe',
          },
          footer: '— एचडीएफसी नेटबैंकिंग टीम',
        },
        question: 'आप कितनी खतरे की घंटियाँ पहचान सकते हैं?',
        options: [
          {
            text: 'केवल डोमेन संदिग्ध है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आपने एक खतरे की घंटी देख ली, शाबाश। लेकिन डाउनलोड बटन पर होवर करने पर पता चलता है कि लिंक एक .exe प्रोग्राम फ़ाइल की ओर ले जाता है, न कि PDF की ओर। दोनों डोमेन और फ़ाइल प्रकार मिलकर खतरनाक हैं।',
          },
          {
            text: 'केवल फ़ाइल का प्रकार संदिग्ध है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आपने खतरनाक .exe फ़ाइल पकड़ ली जो बढ़िया है। लेकिन एक और संकेत भी है। भेजने वाले का डोमेन hdfcnetbank-online.co.in भी एचडीएफसी का आधिकारिक डोमेन नहीं है। दोनों समस्याएँ मिलकर बहुत खतरनाक हैं।',
          },
          {
            text: 'डोमेन नकली है और लिंक .exe फ़ाइल की ओर ले जाता है',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। यहाँ दो खतरे की घंटियाँ हैं। पहली भेजने वाले का डोमेन hdfcnetbank-online.co.in नकली है। दूसरी डाउनलोड बटन पर होवर करने पर पता चलता है कि लिंक .exe प्रोग्राम फ़ाइल की ओर जाता है। खाता विवरण हमेशा PDF होते हैं, .exe नहीं।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस ईमेल में दो बड़ी समस्याएँ हैं। भेजने वाले का डोमेन नकली है और डाउनलोड लिंक एक .exe प्रोग्राम फ़ाइल की ओर जाता है। बैंक विवरण हमेशा PDF होते हैं। .exe फ़ाइल खोलने पर आपका डिवाइस खतरे में पड़ सकता है।',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'बहुल खतरे की घंटियाँ: नकली डोमेन + बटन के पीछे छिपी .exe फ़ाइल।',
            'खाता विवरण (Statement) कभी भी .exe फ़ाइल नहीं होते हैं।',
            'हमेशा प्रेषक डोमेन और लिंक कहाँ ले जाता है, दोनों की जांच करें।',
          ],
        },
      },
    ],
    marathi: [
      {
        id: 1,
        badgeColor: '#dc2626',
        email: {
          subject: 'तातडीचे: खाते निलंबन नोटीस',
          from: 'HDFC Bank Alerts',
          fromEmail: 'alerts@hdfc-secure.co',
          logo: true,
          body: [
            'प्रिय ग्राहक,',
            '',
            'आम्हाला तुमच्या खात्यात संशयास्पद हालचाल आढळली आहे.',
            'सत्यापित केल्याशिवाय तुमचे खाते २४ तासांच्या आत निलंबित केले जाईल.',
            '',
          ],
          cta: { text: '👉 त्वरित सत्यापित करण्यासाठी येथे क्लिक करा', href: null },
          footer: '— एचडीएफसी बँक टीम',
        },
        question: 'तुम्ही काय करावे?',
        options: [
          {
            text: 'लिंकवर पटकन क्लिक करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. घाबरवणाऱ्या इमेलमधील लिंकवर क्लिक करू नका. फसवणूक करणारे घाई यासाठी निर्माण करतात जेणेकरून तुम्ही विचार न करता वागता. हे लिंक तुम्हाला एका बनावट वेबसाइटवर घेऊन जाऊ शकते.',
          },
          {
            text: 'अधिकृत बँकिंग अॅप/वेबसाइट वापरून सत्यापित करा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. जेव्हाही तुम्हाला खात्याबद्दल भयावह इमेल येते तेव्हा स्वतः बँक अॅप उघडा किंवा अधिकृत नंबरवर कॉल करा. इमेलमधील लिंकवर कधीही विश्वास ठेवू नका.',
          },
          {
            text: 'ईमेलला उत्तर द्या',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या इमेलला उत्तर देऊ नका. उत्तर दिल्याने फसवणूक करणाऱ्याला कळते की तुमची इमेल सक्रिय आहे ज्यामुळे आणखी हल्ले होतात. खरी बँक कधीही इमेल उत्तर देऊन खाते दुरुस्त करण्यास सांगत नाही.',
          },
          {
            text: 'येथे कोणतीही समस्या नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. येथे मोठी समस्या आहे. पाठवणाऱ्याचा इमेल पत्ता hdfc-secure.co आहे जो खऱ्या बँकेचा डोमेन नाही. खरा एचडीएफसी इमेल नेहमी hdfcbank.com वरून येतो.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'घबराट निर्माण करण्यासाठी घाईचा वापर केला जातो.',
            'नेहमी अधिकृत अॅप्सद्वारे तपासा, ईमेल लिंकद्वारे नाही.',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#dc2626',
        email: {
          subject: 'सुरक्षित लॉगिन सूचना',
          from: 'HDFC Support',
          fromEmail: 'support@hdfc-secure-login.xyz',
          logo: false,
          body: [
            'प्रिय रुचिका,',
            '',
            'तुमच्या खात्यासाठी त्वरित लॉगिन सत्यापन आवश्यक आहे.',
            '',
          ],
          cta: null,
          footer: '— सपोर्ट टीम',
        },
        question: 'येथे धोक्याची सूचना (Red Flag) काय आहे?',
        options: [
          {
            text: 'तुमचे नाव वापरते',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुमचे नाव एकट्याने इमेल सुरक्षित बनवत नाही. फसवणूक करणारे लीक झालेल्या डेटा किंवा सोशल मीडियावरून तुमचे नाव सहज शोधू शकतात. नेहमी पाठवणाऱ्याचा संपूर्ण इमेल पत्ता पहा.',
          },
          {
            text: 'संशयास्पद ईमेल डोमेन (.xyz)',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. पाठवणाऱ्याचा इमेल .xyz वर संपतो जो खऱ्या बँकेचा डोमेन नाही. अधिकृत एचडीएफसी इमेल नेहमी hdfcbank.com वरून येतो. इतर कोणतेही एक्सटेंशन धोक्याचे संकेत आहे.',
          },
          {
            text: 'लॉगिनचा उल्लेख करते',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. केवळ लॉगिनचा उल्लेख ही समस्या नाही. खरा धोका .xyz डोमेन आहे. कोणत्याही संदेशावर विश्वास ठेवण्यापूर्वी पाठवणाऱ्याचा संपूर्ण इमेल पत्ता तपासा.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. येथे मोठी समस्या आहे. पाठवणाऱ्याचा इमेल .xyz वर संपतो जो एचडीएफसीचा अधिकृत डोमेन नाही. खऱ्या बँकेचे इमेल केवळ hdfcbank.com वरून येतात.',
          },
        ],
        feedback: {
          icon: '🚨',
          lines: [
            'नेहमी पाठवणाऱ्याचे डोमेन काळजीपूर्वक तपासा.',
            'खोटे डोमेन अनेकदा खऱ्यासारखे दिसतात पण अधिकृत नसतात.',
            'खरा एचडीएफसी ईमेल @hdfcbank.com वरून येतो, .xyz वरून नाही.',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#b45309',
        email: {
          subject: 'केवायसी अपडेट आवश्यक',
          from: 'HDFC Bank',
          fromEmail: 'kyc@hdfcbank.co',
          logo: true,
          body: [
            'प्रिय ग्राहक,',
            '',
            'तुमचे केवायसी (KYC) प्रलंबित आहे. कृपया त्वरित अपडेट करा.',
            '',
          ],
          hoverLink: {
            display: '👉 आताच KYC अपडेट करा',
            realUrl: 'http://hdfcbank.verify-now.net',
          },
          cta: null,
          footer: '— एचडीएफसी बँक',
        },
        question: 'येथे काय संशयास्पद आहे?',
        options: [
          {
            text: 'यात केवायसीचा उल्लेख आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. केवायसी अपडेट खरे असू शकतात पण येथे खरा धोका लपलेल्या लिंकमध्ये आहे. केवायसी अपडेट बटणामागे एका बनावट वेबसाइटचे लिंक आहे.',
          },
          {
            text: 'लिंक खोट्या डोमेनकडे नेते',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुम्ही योग्य दिशेने आहात पण विशिष्ट युक्ती ही आहे की लिंकचा मजकूर खरा दिसतो तर क्लिक केल्यावर बनावट डोमेनवर जातो. क्लिक करण्यापूर्वी माउस नेऊन खरे लिंक पहा.',
          },
          {
            text: 'लपवलेल्या लिंकमधील तफावत (पाहण्यासाठी माउस वर न्या!)',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. बटणावर KYC अपडेट लिहिले आहे पण माउस नेल्यावर लिंक hdfcbank.verify-now.net ला जाते जे अधिकृत डोमेन नाही. फसवणूक करणारे विश्वासू बटणामागे धोकादायक लिंक लपवतात. नेहमी क्लिक करण्यापूर्वी माउस ठेवा.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या इमेलमध्ये गंभीर धोका आहे. केवायसी अपडेट बटणामागे एक बनावट URL लपलेला आहे. केवायसी अपडेटसाठी इमेल लिंकवर कधीही क्लिक करू नका.',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'नेहमी बटणांमागील खरी लिंक तपासा.',
            'फसवणूक करणारे विश्वसनीय मजकुरामागे खोटे यूआरएल लपवतात.',
            'कोणत्याही लिंकवर क्लिक करण्यापूर्वी ती नीट तपासा!',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#dc2626',
        email: {
          subject: 'कृती आवश्यक: खाते सत्यापन प्रलंबित',
          from: 'HDFC Bank Support',
          fromEmail: 'support@hdfcbank-secure.co',
          logo: true,
          body: [
            'प्रिय रुचिका,',
            '',
            'सत्यापन पूर्ण करण्यासाठी कृपया जोडलेली फाईल डाउनलोड करा.',
            '',
          ],
          attachment: 'Account_Verification.exe',
          cta: null,
          footer: '— सुरक्षा टीम',
        },
        question: 'सर्वात मोठी धोक्याची सूचना काय आहे?',
        options: [
          {
            text: 'यात सत्यापनाचा उल्लेख आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. सत्यापन विनंत्या खऱ्या असू शकतात पण या इमेलमध्ये खूप मोठा धोका आहे. एक .exe फाईल जोडली आहे जी तुमच्या डिव्हाइसला हानी पोहोचवू शकते. बँक कधीही इमेलद्वारे कोणतीही फाईल पाठवत नाही.',
          },
          {
            text: 'यात एक अटॅचमेंट आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. अटॅचमेंट संशयास्पद आहे पण विशिष्ट धोका फाईलचा प्रकार आहे. ती .exe फाईल आहे जी उघडल्यावर तुमच्या डिव्हाइसवर मालवेअर टाकू शकते.',
          },
          {
            text: 'एक्झिक्युटेबल (.exe) फाईल जोडलेली आहे',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. .exe फाईल एक प्रोग्राम फाईल आहे जी उघडल्यावर तुमच्या डिव्हाइसवर मालवेअर किंवा रॅन्समवेअर टाकू शकते. बँक कधीही .exe फाईल्स पाठवत नाही. हा इमेल त्वरित डिलीट करा.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. हा इमेल खूप धोकादायक आहे. यात .exe प्रोग्राम फाईल अटॅचमेंट आहे. ती उघडल्यास तुमच्या फोन किंवा संगणकावर व्हायरस येऊ शकतो. बँक कधीही प्रोग्राम फाईल्स पाठवत नाही.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'इमेलमधून कधीही .exe फाईल्स डाउनलोड करू नका.',
            'त्या तुमच्या डिव्हाइसवर व्हायरस किंवा मालवेअर टाकू शकतात.',
            'बँक कधीही .exe फाईल्स पाठवत नाही.',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#dc2626',
        email: {
          subject: 'महत्वाचे: तुमचे खाते सुरक्षित करा',
          from: 'HDFC Security',
          fromEmail: 'security@hdfcbank.co',
          logo: true,
          body: [
            'प्रिय रुचिका,',
            '',
            'आम्हाला संशयास्पद हालचाल आढळली आहे.',
            'कृपया त्वरित तुमच्या ओटीपी (OTP) किंवा यूपीआय पिन (UPI PIN) सह उत्तर द्या.',
            '',
          ],
          cta: null,
          footer: '— सुरक्षा टीम',
        },
        question: 'सर्वात मोठी धोक्याची सूचना काय आहे?',
        options: [
          {
            text: 'तुमच्या नावासह वैयक्तिकृत ईमेल',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुमचे नाव एकट्याने इमेल सुरक्षित बनवत नाही. खरा धोका इमेलच्या त्या भागात आहे जिथे OTP आणि UPI PIN मागितला आहे. कोणतीही खरी संस्था असे कधीही करत नाही.',
          },
          {
            text: 'ही सुरक्षा चेतावणी आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. सुरक्षा चेतावण्या खऱ्या असू शकतात पण या इमेलचा मजकूर सांगतो की हे एक घोटाळे आहे. हा इमेल विशेषतः तुमचा OTP आणि UPI PIN मागत आहे जे कोणताही बँक कधीही मागत नाही.',
          },
          {
            text: 'ईमेलद्वारे ओटीपी/पिन विचारणे',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. कोणताही बँक, अॅप किंवा कोणतीही कायदेशीर सेवा इमेल किंवा फोनद्वारे OTP किंवा UPI PIN कधीही मागणार नाही. PIN शेअर केल्यास फसवणूक करणाऱ्याला तुमच्या पैशांवर संपूर्ण नियंत्रण मिळते. हा इमेल त्वरित डिलीट करा.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. हा इमेल तुमचा OTP आणि UPI PIN मागत आहे. ही सर्वात मोठी धोक्याची सूचना आहे. कोणताही बँक असे कधीही करणार नाही. जर तुम्ही ते शेअर केले तर फसवणूक करणारे सर्व पैसे चोरू शकतात.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'बँक कधीही ओटीपी किंवा पिन मागत नाही.',
            'कोणतीही अधिकृत कंपनी तुम्हाला कधीही उत्तरात तुमचा पिन विचारणार नाही.',
            'ही नेहमीच एक फसवणूक असते — त्वरित कॉल कट करा/डिलीट करा.',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#b45309',
        email: {
          subject: 'तुमचा संपर्क तपशील अपडेट करा',
          from: 'HDFC Bank',
          fromEmail: 'noreply@hdfcbank-support.com',
          logo: true,
          showLogoWarning: true,
          body: [
            'प्रिय रुचिका,',
            '',
            'सेवा व्यत्यय टाळण्यासाठी आम्ही तुम्हाला तुमचे संपर्क तपशील अपडेट करण्याची विनंती करतो.',
            '',
          ],
          plainLink: 'https://hdfcbank-support.com/update-details',
          cta: null,
          footer: '— एचडीएफसी बँक',
        },
        question: 'येथे काय संशयास्पद आहे?',
        options: [
          {
            text: 'ईमेल डोमेन थोडे चुकीचे आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुम्ही महत्त्वाचे काहीतरी पाहिले पण अधिक संपूर्ण उत्तर असे आहे की इमेल डोमेन आणि लिंक दोन्ही hdfcbank-support.com चे आहेत जे खरे दिसते पण फसवणूक करण्यासाठी बनवलेले बनावट डोमेन आहे.',
          },
          {
            text: 'संशयास्पद लिंक डोमेन',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. लिंक डोमेन संशयास्पद आहे पण मोठी समस्या ही आहे की संपूर्ण सादरीकरण एचडीएफसीसारखे दिसते पण hdfcbank-support.com अधिकृत नाही. अधिकृत एचडीएफसी वेबसाइट फक्त hdfcbank.com आहे.',
          },
          {
            text: 'खऱ्या बँकेसारखे वाटते — पण डोमेनमध्ये अतिरिक्त शब्द आहेत',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. इमेल आणि लिंक खूप व्यावसायिक दिसतात पण hdfcbank-support.com अधिकृत नाही. खरा एचडीएफसी hdfcbank.com वापरतो. डोमेनमध्ये एक अतिरिक्त शब्द जोडल्याने ते एक वेगळी आणि बनावट वेबसाइट बनते.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. हा इमेल खूप आकर्षक दिसतो पण hdfcbank-support.com हे खरे एचडीएफसी डोमेन नाही. खरी एचडीएफसी वेबसाइट hdfcbank.com आहे. डोमेनमधील अतिरिक्त शब्द फिशिंगचे लक्षण आहे.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'फिशिंग लिंक्स पहिल्या नजरेत खूप खऱ्या वाटू शकतात.',
            'नेहमी मुख्य डोमेन काळजीपूर्वक तपासा.',
            'hdfcbank-support.com खरी एचडीएफसी नाही — अतिरिक्त शब्द = धोका!',
          ],
        },
      },
      {
        id: 7,
        badgeColor: '#dc2626',
        email: {
          subject: 'अंतिम चेतावणी: खाते प्रवेश प्रतिबंधित',
          from: 'Bank Alerts',
          fromEmail: 'alerts@secure-bank-login.net',
          logo: false,
          body: [
            'प्रिय ग्राहक,',
            '',
            'ही तुमची अंतिम चेतावणी आहे.',
            'तुम्ही आत्ताच कृती न केल्यास तुमचे खाते कायमचे प्रतिबंधित केले जाईल.',
            '',
          ],
          plainLink: 'http://secure-bank-login.net/resolve-now',
          cta: null,
          footer: '— खाते टीम',
        },
        question: 'येथे काय संशयास्पद आहे?',
        options: [
          {
            text: 'केवळ धमकीची भाषा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. धमकीची भाषा एक संकेत आहे पण ती इमेलमधील संशयास्पद लिंकसह एकत्र येऊन आणखी धोकादायक आहे. फसवणूक करणारे तुम्हाला विचार न करता लिंकवर क्लिक करण्यास प्रवृत्त करण्यासाठी भीती वापरतात.',
          },
          {
            text: 'केवळ अज्ञात पाठवणारा डोमेन',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. अज्ञात डोमेन एक मोठा संकेत आहे पण इमेलमध्ये अत्यंत भयावह भाषा जसे अंतिम चेतावणी देखील आहे. फसवणूक करणारे हल्ला अधिक प्रभावी करण्यासाठी दबाव आणि बनावट लिंक दोन्ही वापरतात.',
          },
          {
            text: 'दबाव आणि संशयास्पद लिंक एकत्रितपणे',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. हा इमेल अंतिम चेतावणी सारखी भयावह भाषा आणि secure-bank-login.net सारखे संशयास्पद लिंक एकत्र वापरतो. खऱ्या बँका अशा प्रकारे काम करत नाहीत. जेव्हा ऑनलाइन घाई करण्याचा दबाव वाटतो तेव्हा थांबा आणि अधिकृत मार्गाने तपासा.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. हा इमेल एक क्लासिक घोटाळा आहे. यात धमकीचे शब्द आणि एक संशयास्पद लिंक आहे जे कोणत्याही अधिकृत बँकेचे नाही. भयावह इमेलमध्ये कधीही लिंकवर क्लिक करू नका.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'फसवणूक करणारे भीती + घाई + खोट्या लिंकचा एकत्रित वापर करतात.',
            'खऱ्या बँका रँडम लिंकद्वारे तातडीच्या कृतीसाठी सक्ती करत नाहीत.',
            'शंका असल्यास — थेट बँकेला त्यांच्या अधिकृत नंबरवर कॉल करा.',
          ],
        },
      },
      {
        id: 8,
        badgeColor: '#1d4ed8',
        email: {
          subject: 'तुमचा खाते तपशील तयार आहे',
          from: 'HDFC NetBanking',
          fromEmail: 'statement@hdfcnetbank-online.co.in',
          logo: false,
          body: [
            'प्रिय मौल्यवान ग्राहक,',
            '',
            'तुमचा मासिक खाते तपशील (Statement) तयार आहे.',
            'तुमचे तपशील आत्ताच डाउनलोड करण्यासाठी खाली क्लिक करा.',
            '',
          ],
          hoverLink: {
            display: '📥 तपशील डाउनलोड करा',
            realUrl: 'http://hdfcnetbank-online.co.in/stmt.exe',
          },
          footer: '— एचडीएफसी नेटबँकिंग टीम',
        },
        question: 'तुम्ही किती धोक्याच्या सूचना ओळखू शकता?',
        options: [
          {
            text: 'फक्त डोमेन संशयास्पद आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुम्ही एक धोक्याची सूचना पाहिली, शाबास. पण डाउनलोड बटणावर माउस नेल्यावर लिंक एक .exe प्रोग्राम फाईलकडे जाते, PDF कडे नाही. डोमेन आणि फाईल प्रकार दोन्ही एकत्र धोकादायक आहेत.',
          },
          {
            text: 'फक्त फाईल प्रकार संशयास्पद आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुम्ही धोकादायक .exe फाईल ओळखली जी चांगले आहे. पण आणखी एक संकेत आहे. पाठवणाऱ्याचा डोमेन hdfcnetbank-online.co.in देखील एचडीएफसीचा अधिकृत डोमेन नाही. दोन्ही समस्या एकत्र खूप धोकादायक आहेत.',
          },
          {
            text: 'डोमेन खोटे आहे आणि लिंक .exe फाईलकडे नेते',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. येथे दोन धोक्याच्या सूचना आहेत. पहिले पाठवणाऱ्याचा डोमेन hdfcnetbank-online.co.in बनावट आहे. दुसरे डाउनलोड बटणावर माउस नेल्यावर लिंक .exe प्रोग्राम फाईलकडे जाते. बँक स्टेटमेंट नेहमी PDF असते, .exe नाही.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या इमेलमध्ये दोन मोठ्या समस्या आहेत. पाठवणाऱ्याचा डोमेन बनावट आहे आणि डाउनलोड लिंक .exe प्रोग्राम फाईलकडे जाते. बँक स्टेटमेंट नेहमी PDF असते. .exe फाईल उघडल्यास तुमचे डिव्हाइस धोक्यात येऊ शकते.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'एकाधिक धोक्याच्या सूचना: खोटे डोमेन + बटणामागे लपवलेली .exe फाईल.',
            'खाते तपशील (Statement) कधीही .exe फाईल्स नसतात.',
            'नेहमी पाठवणारा डोमेन आणि लिंक कुठे नेते, दोन्ही तपासा.',
          ],
        },
      },
    ]
  },
  sms: {
    english: [
      {
        id: 1,
        badgeColor: '#ea580c',
        sms: {
          from: '+91-XXXXXXXXXXX (Unknown)',
          body: '🎉 Congratulations! You have won ₹50,000 in the HDFC Lucky Draw. Click to claim: http://hdfclucky.win/claim',
          highlight: 'http://hdfclucky.win/claim',
        },
        question: 'This SMS says you won ₹50,000 — what do you do?',
        options: [
          {
            text: 'Click the link to claim your prize',
            correct: false,
            customFeedback: 'Do not ignore this message. Clicking this link could install malware or take you to a fake form that steals your bank details. Banks and companies never give prizes through random SMS links. This is a typical lottery scam designed to steal from you.',
          },
          {
            text: 'Share it with family to claim together',
            correct: false,
            customFeedback: 'Do not ignore this message. Sharing this message only spreads the scam to your loved ones too. Neither you nor your family actually won anything. The link is from hdfclucky.win which is not a real HDFC domain. Delete and warn your family instead.',
          },
          {
            text: 'Delete — banks don\'t give prizes via random SMS',
            correct: true,
            customFeedback: 'Well done you spotted this. Banks and legitimate companies never announce winners through unsolicited SMS. The link hdfclucky.win is completely fake and not connected to HDFC. Unexpected prize messages are almost always scams. Delete and block the number.',
          },
          {
            text: 'Reply to ask if it\'s real',
            correct: false,
            customFeedback: 'Do not ignore this message. Replying confirms to the scammer that your number is active, which leads to more scam messages and calls. Never reply to suspicious SMS. If curious, call the actual bank directly on their official helpline number.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'Banks and companies never give prizes through unsolicited SMS.',
            'The link "hdfclucky.win" is NOT an official HDFC domain.',
            'When in doubt, call the bank directly on their official number.',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#dc2626',
        sms: {
          from: 'HDFC-UPIALT',
          body: 'Dear customer, your UPI ID has been blocked. Send ₹1 to upi@hdfcverify to reactivate. Ref: HDFC8821',
          highlight: 'upi@hdfcverify',
        },
        question: 'What is wrong with this message?',
        options: [
          {
            text: 'Nothing — sending ₹1 is harmless',
            correct: false,
            customFeedback: 'Do not ignore this message. Sending even ₹1 is not harmless here. It confirms to the scammer that your number and UPI are active. This leads to bigger scam attempts. Real banks never ask you to send money to reactivate your UPI.',
          },
          {
            text: 'UPI IDs are never used for verification payments',
            correct: true,
            customFeedback: 'Well done you spotted this. A real bank will never ask you to send any amount of money to reactivate or verify your account. The UPI ID upi@hdfcverify is not from HDFC. If you had sent even ₹1 it would have confirmed your account is active and led to bigger attacks.',
          },
          {
            text: 'The reference number looks suspicious',
            correct: false,
            customFeedback: 'Do not ignore this message. The reference number alone is not the main issue. The real problem is that banks never ask you to send money, even ₹1, to reactivate UPI. The UPI ID upi@hdfcverify is a scammer\'s account, not HDFC.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. This is definitely a scam. No bank will ever ask you to send money to reactivate your account. The UPI ID upi@hdfcverify does not belong to any real bank. Sending even ₹1 could lead to your account being fully compromised.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'Banks NEVER ask you to send money to reactivate your UPI.',
            '"upi@hdfcverify" is a scammer\'s UPI ID — not HDFC.',
            'Paying even ₹1 confirms your number is active and leads to bigger scams.',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#dc2626',
        sms: {
          from: 'SBIBANK-OTP',
          body: 'Your SBI OTP is 847291. A representative will call you to help complete your KYC. Please share this OTP when asked.',
          highlight: '847291',
        },
        question: 'A person calls you asking for this OTP to "complete KYC" — what do you do?',
        options: [
          {
            text: 'Share it since they already know your bank name',
            correct: false,
            customFeedback: 'Do not ignore this message. Knowing your bank name does not make a caller trustworthy. Scammers research their targets before calling. Sharing your OTP gives a stranger complete access to your bank account. Hang up immediately and do not share OTPs with anyone.',
          },
          {
            text: 'Ask them to wait and think about it',
            correct: false,
            customFeedback: 'Do not ignore this message. Thinking is good but asking them to wait is not enough. The correct action is to hang up immediately. Banks never call to ask for OTPs. While you wait and think the scammer may try other tricks to convince you.',
          },
          {
            text: 'Hang up and NEVER share OTP with anyone',
            correct: true,
            customFeedback: 'Well done you spotted this. Bank representatives will never call you to ask for an OTP. OTPs are generated specifically for one transaction and sharing it gives the scammer complete access to your account. Hang up and call your bank\'s official number if you have any concern.',
          },
          {
            text: 'Share only the last 4 digits',
            correct: false,
            customFeedback: 'Do not ignore this message. Sharing even part of your OTP is dangerous. A clever scammer can figure out the full OTP from partial information or use other tricks. The correct action is to hang up immediately. Your OTP must stay completely secret every time.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'Banks NEVER call you to ask for an OTP.',
            'OTPs are one-time and secret — sharing = full account access to scammer.',
            'Legitimate bank reps will NEVER need your OTP.',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#b45309',
        sms: {
          from: 'PAYTM-KYC',
          body: 'Your Paytm wallet will be blocked in 24 hrs. Complete KYC now: http://paytm-kyc-update.net/verify?id=99821',
          highlight: 'http://paytm-kyc-update.net',
        },
        question: 'What is the red flag in this SMS?',
        options: [
          {
            text: 'The 24-hour deadline creates urgency',
            correct: false,
            customFeedback: 'Do not ignore this message. The deadline is a pressure tactic but the bigger red flag is the link. The official Paytm website is paytm.com. The link in this SMS goes to paytm-kyc-update.net which is a completely different and fake website designed to steal your information.',
          },
          {
            text: 'Official Paytm domain is paytm.com, not paytm-kyc-update.net',
            correct: true,
            customFeedback: 'Well done you spotted this. The official Paytm website is paytm.com. Any other similar-sounding domain like paytm-kyc-update.net is fake. Always open the official Paytm app yourself to check your KYC status. Never click links in SMS messages for KYC updates.',
          },
          {
            text: 'It mentions KYC',
            correct: false,
            customFeedback: 'Do not ignore this message. KYC is a real requirement but mentioning it alone is not the red flag. The problem is the link in this SMS goes to paytm-kyc-update.net which is not Paytm\'s official website. Real KYC updates happen inside the official app only.',
          },
          {
            text: 'No issue here',
            correct: false,
            customFeedback: 'Do not ignore this message. There is a major issue. The link in this SMS goes to paytm-kyc-update.net which is not the real Paytm website. Official Paytm communications only use paytm.com. Clicking this link could lead to your personal and financial information being stolen.',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'Official Paytm communications come from paytm.com only.',
            '"paytm-kyc-update.net" is a phishing domain — completely different.',
            'Always update KYC by opening the official app yourself.',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#7c3aed',
        sms: {
          from: '+91-9876543210',
          body: 'Refund of ₹2,450 for your recent transaction is pending. Call 9876543210 immediately to process. Avoid delay.',
          highlight: '9876543210',
        },
        question: 'You get this SMS about a pending refund — what should you do?',
        options: [
          {
            text: 'Call the number immediately to get your money',
            correct: false,
            customFeedback: 'Do not ignore this message. Calling this number is exactly what the scammer wants. They will then ask you for your card number, CVV, OTP or UPI PIN under the pretext of processing the refund. Real refunds never require you to call a number or share any details.',
          },
          {
            text: 'Ignore — check refund status in official bank app',
            correct: true,
            customFeedback: 'Well done you spotted this. Legitimate refunds are processed automatically by the bank and appear directly in your account. You will never receive an SMS asking you to call a number to process a refund. Always check your transaction history in your official bank app to verify any refund.',
          },
          {
            text: 'WhatsApp the number to verify',
            correct: false,
            customFeedback: 'Do not ignore this message. Contacting the number in any way, including WhatsApp, just confirms to the scammer that your number is active. They will then try to trick you into sharing your financial details. Always use your bank\'s official app or helpline.',
          },
          {
            text: 'Share your card details to process refund',
            correct: false,
            customFeedback: 'Do not ignore this message. Never share card details, CVV numbers or OTPs with anyone claiming to process a refund. Real refunds go directly to your registered account without any action from you. Sharing these details will result in money being stolen from your account.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'Refund scams trick you into calling and sharing details.',
            'Real refunds are processed automatically — no call needed.',
            'Always check transaction history in your official bank app.',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#dc2626',
        sms: {
          from: 'GOVT-TAX',
          body: 'Income Tax Dept: Refund of ₹8,320 approved. Submit PAN + bank details at: http://incometax-refund.co/claim to receive.',
          highlight: 'http://incometax-refund.co',
        },
        question: 'This SMS claims to be from Income Tax Dept — what do you do?',
        options: [
          {
            text: 'Submit details — tax refunds are legitimate',
            correct: false,
            customFeedback: 'Do not ignore this message. Tax refunds are real but the government never asks you to submit details via SMS links. The link in this message goes to incometax-refund.co which is not a government website. Real government websites always end in .gov.in only.',
          },
          {
            text: 'Call the number in the SMS for confirmation',
            correct: false,
            customFeedback: 'Do not ignore this message. The number in this SMS belongs to the scammer. Calling it would expose you to further manipulation. To confirm any tax refund, visit only the official website incometax.gov.in directly or call the official Income Tax helpline.',
          },
          {
            text: 'Visit only incometax.gov.in — government sites end in .gov.in',
            correct: true,
            customFeedback: 'Well done you spotted this. All Indian government websites exclusively use .gov.in domain. The link incometax-refund.co in this SMS is completely fake. Real tax refunds go automatically to your registered bank account. You never need to submit any details via an SMS link.',
          },
          {
            text: 'Share only PAN, not bank details',
            correct: false,
            customFeedback: 'Do not ignore this message. Sharing even your PAN number on this fake website is dangerous. Scammers can use your PAN along with other publicly available information to commit identity fraud. Never share any personal or financial information via links received in SMS.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'Indian government websites ALWAYS end in .gov.in',
            '"incometax-refund.co" is a scam site — completely fake.',
            'Tax refunds go directly to your registered account — never via SMS links.',
          ],
        },
      },
    ],
    hindi: [
      {
        id: 1,
        badgeColor: '#ea580c',
        sms: {
          from: '+91-XXXXXXXXXXX (Unknown)',
          body: '🎉 बधाई हो! आपने HDFC लकी ड्रा में ₹50,000 जीते हैं। क्लेम करने के लिए क्लिक करें: http://hdfclucky.win/claim',
          highlight: 'http://hdfclucky.win/claim',
        },
        question: 'यह एसएमएस कहता है कि आपने ₹50,000 जीते हैं — आप क्या करते हैं?',
        options: [
          {
            text: 'पुरस्कार राशि पाने के लिए लिंक पर क्लिक करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस लिंक पर क्लिक करने से मैलवेयर इंस्टॉल हो सकता है या एक नकली फॉर्म खुल सकता है जो आपकी बैंक जानकारी चुरा लेगा। बैंक और कंपनियां कभी यादृच्छिक एसएमएस लिंक के माध्यम से पुरस्कार नहीं देती हैं।',
          },
          {
            text: 'इसे परिवार के साथ साझा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस संदेश को साझा करने से घोटाला आपके प्रियजनों तक भी फैलता है। hdfclucky.win एक असली एचडीएफसी डोमेन नहीं है। इसे डिलीट करें और परिवार को चेतावनी दें।',
          },
          {
            text: 'डिलीट करें — बैंक कभी भी रैंडम एसएमएस से इनाम नहीं देते',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। बैंक और वैध कंपनियां कभी भी अनचाहे एसएमएस के माध्यम से विजेताओं की घोषणा नहीं करतीं। hdfclucky.win पूरी तरह नकली है और एचडीएफसी से जुड़ा नहीं है। ऐसे संदेशों को डिलीट करें और नंबर ब्लॉक करें।',
          },
          {
            text: 'यह असली है या नहीं, पूछने के लिए उत्तर दें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। जवाब देने से ठग को पता चलता है कि आपका नंबर सक्रिय है जिससे और घोटाले के संदेश और कॉल आते हैं। संदिग्ध एसएमएस का कभी जवाब न दें।',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'बैंक और कंपनियाँ कभी भी अचानक एसएमएस के माध्यम से पुरस्कार नहीं देते हैं।',
            'लिंक "hdfclucky.win" एक आधिकारिक एचडीएफसी डोमेन नहीं है।',
            'संदेह होने पर, सीधे बैंक को उनके आधिकारिक नंबर पर कॉल करें।',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#dc2626',
        sms: {
          from: 'HDFC-UPIALT',
          body: 'प्रिय ग्राहक, आपका UPI ID ब्लॉक कर दिया गया है। पुनः सक्रिय करने के लिए upi@hdfcverify पर ₹1 भेजें। रेफरेंस: HDFC8821',
          highlight: 'upi@hdfcverify',
        },
        question: 'इस संदेश में क्या गलत है?',
        options: [
          {
            text: 'कुछ नहीं — ₹1 भेजना हानिकारक नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। ₹1 भेजना भी हानिरहित नहीं है। यह ठग को बताता है कि आपका नंबर और यूपीआई सक्रिय हैं। इससे बड़े घोटाले के प्रयास होते हैं। असली बैंक कभी आपसे यूपीआई पुनः सक्रिय करने के लिए पैसे भेजने को नहीं कहते।',
          },
          {
            text: 'सत्यापन के लिए कभी भी पैसे भेजने की आवश्यकता नहीं होती है',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। असली बैंक कभी भी आपसे खाता पुनः सक्रिय या सत्यापित करने के लिए कोई भी राशि भेजने के लिए नहीं कहेगा। upi@hdfcverify एचडीएफसी का नहीं है। ₹1 भेजने पर भी आपका खाता पूरी तरह खतरे में पड़ सकता था।',
          },
          {
            text: 'रेफरेंस नंबर संदिग्ध लग रहा है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। रेफरेंस नंबर मुख्य समस्या नहीं है। असली समस्या यह है कि बैंक कभी भी यूपीआई पुनः सक्रिय करने के लिए पैसे भेजने का नहीं कहते। upi@hdfcverify एक ठग का खाता है, एचडीएफसी का नहीं।',
          },
          {
            text: 'यहाँ कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यह निश्चित रूप से एक घोटाला है। कोई भी बैंक कभी भी आपसे खाता पुनः सक्रिय करने के लिए पैसे भेजने को नहीं कहेगा। upi@hdfcverify किसी असली बैंक का नहीं है।',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'बैंक कभी भी आपके यूपीआई को सक्रिय करने के लिए पैसे भेजने के लिए नहीं कहते हैं।',
            '"upi@hdfcverify" एक ठग का यूपीआई आईडी है — एचडीएफसी का नहीं।',
            '₹1 भी भेजना यह पुष्टि करता है कि आपका नंबर सक्रिय है।',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#dc2626',
        sms: {
          from: 'SBIBANK-OTP',
          body: 'आपका SBI OTP 847291 है। आपका KYC पूरा करने में मदद के लिए एक प्रतिनिधि आपको कॉल करेगा। कृपया पूछे जाने पर यह OTP साझा करें।',
          highlight: '847291',
        },
        question: 'एक व्यक्ति आपको "केवाईसी पूरा करने" के लिए यह ओटीपी मांग रहा है — आप क्या करेंगे?',
        options: [
          {
            text: 'साझा करें क्योंकि उन्हें पहले से ही आपके बैंक का नाम पता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। बैंक का नाम जानना व्यक्ति को भरोसेमंद नहीं बनाता। ठग फोन करने से पहले अपने लक्ष्य के बारे में शोध करते हैं। ओटीपी साझा करने पर अजनबी को आपके बैंक खाते तक पूरी पहुँच मिल जाती है।',
          },
          {
            text: 'उन्हें प्रतीक्षा करने के लिए कहें और इसके बारे में सोचें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। सोचना अच्छा है लेकिन प्रतीक्षा करवाना काफी नहीं है। सही कदम तुरंत फोन काटना है। बैंक ओटीपी मांगने के लिए कभी कॉल नहीं करते। प्रतीक्षा के दौरान ठग आपको समझाने के लिए और तरीके अपना सकता है।',
          },
          {
            text: 'कॉल काट दें और किसी के साथ कभी भी ओटीपी साझा न करें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। बैंक प्रतिनिधि कभी आपसे ओटीपी नहीं मांगते। ओटीपी विशेष रूप से एक लेनदेन के लिए बनता है और इसे साझा करने पर ठग को आपके खाते तक पूरी पहुँच मिलती है। तुरंत फोन काटें और अगर कोई चिंता हो तो बैंक के आधिकारिक नंबर पर कॉल करें।',
          },
          {
            text: 'केवल अंतिम 4 अंक साझा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। ओटीपी का हिस्सा भी साझा करना खतरनाक है। एक चालाक ठग आंशिक जानकारी से पूरा ओटीपी पता कर सकता है। सही कदम तुरंत फोन काटना है। आपका ओटीपी हर बार पूरी तरह गुप्त रहना चाहिए।',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'बैंक आपसे ओटीपी मांगने के लिए कभी कॉल नहीं करते हैं।',
            'ओटीपी गुप्त होता है — साझा करने का अर्थ है ठग को आपके खाते तक पूरी पहुंच देना।',
            'वैध बैंक प्रतिनिधियों को कभी भी आपके ओटीपी की आवश्यकता नहीं होगी।',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#b45309',
        sms: {
          from: 'PAYTM-KYC',
          body: 'आपका Paytm वॉलेट 24 घंटे में ब्लॉक हो जाएगा। अभी KYC पूरा करें: http://paytm-kyc-update.net/verify?id=99821',
          highlight: 'http://paytm-kyc-update.net',
        },
        question: 'इस एसएमएस में "खतरे की घंटी" क्या है?',
        options: [
          {
            text: '24 घंटे की समय सीमा जल्दबाजी पैदा करती है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। समय सीमा एक दबाव की रणनीति है लेकिन बड़ा संकेत लिंक है। पेटीएम की आधिकारिक वेबसाइट paytm.com है। इस एसएमएस का लिंक paytm-kyc-update.net पर जाता है जो पूरी तरह अलग और नकली वेबसाइट है।',
          },
          {
            text: 'पेटीएम का आधिकारिक डोमेन paytm.com है, न कि paytm-kyc-update.net',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। पेटीएम की आधिकारिक वेबसाइट paytm.com है। paytm-kyc-update.net जैसा कोई और डोमेन नकली है। केवाईसी स्थिति जांचने के लिए हमेशा खुद आधिकारिक पेटीएम ऐप खोलें। एसएमएस संदेशों में केवाईसी लिंक पर कभी क्लिक न करें।',
          },
          {
            text: 'यह केवाईसी का उल्लेख करता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। केवाईसी एक वास्तविक आवश्यकता है लेकिन अकेले इसका उल्लेख संकेत नहीं है। समस्या यह है कि लिंक paytm-kyc-update.net पर जाता है जो पेटीएम की आधिकारिक वेबसाइट नहीं है। असली केवाईसी अपडेट केवल आधिकारिक ऐप में होते हैं।',
          },
          {
            text: 'कोई समस्या नहीं है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यहाँ बड़ी समस्या है। लिंक paytm-kyc-update.net पर जाता है जो असली पेटीएम वेबसाइट नहीं है। इस लिंक पर क्लिक करने से आपकी व्यक्तिगत और वित्तीय जानकारी चोरी हो सकती है।',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'पेटीएम के आधिकारिक संदेश केवल paytm.com से आते हैं।',
            '"paytm-kyc-update.net" एक फिशिंग डोमेन है — पूरी तरह से अलग।',
            'हमेशा आधिकारिक ऐप खोलकर ही केवाईसी अपडेट करें।',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#7c3aed',
        sms: {
          from: '+91-9876543210',
          body: 'आपके पिछले लेनदेन के लिए ₹2,450 की धनवापसी (Refund) लंबित है। प्रक्रिया के लिए तुरंत 9876543210 पर कॉल करें।',
          highlight: '9876543210',
        },
        question: 'आपको लंबित रिफंड के बारे में यह एसएमएस मिलता है — आपको क्या करना चाहिए?',
        options: [
          {
            text: 'अपने पैसे पाने के लिए तुरंत नंबर पर कॉल करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस नंबर पर कॉल करना ठग यही चाहता है। वे रिफंड संसाधित करने के बहाने आपका कार्ड नंबर, सीवीवी, ओटीपी या यूपीआई पिन मांगेंगे। असली रिफंड के लिए कभी कोई नंबर डायल नहीं करना पड़ता।',
          },
          {
            text: 'अनदेखा करें — आधिकारिक बैंक ऐप में रिफंड स्थिति जांचें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। वैध रिफंड बैंक द्वारा स्वचालित रूप से संसाधित किए जाते हैं और सीधे आपके खाते में दिखाई देते हैं। रिफंड संसाधित करने के लिए नंबर पर कॉल करने के लिए कभी एसएमएस नहीं मिलता। अपने आधिकारिक बैंक ऐप में लेनदेन इतिहास जांचें।',
          },
          {
            text: 'सत्यापन के लिए नंबर पर व्हाट्सएप करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। व्हाट्सएप सहित किसी भी तरह से नंबर से संपर्क करना ठग को बताता है कि आपका नंबर सक्रिय है। वे आपकी वित्तीय जानकारी साझा करवाने की कोशिश करेंगे।',
          },
          {
            text: 'रिफंड प्रोसेस करने के लिए अपने कार्ड का विवरण साझा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। रिफंड का दावा करने वाले किसी के भी साथ कार्ड विवरण, सीवीवी या ओटीपी कभी साझा न करें। असली रिफंड आपके पंजीकृत खाते में स्वचालित रूप से जाता है। यह जानकारी साझा करने पर खाते से पैसे चोरी हो सकते हैं।',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'रिफंड घोटाले आपको कॉल करने और विवरण साझा करने के लिए मजबूर करते हैं।',
            'असली रिफंड अपने आप प्रोसेस किए जाते हैं — किसी कॉल की जरूरत नहीं है।',
            'हमेशा अपने आधिकारिक बैंक ऐप में लेनदेन इतिहास (History) जांचें।',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#dc2626',
        sms: {
          from: 'GOVT-TAX',
          body: 'आयकर विभाग: ₹8,320 का रिफंड स्वीकृत। प्राप्त करने के लिए http://incometax-refund.co/claim पर PAN + बैंक विवरण जमा करें।',
          highlight: 'http://incometax-refund.co',
        },
        question: 'यह एसएमएस आयकर विभाग से होने का दावा करता है — आप क्या करते हैं?',
        options: [
          {
            text: 'विवरण भेजें — टैक्स रिफंड वैध हैं',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। टैक्स रिफंड असली होते हैं लेकिन सरकार कभी एसएमएस लिंक के माध्यम से विवरण जमा करने के लिए नहीं कहती। incometax-refund.co सरकारी वेबसाइट नहीं है। असली सरकारी वेबसाइट हमेशा .gov.in पर समाप्त होती है।',
          },
          {
            text: 'पुष्टि के लिए एसएमएस में दिए गए नंबर पर कॉल करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस एसएमएस का नंबर ठग का है। इस पर कॉल करने से आप और हेरफेर के शिकार हो सकते हैं। किसी भी टैक्स रिफंड की पुष्टि के लिए केवल incometax.gov.in पर जाएं या आधिकारिक आयकर हेल्पलाइन पर कॉल करें।',
          },
          {
            text: 'केवल incometax.gov.in पर जाएं — सरकारी साइटें .gov.in पर समाप्त होती हैं',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। सभी भारतीय सरकारी वेबसाइटें विशेष रूप से .gov.in डोमेन का उपयोग करती हैं। इस एसएमएस का लिंक incometax-refund.co पूरी तरह नकली है। असली टैक्स रिफंड आपके पंजीकृत बैंक खाते में स्वचालित रूप से जाते हैं।',
          },
          {
            text: 'केवल पैन साझा करें, बैंक विवरण नहीं',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस नकली वेबसाइट पर पैन नंबर साझा करना भी खतरनाक है। ठग आपके पैन और अन्य सार्वजनिक जानकारी का उपयोग पहचान धोखाधड़ी के लिए कर सकते हैं। एसएमएस में प्राप्त लिंक पर कोई भी व्यक्तिगत जानकारी साझा न करें।',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'भारत सरकार की वेबसाइटें हमेशा .gov.in पर समाप्त होती हैं।',
            '"incometax-refund.co" एक ठगी वाली साइट है — पूरी तरह से नकली।',
            'टैक्स रिफंड सीधे आपके पंजीकृत खाते में जाते हैं।',
          ],
        },
      },
    ],
    marathi: [
      {
        id: 1,
        badgeColor: '#ea580c',
        sms: {
          from: '+91-XXXXXXXXXXX (माहित नसलेला)',
          body: '🎉 अभिनंदन! तुम्ही HDFC लकी ड्रॉमध्ये ₹50,000 जिंकले आहेत. मिळवण्यासाठी क्लिक करा: http://hdfclucky.win/claim',
          highlight: 'http://hdfclucky.win/claim',
        },
        question: 'हा एसएमएस म्हणतो की तुम्ही ₹50,000 जिंकले आहेत — तुम्ही काय कराल?',
        options: [
          {
            text: 'बक्षीस मिळवण्यासाठी लिंकवर क्लिक करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या लिंकवर क्लिक केल्यास मालवेअर इंस्टॉल होऊ शकतो किंवा बनावट फॉर्म उघडू शकतो जो तुमची बँक माहिती चोरतो. बँका कधीही रँडम SMS लिंकद्वारे बक्षिसे देत नाहीत.',
          },
          {
            text: 'एकत्र मिळवण्यासाठी कुटुंबासह शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. हा संदेश शेअर केल्याने घोटाळा तुमच्या प्रियजनांपर्यंतही पोहोचतो. hdfclucky.win हे खरे एचडीएफसी डोमेन नाही. हे डिलीट करा आणि कुटुंबाला सावध करा.',
          },
          {
            text: 'डिलीट करा — बँक कधीही रँडम एसएमएसने बक्षीस देत नाही',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. बँका आणि कायदेशीर कंपन्या कधीही अनाहूत SMS द्वारे विजेत्यांची घोषणा करत नाहीत. hdfclucky.win पूर्णपणे बनावट आहे. असे संदेश डिलीट करा आणि नंबर ब्लॉक करा.',
          },
          {
            text: 'ते खरे आहे का हे विचारण्यासाठी उत्तर द्या',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. उत्तर दिल्याने फसवणूक करणाऱ्याला कळते की तुमचा नंबर सक्रिय आहे ज्यामुळे आणखी स्कॅम संदेश येतात. संशयास्पद SMS ला कधीही उत्तर देऊ नका.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'बँका आणि कंपन्या कधीही अचानक एसएमएसद्वारे बक्षिसे देत नाहीत.',
            '"hdfclucky.win" ही लिंक अधिकृत एचडीएफसी डोमेन नाही.',
            'शंका असल्यास, थेट बँकेला त्यांच्या अधिकृत नंबरवर कॉल करा.',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#dc2626',
        sms: {
          from: 'HDFC-UPIALT',
          body: 'प्रिय ग्राहक, तुमचा UPI ID ब्लॉक केला आहे. पुन्हा सुरू करण्यासाठी upi@hdfcverify वर ₹1 पाठवा. संदर्भ: HDFC8821',
          highlight: 'upi@hdfcverify',
        },
        question: 'या संदेशात काय चुकीचे आहे?',
        options: [
          {
            text: 'काहीही नाही — ₹1 पाठवणे हानीकारक नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. ₹1 पाठवणे देखील हानीकारक नाही असे नाही. यामुळे फसवणूक करणाऱ्याला कळते की तुमचा नंबर आणि UPI सक्रिय आहेत. खऱ्या बँका कधीही UPI पुन्हा सुरू करण्यासाठी पैसे पाठवायला सांगत नाहीत.',
          },
          {
            text: 'सत्यापनासाठी कधीही पैसे पाठवण्याची गरज नसते',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. खरी बँक कधीही खाते पुन्हा सुरू किंवा सत्यापित करण्यासाठी कोणतीही रक्कम पाठवायला सांगणार नाही. upi@hdfcverify एचडीएफसीचे नाही. ₹1 पाठवला असता तर तुमचे खाते पूर्णपणे धोक्यात आले असते.',
          },
          {
            text: 'संदर्भ क्रमांक संशयास्पद वाटतो',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. संदर्भ क्रमांक मुख्य समस्या नाही. खरी समस्या ही आहे की बँका कधीही UPI पुन्हा सुरू करण्यासाठी पैसे पाठवायला सांगत नाहीत. upi@hdfcverify हे एक फसवणूक करणाऱ्याचे खाते आहे.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. हे नक्कीच घोटाळे आहे. कोणताही बँक कधीही खाते पुन्हा सुरू करण्यासाठी पैसे पाठवायला सांगणार नाही. upi@hdfcverify कोणत्याही खऱ्या बँकेचे नाही.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'तुमचा युपीआय पुन्हा सुरू करण्यासाठी बँक कधीही पैसे पाठवायला सांगत नाही.',
            '"upi@hdfcverify" हा फसवणूक करणाऱ्याचा यूपीआय आयडी आहे — एचडीएफसीचा नाही.',
            '₹1 जरी पाठवला तरी तुमचा नंबर सक्रिय असल्याची खात्री त्यांना मिळते.',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#dc2626',
        sms: {
          from: 'SBIBANK-OTP',
          body: 'तुमचा SBI OTP 847291 आहे. तुमची KYC पूर्ण करण्यासाठी आमचा प्रतिनिधी तुम्हाला कॉल करेल. कृपया विचारल्यावर हा OTP शेअर करा.',
          highlight: '847291',
        },
        question: '"केवायसी पूर्ण करण्यासाठी" एक व्यक्ती तुम्हाला हा ओटीपी मागत आहे — तुम्ही काय कराल?',
        options: [
          {
            text: 'त्यांना तुमचा बँक नाव माहित आहे म्हणून शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. बँकेचे नाव माहित असणे कॉलरला विश्वासयोग्य बनवत नाही. फसवणूक करणारे फोन करण्यापूर्वी लक्ष्याबद्दल संशोधन करतात. OTP शेअर केल्यास अनोळखी व्यक्तीला तुमच्या बँक खात्यावर संपूर्ण नियंत्रण मिळते.',
          },
          {
            text: 'त्यांना थांबायला सांगा आणि विचार करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. विचार करणे चांगले आहे पण थांबायला सांगणे पुरेसे नाही. योग्य कृती म्हणजे त्वरित कॉल कट करणे. बँका OTP मागण्यासाठी कधीही कॉल करत नाहीत.',
          },
          {
            text: 'कॉल कट करा आणि कोणाशीही ओटीपी शेअर करू नका',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. बँक प्रतिनिधी कधीही OTP मागण्यासाठी कॉल करत नाहीत. OTP एका व्यवहारासाठी विशेषतः बनतो आणि शेअर केल्यास फसवणूक करणाऱ्याला तुमच्या खात्यावर संपूर्ण नियंत्रण मिळते. त्वरित कॉल कट करा.',
          },
          {
            text: 'फक्त शेवटचे 4 अंक शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. OTP चा भाग शेअर करणे देखील धोकादायक आहे. एक हुशार फसवणूक करणारा आंशिक माहितीवरून संपूर्ण OTP शोधू शकतो. योग्य कृती म्हणजे त्वरित कॉल कट करणे. तुमचा OTP नेहमी पूर्णपणे गुप्त ठेवा.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'बँक कधीही ओटीपी विचारण्यासाठी कॉल करत नाही.',
            'ओटीपी गुपित असतो — शेअर करणे म्हणजे ठगाला तुमच्या खात्याचा पूर्ण ताबा देणे.',
            'अधिकृत बँक प्रतिनिधींना कधीही तुमच्या ओटीपीची गरज भासणार नाही.',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#b45309',
        sms: {
          from: 'PAYTM-KYC',
          body: 'तुमचे Paytm वॉलेट 24 तासांत ब्लॉक होईल. आताच KYC पूर्ण करा: http://paytm-kyc-update.net/verify?id=99821',
          highlight: 'http://paytm-kyc-update.net',
        },
        question: 'या एसएमएसमध्ये "धोक्याची मोठी सूचना" काय आहे?',
        options: [
          {
            text: '24 तासांची मुदत घाई निर्माण करते',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. मुदत एक दबाव रणनीती आहे पण मोठा संकेत लिंक आहे. पेटीएमची अधिकृत वेबसाइट paytm.com आहे. या SMS मधील लिंक paytm-kyc-update.net वर जाते जी पूर्णपणे वेगळी आणि बनावट वेबसाइट आहे.',
          },
          {
            text: 'पेटीएमचे अधिकृत डोमेन paytm.com आहे, paytm-kyc-update.net नाही',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. पेटीएमची अधिकृत वेबसाइट paytm.com आहे. paytm-kyc-update.net सारखे इतर कोणतेही डोमेन बनावट आहे. KYC स्थिती तपासण्यासाठी नेहमी स्वतः अधिकृत Paytm अॅप उघडा.',
          },
          {
            text: 'यात केवायसीचा उल्लेख आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. KYC ही खरी गरज आहे पण त्याचा उल्लेख एकट्याने संकेत नाही. समस्या ही आहे की लिंक paytm-kyc-update.net वर जाते जी Paytm ची अधिकृत वेबसाइट नाही.',
          },
          {
            text: 'काही अडचण नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. येथे मोठी समस्या आहे. लिंक paytm-kyc-update.net वर जाते जी खरी Paytm वेबसाइट नाही. या लिंकवर क्लिक केल्यास तुमची वैयक्तिक आणि आर्थिक माहिती चोरली जाऊ शकते.',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'पेटीएमचे अधिकृत संदेश फक्त paytm.com वरून येतात.',
            '"paytm-kyc-update.net" हे फिशिंग डोमेन आहे — पूर्णपणे वेगळे.',
            'नेहमी अधिकृत अॅप उघडूनच केवायसी अपडेट करा.',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#7c3aed',
        sms: {
          from: '+91-9876543210',
          body: 'तुमच्या मागील व्यवहारासाठी ₹2,450 चा परतावा (Refund) प्रलंबित आहे. प्रक्रियेसाठी त्वरित 9876543210 वर कॉल करा.',
          highlight: '9876543210',
        },
        question: 'प्रलंबित रिफंडबाबत तुम्हाला हा एसएमएस आला आहे — तुम्ही काय करावे?',
        options: [
          {
            text: 'पैसे मिळवण्यासाठी तातडीने नंबरवर कॉल करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या नंबरवर कॉल करणे म्हणजे फसवणूक करणाऱ्याला हवे तेच करणे. ते रिफंड प्रक्रिया करण्याच्या बहाण्याने तुमचा कार्ड नंबर, CVV, OTP किंवा UPI PIN मागतील. खऱ्या रिफंडसाठी कधीही कोणाला कॉल करण्याची गरज नसते.',
          },
          {
            text: 'दुर्लक्ष करा — अधिकृत बँक अॅपमध्ये रिफंडची स्थिती तपासा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. कायदेशीर रिफंड बँकेद्वारे आपोआप प्रक्रिया केले जातात आणि थेट तुमच्या खात्यात जमा होतात. रिफंड प्रक्रिया करण्यासाठी नंबरवर कॉल करण्यास SMS कधीही येत नाही. तुमच्या अधिकृत बँक अॅपमध्ये व्यवहार इतिहास तपासा.',
          },
          {
            text: 'सत्यापनासाठी नंबरवर व्हॉट्सअॅप करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. व्हॉट्सअॅपसह कोणत्याही प्रकारे संपर्क केल्यास फसवणूक करणाऱ्याला कळते की तुमचा नंबर सक्रिय आहे. ते तुमची आर्थिक माहिती शेअर करवण्याचा प्रयत्न करतील.',
          },
          {
            text: 'रिफंड प्रोसेस करण्यासाठी कार्ड तपशील शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. रिफंड मिळवण्याचा दावा करणाऱ्या कोणाशीही कार्ड तपशील, CVV किंवा OTP शेअर करू नका. खरे रिफंड तुमच्या नोंदणीकृत खात्यात आपोआप जमा होतात. ही माहिती शेअर केल्यास पैसे चोरले जाऊ शकतात.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'रिफंड स्कॅम्स तुम्हाला कॉल करायला आणि माहिती शेअर करायला भाग पाडतात.',
            'खरे रिफंड आपोआप जमा होतात — कोणत्याही कॉलची गरज नसते.',
            'नेहमी तुमच्या अधिकृत बँक अॅपमध्ये व्यवहार इतिहास (History) तपासा.',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#dc2626',
        sms: {
          from: 'GOVT-TAX',
          body: 'आयकर विभाग: ₹8,320 रिफंड मंजूर. मिळवण्यासाठी http://incometax-refund.co/claim वर PAN + बँक तपशील सबमिट करा.',
          highlight: 'http://incometax-refund.co',
        },
        question: 'हा एसएमएस आयकर विभागाकडून असल्याचा दावा करतो — तुम्ही काय कराल?',
        options: [
          {
            text: 'माहिती भरा — टॅक्स रिफंड अधिकृत आहेत',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. टॅक्स रिफंड खरे असतात पण सरकार कधीही SMS लिंकद्वारे माहिती सबमिट करायला सांगत नाही. incometax-refund.co ही सरकारी वेबसाइट नाही. खऱ्या सरकारी वेबसाइट नेहमी .gov.in वर संपतात.',
          },
          {
            text: 'खात्री करण्यासाठी एसएमएसमधील नंबरवर कॉल करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या SMS मधील नंबर फसवणूक करणाऱ्याचा आहे. त्यावर कॉल केल्याने तुम्ही अधिक हेरफेरास बळी पडू शकता. कोणताही टॅक्स रिफंड खात्री करण्यासाठी फक्त incometax.gov.in ला थेट भेट द्या.',
          },
          {
            text: 'फक्त incometax.gov.in ला भेट द्या — सरकारी साइट्स .gov.in वर संपतात',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. सर्व भारतीय सरकारी वेबसाइट विशेषत्वाने .gov.in डोमेन वापरतात. या SMS मधील लिंक incometax-refund.co पूर्णपणे बनावट आहे. खरे टॅक्स रिफंड तुमच्या नोंदणीकृत बँक खात्यात आपोआप जमा होतात.',
          },
          {
            text: 'फक्त पॅन शेअर करा, बँक तपशील नाही',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या बनावट वेबसाइटवर PAN नंबर शेअर करणे देखील धोकादायक आहे. फसवणूक करणारे तुमचा PAN आणि इतर सार्वजनिक माहिती वापरून ओळख फसवणूक करू शकतात. SMS मध्ये मिळालेल्या लिंकवर कोणतीही वैयक्तिक माहिती शेअर करू नका.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'भारत सरकारच्या वेबसाईट नेहमी .gov.in वर संपतात.',
            '"incometax-refund.co" ही एक फसवणूक करणारी साईट आहे.',
            'टॅक्स रिफंड थेट तुमच्या नोंदणीकृत खात्यात जमा होतो.',
          ],
        },
      },
    ]
  },
  deepfake: {
    english: [
      {
        id: 1,
        badgeColor: '#7c3aed',
        post: {
          platform: 'YouTube',
          platformColor: '#dc2626',
          user: 'Trending_India_News',
          verified: false,
          thumbnail: '🎬',
          title: '"PM Modi announces free ₹10,000 for all citizens — click to claim!"',
          views: '2.1M views • 3 hours ago',
          type: 'video',
          warning: 'video claims to show a live government announcement',
        },
        question: 'A viral video claims the PM is giving free money — what do you do?',
        options: [
          {
            text: 'Share immediately to help others claim',
            correct: false,
            customFeedback: 'Do not ignore this message. Sharing spreads the scam to your contacts. The account Trending_India_News is not a verified government channel. Deepfake technology can make real politicians appear to say things they never actually said. Always verify on pib.gov.in before sharing anything.',
          },
          {
            text: 'Click the link to register your claim',
            correct: false,
            customFeedback: 'Do not ignore this message. Clicking this link could take you to a fake website that harvests your personal details or bank information. No government scheme requires you to register through a YouTube video link. Always use official government portals only.',
          },
          {
            text: 'Verify on official PIB / government websites before believing',
            correct: true,
            customFeedback: 'Well done you spotted this. Any real government announcement about free money would be published on pib.gov.in and all major news channels simultaneously. Deepfake videos can realistically show anyone saying anything. Always verify before sharing or acting on viral content.',
          },
          {
            text: 'Trust it because it has millions of views',
            correct: false,
            customFeedback: 'Do not ignore this message. View counts can be easily manipulated. Scammers purchase fake views to make content appear credible. A real government announcement would come from verified official accounts, not from Trending_India_News with no government verification badge.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'Deepfake videos can make real people say things they never said.',
            'High view counts can be faked — scammers buy views.',
            'Always verify government schemes on pib.gov.in or official sites.',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#7c3aed',
        post: {
          platform: 'WhatsApp',
          platformColor: '#16a34a',
          user: 'Family Group',
          verified: false,
          thumbnail: '📸',
          title: 'Viral photo: "Famous actor arrested for fraud!" — Forward to warn everyone',
          views: 'Forwarded many times',
          type: 'image',
          warning: 'image appears digitally altered',
        },
        question: 'A "shocking" forwarded photo claims a famous person was arrested — what should you do?',
        options: [
          {
            text: 'Forward immediately — it looks real',
            correct: false,
            customFeedback: 'Do not ignore this message. Even if an image looks real, AI can now generate or alter photos in seconds. Forwarding fake news, even unknowingly, spreads misinformation and can cause serious harm to innocent people. Always verify before forwarding.',
          },
          {
            text: 'Check via Google reverse image search or trusted news sites',
            correct: true,
            customFeedback: 'Well done you spotted this. Doing a Google reverse image search lets you see where the image originally came from and whether it is real. If a famous person was truly arrested, it would be confirmed by major trusted news sources. Always verify before forwarding anything shocking.',
          },
          {
            text: 'Trust it if many people already forwarded it',
            correct: false,
            customFeedback: 'Do not ignore this message. The number of forwards does not make a message real or safe. Fake news spreads faster than true news precisely because it is shocking. Each forward just adds credibility to misinformation. Verify through real news channels before sharing.',
          },
          {
            text: 'Add your own comment and re-share',
            correct: false,
            customFeedback: 'Do not ignore this message. Adding your comment and re-sharing still spreads unverified fake content. This can contribute to harassment of innocent people based on false information. Always check trusted news sources first before engaging with or sharing such content.',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'AI can now generate photorealistic fake images in seconds.',
            'Use Google reverse image search to check the origin of any suspicious image.',
            'Sharing fake news, even unknowingly, can cause real harm.',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#dc2626',
        post: {
          platform: 'Facebook',
          platformColor: '#1d4ed8',
          user: 'Amitabh Bachchan Official Fan',
          verified: false,
          thumbnail: '🧑‍💼',
          title: '"I am giving away ₹5 lakh to 100 lucky fans. Like + Comment + Send your bank details!"',
          views: '50K Likes',
          type: 'profile',
          warning: 'profile has no blue verification tick',
        },
        question: 'A "celebrity" page asks for your bank details to send prize money — what do you do?',
        options: [
          {
            text: 'Share bank details quickly to get the prize',
            correct: false,
            customFeedback: 'Do not ignore this message. Sharing your bank details with this page would give scammers direct access to your money. Celebrities never run giveaways by collecting bank account information. Note the page has no blue verification tick which means it is not officially endorsed.',
          },
          {
            text: 'Verify the page has blue verification tick and check follower count',
            correct: false,
            customFeedback: 'Do not ignore this message. Even checking for a blue tick is not enough protection here. The fundamental rule is no legitimate prize ever requires you to share your bank account details. Sharing bank details is always the biggest red flag regardless of how many followers a page has.',
          },
          {
            text: 'Never share bank details — this is always a scam',
            correct: true,
            customFeedback: 'Well done you spotted this. No real celebrity or company ever asks for your bank account details to give you a prize. Fake pages can buy thousands of likes to look authentic. This page also has no blue verification tick. When in doubt, find the celebrity\'s actual verified official page.',
          },
          {
            text: 'Send ₹100 first to verify it\'s real',
            correct: false,
            customFeedback: 'Do not ignore this message. Sending any amount of money is exactly what scammers want. Once you send ₹100 they will ask for more with various excuses. No real prize requires you to send money first. Any request to pay first is a guaranteed scam.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'Celebrities NEVER run giveaways asking for bank details.',
            'Fake pages can buy thousands of likes to look real.',
            'No legitimate prize ever requires you to pay money first.',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#dc2626',
        post: {
          platform: 'Phone Call',
          platformColor: '#374151',
          user: 'Unknown Number (+91-XXXXXXXXXX)',
          verified: false,
          thumbnail: '📞',
          title: '"Beta, I\'m in trouble — send ₹20,000 immediately to this account. I\'ll explain later." [Voice sounds like your relative]',
          views: 'Voice call received',
          type: 'call',
          warning: 'AI can clone anyone\'s voice from just 3 seconds of audio',
        },
        question: 'You get a call that sounds exactly like your son/daughter asking for urgent money — what do you do?',
        options: [
          {
            text: 'Transfer immediately — the voice sounds real',
            correct: false,
            customFeedback: 'Do not ignore this message. AI voice cloning technology can perfectly replicate anyone\'s voice using just a few seconds of audio from social media or phone calls. A voice sounding real is no longer proof that it is real. Always call back on the known number before transferring any money.',
          },
          {
            text: 'Call back on the number you know them by to verify',
            correct: true,
            customFeedback: 'Well done you spotted this. This is exactly the right action. Hang up and immediately call your relative back on the number saved in your contacts. If they are truly in trouble they will answer or the real number will confirm the situation. Never transfer money based solely on an unexpected call.',
          },
          {
            text: 'Transfer half the amount to be safe',
            correct: false,
            customFeedback: 'Do not ignore this message. Transferring half is still falling for the scam. Once you send any money to the scammer\'s account it is almost impossible to recover. The scammer will then likely ask for the other half too. Never transfer based on an unexpected call without verifying on a known number.',
          },
          {
            text: 'Trust it — only family knows your name',
            correct: false,
            customFeedback: 'Do not ignore this message. Scammers can find your name and family members names from social media, data leaks, or public records. Knowing your name or family details does not make a caller trustworthy. Voice cloning makes them sound like someone you know. Always verify on a known contact number.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'AI voice cloning can replicate anyone\'s voice from just seconds of audio.',
            'Always call back on the number you already have saved.',
            'Scammers create urgency so you don\'t stop to think.',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#b45309',
        post: {
          platform: 'Twitter / X',
          platformColor: '#1a1a1a',
          user: '@BreakingIndia_News99',
          verified: false,
          thumbnail: '🗞️',
          title: '"BREAKING: Government has declared bank holiday for 3 days — withdraw your money NOW before ATMs close!"',
          views: '10K Retweets',
          type: 'tweet',
          warning: 'account created 2 days ago with no history',
        },
        question: 'A tweet says banks will close in 3 days and you should withdraw money — what do you do?',
        options: [
          {
            text: 'Rush to ATM immediately',
            correct: false,
            customFeedback: 'Do not ignore this message. This is exactly what the scam is designed to cause. Mass panic withdrawals can harm the economy. The account BreakingIndia_News99 was created only 2 days ago and has no history. Real bank holidays are announced by RBI on rbi.org.in, not by random Twitter accounts.',
          },
          {
            text: 'Retweet to warn your followers',
            correct: false,
            customFeedback: 'Do not ignore this message. Retweeting unverified news spreads panic and misinformation. If this is fake, you become part of spreading it. Always verify on rbi.org.in and official news outlets before sharing any news about banks or financial emergencies.',
          },
          {
            text: 'Verify on RBI.org.in and official news channels before acting',
            correct: true,
            customFeedback: 'Well done you spotted this. All official RBI announcements appear on rbi.org.in. The account making this claim was created just 2 days ago and has no history which is a major red flag. Panic-inducing fake news is designed to spread fast. Always verify through official sources before acting.',
          },
          {
            text: 'Trust it because it has many retweets',
            correct: false,
            customFeedback: 'Do not ignore this message. Retweet counts do not prove accuracy. Panic-based content spreads the fastest on social media. A 2-day-old account with 10K retweets is a classic sign of coordinated fake news. Verify on rbi.org.in before taking any financial action.',
          },
        ],
        feedback: {
          icon: '📡',
          lines: [
            'Panic-inducing fake news spreads fastest — that\'s the design.',
            'Official RBI announcements are at rbi.org.in — always check there.',
            'Never make financial decisions based on social media posts.',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#7c3aed',
        post: {
          platform: 'Instagram',
          platformColor: '#c026d3',
          user: 'David_Captain_US_Army',
          verified: false,
          thumbnail: '💌',
          title: 'After months of chatting, this "foreign army officer" asks you to send ₹15,000 for a "customs fee" to deliver a package of gold as a gift.',
          views: 'Profile has model photos — no real posts',
          type: 'dm',
          warning: 'account uses stolen photos of real people',
        },
        question: 'An online "friend" you\'ve never met asks you to send money for a gift delivery — what do you do?',
        options: [
          {
            text: 'Send the money — they\'ve been kind for months',
            correct: false,
            customFeedback: 'Do not ignore this message. Months of apparent kindness is exactly how romance scammers build enough trust to steal your money. The profile photos are likely stolen from a real person. No genuine gift sender ever asks the recipient to pay customs fees.',
          },
          {
            text: 'Send half the amount first to test',
            correct: false,
            customFeedback: 'Do not ignore this message. Sending any amount confirms to the scammer that you are willing to pay. After you send half they will invent more excuses, say the customs fee increased or there is another charge. Once you send money to a scammer it is very rarely recoverable.',
          },
          {
            text: 'This is a romance scam — block and report the account',
            correct: true,
            customFeedback: 'Well done you spotted this. This is a classic romance scam. Scammers build emotional trust for months before making financial requests. The profile has model photos with no real posts. No legitimate gift comes with a customs fee that the recipient must pay. Block and report immediately.',
          },
          {
            text: 'Ask for their phone number before sending',
            correct: false,
            customFeedback: 'Do not ignore this message. A scammer will readily give you a phone number, possibly of an accomplice or a fake VoIP number. Getting a phone number does not make this person real or trustworthy. The request for money for a customs fee is a guaranteed scam. Block and report the account.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'Romance scammers build trust for months before asking for money.',
            'No one sending you a gift will ask YOU to pay customs for it.',
            'Reverse image search their photos — often stolen from real profiles.',
          ],
        },
      },
    ],
    hindi: [
      {
        id: 1,
        badgeColor: '#7c3aed',
        post: {
          platform: 'YouTube',
          platformColor: '#dc2626',
          user: 'Trending_India_News',
          verified: false,
          thumbnail: '🎬',
          title: '"पीएम मोदी ने सभी नागरिकों के लिए मुफ्त ₹10,000 की घोषणा की — दावा करने के लिए क्लिक करें!"',
          views: '2.1M views • 3 hours ago',
          type: 'video',
          warning: 'वीडियो में सरकारी घोषणा दिखाई देने का दावा किया गया है',
        },
        question: 'एक वायरल वीडियो दावा करता है कि पीएम मुफ्त पैसे दे रहे हैं — आप क्या करते हैं?',
        options: [
          {
            text: 'दूसरों की मदद के लिए तुरंत साझा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। साझा करने से घोटाला आपके संपर्कों तक फैलता है। Trending_India_News एक सत्यापित सरकारी चैनल नहीं है। डीपफेक तकनीक वास्तविक नेताओं को वह कहते हुए दिखा सकती है जो उन्होंने कभी नहीं कहा। साझा करने से पहले pib.gov.in पर जांचें।',
          },
          {
            text: 'दावा दर्ज करने के लिए लिंक पर क्लिक करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस लिंक पर क्लिक करने से आप एक नकली वेबसाइट पर जा सकते हैं जो आपकी व्यक्तिगत जानकारी या बैंक विवरण चुरा ले। कोई सरकारी योजना आपको YouTube वीडियो लिंक के माध्यम से पंजीकरण करने के लिए नहीं कहती। केवल आधिकारिक सरकारी पोर्टल का उपयोग करें।',
          },
          {
            text: 'विश्वास करने से पहले आधिकारिक PIB / सरकारी वेबसाइटों पर जांचें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। मुफ्त पैसे के बारे में कोई भी असली सरकारी घोषणा pib.gov.in पर और सभी प्रमुख समाचार चैनलों पर एक साथ प्रकाशित होती। डीपफेक वीडियो किसी को भी कुछ भी कहते हुए दिखा सकते हैं। वायरल सामग्री पर कार्रवाई करने से पहले हमेशा सत्यापित करें।',
          },
          {
            text: 'भरोसा करें क्योंकि इसे लाखों लोगों ने देखा है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। व्यूज की संख्या आसानी से manipulate की जा सकती है। ठग विश्वसनीय दिखने के लिए नकली व्यूज खरीदते हैं। असली सरकारी घोषणा सत्यापित आधिकारिक खातों से आती, न कि बिना सरकारी सत्यापन बैज के Trending_India_News से।',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'डीपफेक वीडियो असली लोगों से वह सब बुलवा सकते हैं जो उन्होंने कभी नहीं कहा।',
            'व्यूज की संख्या नकली हो सकती है — ठग व्यूज खरीदते हैं।',
            'हमेशा pib.gov.in या आधिकारिक साइटों पर सरकारी योजनाओं की जांच करें।',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#7c3aed',
        post: {
          platform: 'WhatsApp',
          platformColor: '#16a34a',
          user: 'Family Group',
          verified: false,
          thumbnail: '📸',
          title: 'वायरल फोटो: "प्रसिद्ध अभिनेता धोखाधड़ी के लिए गिरफ्तार!" — सबको सावधान करने के लिए फॉरवर्ड करें',
          views: 'Forwarded many times',
          type: 'image',
          warning: 'तस्वीर डिजिटल रूप से बदली हुई लगती है',
        },
        question: 'एक "चौंकाने वाली" फॉरवर्ड फोटो दावा करती है कि एक प्रसिद्ध व्यक्ति को गिरफ्तार किया गया है — आपको क्या करना चाहिए?',
        options: [
          {
            text: 'तुरंत फॉरवर्ड करें — यह असली लग रहा है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। भले ही तस्वीर असली लगे लेकिन अब AI सेकंडों में फोटो बना या बदल सकता है। अनजाने में भी नकली खबर फॉरवर्ड करना गलत सूचना फैलाता है और निर्दोष लोगों को नुकसान पहुंचा सकता है।',
          },
          {
            text: 'Google रिवर्स इमेज सर्च या विश्वसनीय समाचार साइटों के माध्यम से जांचें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। Google रिवर्स इमेज सर्च करने से आप देख सकते हैं कि तस्वीर वास्तव में कहाँ से आई और क्या यह असली है। यदि कोई प्रसिद्ध व्यक्ति वाकई गिरफ्तार होता तो प्रमुख विश्वसनीय समाचार स्रोतों से इसकी पुष्टि होती।',
          },
          {
            text: 'अगर बहुत से लोग पहले ही फॉरवर्ड कर चुके हैं तो भरोसा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। फॉरवर्ड की संख्या संदेश को सच या सुरक्षित नहीं बनाती। नकली खबर सच्ची खबर से ज़्यादा तेज़ फैलती है क्योंकि यह चौंकाने वाली होती है। असली समाचार चैनलों के माध्यम से जांचें।',
          },
          {
            text: 'अपनी टिप्पणी जोड़ें और फिर से साझा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। अपनी टिप्पणी जोड़ना और फिर से साझा करना अभी भी असत्यापित नकली सामग्री फैलाता है। यह झूठी जानकारी के आधार पर निर्दोष लोगों को उत्पीड़न में योगदान दे सकता है।',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'एआई अब कुछ ही सेकंड में असली दिखने वाली नकली तस्वीरें बना सकता है।',
            'किसी भी संदिग्ध छवि के स्रोत की जांच के लिए Google रिवर्स इमेज सर्च का उपयोग करें।',
            'अनजाने में भी फर्जी खबरें साझा करना वास्तविक नुकसान पहुंचा सकता है।',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#dc2626',
        post: {
          platform: 'Facebook',
          platformColor: '#1d4ed8',
          user: 'Amitabh Bachchan Official Fan',
          verified: false,
          thumbnail: '🧑‍💼',
          title: '"मैं 100 भाग्यशाली प्रशंसकों को ₹5 लाख दे रहा हूँ। लाइक + कमेंट + अपना बैंक विवरण भेजें!"',
          views: '50K Likes',
          type: 'profile',
          warning: 'प्रोफ़ाइल में कोई नीला टिक (Blue Tick) नहीं है',
        },
        question: 'एक "सेलिब्रिटी" पेज इनामी राशि भेजने के लिए आपका बैंक विवरण मांगता है — आप क्या करते हैं?',
        options: [
          {
            text: 'इनाम पाने के लिए जल्दी से बैंक विवरण साझा करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। इस पेज के साथ बैंक विवरण साझा करने पर ठगों को आपके पैसे तक सीधी पहुँच मिलती है। सेलिब्रिटी कभी बैंक खाता जानकारी एकत्र करके इनाम नहीं देते।',
          },
          {
            text: 'जांचें कि पेज में नीला टिक है और फॉलोअर्स की संख्या देखें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। नीला टिक जांचना भी पर्याप्त सुरक्षा नहीं है। मूल नियम यह है कि कोई भी वैध इनाम आपसे बैंक खाते की जानकारी साझा करने के लिए नहीं कहता।',
          },
          {
            text: 'बैंक विवरण कभी साझा न करें — यह हमेशा एक घोटाला है',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। कोई असली सेलिब्रिटी या कंपनी कभी आपसे इनाम देने के लिए बैंक खाते की जानकारी नहीं मांगती। नकली पेज हज़ारों लाइक्स खरीद सकते हैं। इस पेज में नीला सत्यापन टिक भी नहीं है।',
          },
          {
            text: 'असली है या नहीं, यह जांचने के लिए पहले ₹100 भेजें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। कोई भी राशि भेजना ठग यही चाहते हैं। एक बार ₹100 भेजने पर वे और माँगेंगे। कोई असली इनाम आपसे पहले पैसे भेजने के लिए नहीं कहता।',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'सेलिब्रिटी बैंक विवरण मांगकर कभी भी इनाम नहीं देते हैं।',
            'नकली पेज असली दिखने के लिए हजारों लाइक्स खरीद सकते हैं।',
            'किसी भी वैध इनाम के लिए आपको पहले पैसे देने की आवश्यकता नहीं होती है।',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#dc2626',
        post: {
          platform: 'Phone Call',
          platformColor: '#374151',
          user: 'अज्ञात नंबर (+91-XXXXXXXXXX)',
          verified: false,
          thumbnail: '📞',
          title: '"बेटा, मैं मुसीबत में हूँ — इस खाते में तुरंत ₹20,000 भेजें। मैं बाद में सब बता दूँगा।" [आवाज आपके रिश्तेदार जैसी है]',
          views: 'Voice call received',
          type: 'call',
          warning: 'एआई सिर्फ 3 सेकंड के ऑडियो से किसी की भी आवाज की नकल कर सकता है',
        },
        question: 'आपको एक कॉल आती है जिसकी आवाज बिल्कुल आपके बेटे/बेटी जैसी है और वह पैसे मांग रहा है — आप क्या करेंगे?',
        options: [
          {
            text: 'तुरंत पैसे भेजें — आवाज असली लग रही है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। एआई वॉयस क्लोनिंग तकनीक सोशल मीडिया या पुरानी कॉल्स से कुछ सेकंड के ऑडियो का उपयोग करके किसी की भी आवाज की नकल कर सकती है। आवाज असली लगना अब यह प्रमाण नहीं है कि वह असली है।',
          },
          {
            text: 'पुष्टि करने के लिए उस नंबर पर वापस कॉल करें जिसे आप जानते हैं',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। यही सही कदम है। फोन काटें और तुरंत अपने रिश्तेदार को उनके सेव किए हुए नंबर पर वापस कॉल करें। अगर वे सच में मुसीबत में हैं तो वे जवाब देंगे। बिना सत्यापन के अप्रत्याशित कॉल पर कभी पैसे न भेजें।',
          },
          {
            text: 'सुरक्षित रहने के लिए केवल आधी राशि भेजें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। आधी राशि भेजना भी घोटाले में फंसना है। एक बार ठग के खाते में पैसे जाने के बाद उन्हें वापस पाना लगभग असंभव है। अप्रत्याशित कॉल पर बिना जाने पहचाने नंबर पर सत्यापन किए बिना कभी पैसे न भेजें।',
          },
          {
            text: 'भरोसा करें — केवल परिवार ही आपका नाम जानता है',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। ठग सोशल मीडिया, डेटा लीक या सार्वजनिक रिकॉर्ड से आपका और परिवार के सदस्यों का नाम जान सकते हैं। नाम जानना कॉलर को भरोसेमंद नहीं बनाता।',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'एआई वॉयस क्लोनिंग किसी की भी आवाज की नकल कर सकता है।',
            'हमेशा उस नंबर पर वापस कॉल करें जो आपने पहले से सहेजा (save) हुआ है।',
            'ठग जल्दबाजी पैदा करते हैं ताकि आप सोचने के लिए न रुकें।',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#b45309',
        post: {
          platform: 'Twitter / X',
          platformColor: '#1a1a1a',
          user: '@BreakingIndia_News99',
          verified: false,
          thumbnail: '🗞️',
          title: '"बड़ी खबर: सरकार ने 3 दिनों के लिए बैंक अवकाश घोषित किया है — एटीएम बंद होने से पहले अपना पैसा निकाल लें!"',
          views: '10K Retweets',
          type: 'tweet',
          warning: 'खाता 2 दिन पहले बनाया गया है और कोई इतिहास नहीं है',
        },
        question: 'एक ट्वीट कहता है कि बैंक 3 दिनों में बंद हो जाएंगे और आपको पैसे निकाल लेने चाहिए — आप क्या करेंगे?',
        options: [
          {
            text: 'तुरंत एटीएम की ओर दौड़ें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। यही घोटाला करवाना चाहता है। सामूहिक घबराहट निकासी अर्थव्यवस्था को नुकसान पहुंचा सकती है। BreakingIndia_News99 केवल 2 दिन पहले बना है। असली बैंक छुट्टियाँ RBI द्वारा rbi.org.in पर घोषित होती हैं, न कि यादृच्छिक ट्विटर खातों द्वारा।',
          },
          {
            text: 'अपने फॉलोअर्स को सावधान करने के लिए रीट्वीट करें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। असत्यापित खबर रीट्वीट करने से घबराहट और गलत जानकारी फैलती है। अगर यह नकली है तो आप इसे फैलाने में सहभागी हो जाते हैं। बैंकों के बारे में कोई भी खबर साझा करने से पहले rbi.org.in पर जांचें।',
          },
          {
            text: 'कार्रवाई करने से पहले RBI.org.in और आधिकारिक समाचारों पर जांचें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। सभी आधिकारिक RBI घोषणाएं rbi.org.in पर दिखती हैं। यह दावा करने वाला खाता सिर्फ 2 दिन पहले बना और इसका कोई इतिहास नहीं है जो बड़ा संकेत है। कोई भी वित्तीय कार्रवाई करने से पहले आधिकारिक स्रोतों से जांचें।',
          },
          {
            text: 'भरोसा करें क्योंकि इसके कई रीट्वीट हैं',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। रीट्वीट की संख्या सटीकता साबित नहीं करती। घबराहट आधारित सामग्री सोशल मीडिया पर सबसे तेज़ फैलती है। 2 दिन पुराना खाता और 10K रीट्वीट नकली खबर का क्लासिक संकेत है।',
          },
        ],
        feedback: {
          icon: '📡',
          lines: [
            'घबराहट पैदा करने वाली फर्जी खबरें सबसे तेजी से फैलती हैं।',
            'आधिकारिक आरबीआई घोषणाएं rbi.org.in पर होती हैं — हमेशा वहां जांचें।',
            'सोशल मीडिया पोस्ट के आधार पर कभी भी वित्तीय फैसले न लें।',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#7c3aed',
        post: {
          platform: 'Instagram',
          platformColor: '#c026d3',
          user: 'David_Captain_US_Army',
          verified: false,
          thumbnail: '❤️',
          title: 'महीनों की बातचीत के बाद, यह "विदेशी सेना अधिकारी" उपहार भेजने के लिए आपसे ₹15,000 "कस्टम शुल्क" मांगता है।',
          views: 'Profile has model photos — no real posts',
          type: 'dm',
          warning: 'खाते में असली लोगों की चोरी की गई तस्वीरों का उपयोग किया गया है',
        },
        question: 'एक ऑनलाइन "दोस्त", जिससे आप कभी नहीं मिले, उपहार के लिए पैसे मांगता है — आप क्या करेंगे?',
        options: [
          {
            text: 'पैसे भेजें — वे महीनों से अच्छे रहे हैं',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। महीनों की दयालुता ठीक वैसे ही है जैसे रोमांस स्कैमर आपका भरोसा बनाते हैं। प्रोफ़ाइल तस्वीरें संभवतः किसी असली व्यक्ति से चोरी की गई हैं। कोई भी असली उपहार भेजने वाला प्राप्तकर्ता से कस्टम शुल्क नहीं मांगता।',
          },
          {
            text: 'जांचने के लिए पहले केवल आधी राशि भेजें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। कोई भी राशि भेजने पर ठग को पता चलता है कि आप भुगतान करने को तैयार हैं। आधे पैसे भेजने के बाद वे और बहाने बनाएंगे। ठग के खाते में पैसे जाने के बाद उन्हें वापस पाना बहुत मुश्किल है।',
          },
          {
            text: 'यह एक रोमांस स्कैम है — खाते को ब्लॉक और रिपोर्ट करें',
            correct: true,
            customFeedback: 'शाबाश, आपने यह पहचान लिया। यह एक क्लासिक रोमांस घोटाला है। ठग पैसे मांगने से पहले महीनों तक भावनात्मक विश्वास बनाते हैं। प्रोफ़ाइल में असली पोस्ट के बिना केवल मॉडल तस्वीरें हैं। कोई असली उपहार कस्टम शुल्क के साथ नहीं आता। तुरंत ब्लॉक और रिपोर्ट करें।',
          },
          {
            text: 'भेजने से पहले उनका फोन नंबर मांगें',
            correct: false,
            customFeedback: 'इस संदेश को नज़रअंदाज़ न करें। ठग आपको आसानी से एक नंबर दे देंगे। नंबर मिलना इस व्यक्ति को असली या भरोसेमंद नहीं बनाता। कस्टम शुल्क के लिए पैसे मांगना एक गारंटीकृत घोटाला है। खाते को ब्लॉक और रिपोर्ट करें।',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'रोमांस स्कैमर पैसे मांगने से पहले महीनों तक विश्वास बनाते हैं।',
            'उपहार भेजने वाला आपसे उसके लिए शुल्क कभी नहीं मांगेगा।',
            'उनकी तस्वीरों को रिवर्स इमेज सर्च करें — ये अक्सर चोरी की गई होती हैं।',
          ],
        },
      },
    ],
    marathi: [
      {
        id: 1,
        badgeColor: '#7c3aed',
        post: {
          platform: 'YouTube',
          platformColor: '#dc2626',
          user: 'Trending_India_News',
          verified: false,
          thumbnail: '🎬',
          title: '"पीएम मोदींनी सर्व नागरिकांसाठी मोफत ₹10,000 जाहीर केले — मिळवण्यासाठी क्लिक करा!"',
          views: '2.1M views • 3 hours ago',
          type: 'video',
          warning: 'व्हिडीओ थेट सरकारी घोषणा असल्याचा दावा करतो',
        },
        question: 'एक व्हायरल व्हिडीओ दावा करतो की पीएम मोफत पैसे देत आहेत — तुम्ही काय कराल?',
        options: [
          {
            text: 'इतरांच्या मदतीसाठी त्वरित शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. शेअर केल्याने घोटाळा तुमच्या संपर्कांपर्यंत पोहोचतो. Trending_India_News हे सत्यापित सरकारी चॅनेल नाही. डीपफेक तंत्रज्ञान खऱ्या नेत्यांना ते कधीही न बोललेल्या गोष्टी बोलताना दाखवू शकते.',
          },
          {
            text: 'नोंदणी करण्यासाठी लिंकवर क्लिक करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या लिंकवर क्लिक केल्यास तुम्ही एका बनावट वेबसाइटवर जाऊ शकता जी तुमची वैयक्तिक माहिती किंवा बँक तपशील चोरते. कोणतीही सरकारी योजना YouTube व्हिडीओ लिंकद्वारे नोंदणी करायला सांगत नाही.',
          },
          {
            text: 'विश्वास ठेवण्यापूर्वी अधिकृत PIB / सरकारी वेबसाईटवर तपासा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. मोफत पैशांबाबत कोणतीही खरी सरकारी घोषणा pib.gov.in आणि सर्व प्रमुख बातम्यांच्या वाहिन्यांवर एकत्रितपणे प्रकाशित होते. डीपफेक व्हिडीओ कोणालाही काहीही बोलताना दाखवू शकतात. व्हायरल सामग्रीवर कृती करण्यापूर्वी नेहमी सत्यापित करा.',
          },
          {
            text: 'भरोसा ठेवा कारण तो लाखो लोकांनी पाहिला आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. व्ह्यूजची संख्या सहज manipulate केली जाऊ शकते. फसवणूक करणारे विश्वासार्ह वाटण्यासाठी बनावट व्ह्यूज विकत घेतात. खरी सरकारी घोषणा सत्यापित अधिकृत खात्यांवरून येते.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'डीपफेक व्हिडीओ खऱ्या लोकांमार्फत न बोललेल्या गोष्टी वदवून घेऊ शकतात.',
            'व्ह्यूजची संख्या खोटी असू शकते — फसवणूक करणारे व्ह्यूज विकत घेतात.',
            'नेहमी pib.gov.in किंवा अधिकृत साईट्सवर सरकारी योजनांची खात्री करा.',
          ],
        },
      },
      {
        id: 2,
        badgeColor: '#7c3aed',
        post: {
          platform: 'WhatsApp',
          platformColor: '#16a34a',
          user: 'Family Group',
          verified: false,
          thumbnail: '📸',
          title: ' व्हायरल फोटो: "प्रसिद्ध अभिनेत्याला फसवणुकीसाठी अटक!" — सर्वांना सावध करण्यासाठी फॉरवर्ड करा',
          views: 'Forwarded many times',
          type: 'image',
          warning: 'फोटोमध्ये बदल केल्यासारखे वाटते',
        },
        question: 'एक फॉरवर्ड फोटो दावा करतो की एका प्रसिद्ध व्यक्तीला अटक झाली आहे — तुम्ही काय करावे?',
        options: [
          {
            text: 'ताबडतोब फॉरवर्ड करा — ते खरे वाटते',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. फोटो खरा वाटत असला तरी AI आता सेकंदांत फोटो बनवू किंवा बदलू शकते. नकळतही खोटी बातमी फॉरवर्ड करणे चुकीची माहिती पसरवते आणि निर्दोष लोकांना हानी पोहोचवू शकते.',
          },
          {
            text: 'Google रिव्हर्स इमेज सर्च किंवा विश्वसनीय न्यूज साईट्सद्वारे तपासा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. Google रिव्हर्स इमेज सर्च केल्यास तुम्ही पाहू शकता की फोटो मूळतः कुठून आला आणि तो खरा आहे का. जर एखाद्या प्रसिद्ध व्यक्तीला खरोखर अटक झाली असती तर प्रमुख विश्वसनीय बातम्यांच्या स्रोतांकडून पुष्टी झाली असती.',
          },
          {
            text: 'खूप लोकांनी आधीच फॉरवर्ड केले असेल तर विश्वास ठेवा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. फॉरवर्डची संख्या संदेशाला खरे किंवा सुरक्षित बनवत नाही. खोट्या बातम्या खऱ्यापेक्षा जास्त वेगाने पसरतात कारण त्या धक्कादायक असतात. खऱ्या बातम्यांच्या वाहिन्यांद्वारे तपासा.',
          },
          {
            text: 'तुमची प्रतिक्रिया जोडा आणि पुन्हा शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. तुमची प्रतिक्रिया जोडून पुन्हा शेअर करणे अजूनही असत्यापित बनावट सामग्री पसरवते. खऱ्या बातम्यांच्या स्रोतांद्वारे तपासल्याशिवाय अशा सामग्रीत भाग घेऊ नका.',
          },
        ],
        feedback: {
          icon: '🔍',
          lines: [
            'एआय आता काही सेकंदात हुबेहूब खोटे फोटो तयार करू शकते.',
            'कोणत्याही संशयास्पद फोटोची मूळ माहिती तपासण्यासाठी Google रिव्हर्स इमेज सर्च वापरा.',
            'नकळतही खोटी बातमी शेअर करणे हानिकारक ठरू शकते.',
          ],
        },
      },
      {
        id: 3,
        badgeColor: '#dc2626',
        post: {
          platform: 'Facebook',
          platformColor: '#1d4ed8',
          user: 'Amitabh Bachchan Official Fan',
          verified: false,
          thumbnail: '🧑‍💼',
          title: '"मी 100 भाग्यवान चाहत्यांना ₹5 लाख देत आहे. लाईक + कमेंट + तुमचे बँक तपशील पाठवा!"',
          views: '50K Likes',
          type: 'profile',
          warning: 'प्रोफाईलला निळा टिक (Blue Tick) नाही',
        },
        question: 'एक "सेलिब्रिटी" पेज बक्षिसाचे पैसे पाठवण्यासाठी तुमचे बँक तपशील मागत आहे — तुम्ही काय कराल?',
        options: [
          {
            text: 'बक्षीस मिळवण्यासाठी पटकन बँक तपशील शेअर करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. या पेजशी बँक तपशील शेअर केल्यास फसवणूक करणाऱ्यांना तुमच्या पैशांवर थेट नियंत्रण मिळते. सेलिब्रिटी कधीही बँक खाते माहिती गोळा करून बक्षिसे देत नाहीत.',
          },
          {
            text: 'पेजला निळा टिक आहे का ते तपासा आणि फॉलोअर्स बघा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. निळा टिक तपासणे देखील पुरेसे संरक्षण नाही. मूलभूत नियम असा आहे की कोणताही कायदेशीर बक्षीस तुम्हाला बँक खाते तपशील शेअर करायला सांगत नाही.',
          },
          {
            text: 'बँक तपशील कधीही शेअर करू नका — ही नेहमीच फसवणूक असते',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. कोणताही खरा सेलिब्रिटी किंवा कंपनी बक्षीस देण्यासाठी तुमच्या बँक खाते तपशीलांसाठी कधीही विचारणार नाही. बनावट पेजेस हजारो लाईक्स विकत घेऊ शकतात. या पेजला निळा सत्यापन टिक नाही.',
          },
          {
            text: 'अगोदर ₹100 पाठवून बघू खरे आहे का',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. कोणतीही रक्कम पाठवणे म्हणजे फसवणूक करणाऱ्याला हवे तेच करणे. एकदा ₹100 पाठवल्यावर ते आणखी मागतील. कोणताही खरा बक्षीस तुम्हाला आधी पैसे पाठवायला सांगत नाही.',
          },
        ],
        feedback: {
          icon: '🚫',
          lines: [
            'सेलिब्रिटी बँक तपशील मागून कधीही बक्षिसे देत नाहीत.',
            'खोटे पेजेस खरे वाटण्यासाठी हजारो लाईक्स विकत घेऊ शकतात.',
            'कोणत्याही खऱ्या बक्षिसासाठी तुम्हाला अगोदर पैसे द्यावे लागत नाहीत.',
          ],
        },
      },
      {
        id: 4,
        badgeColor: '#dc2626',
        post: {
          platform: 'Phone Call',
          platformColor: '#374151',
          user: 'अज्ञात नंबर (+91-XXXXXXXXXX)',
          verified: false,
          thumbnail: '📞',
          title: '"बेटा, मी अडचणीत आहे — या खात्यात त्वरित ₹20,000 पाठव. मी नंतर सर्व सांगतो." [आवाज तुमच्या नातेवाईकासारखा आहे]',
          views: 'Voice call received',
          type: 'call',
          warning: 'एआय फक्त 3 सेकंदांच्या ऑडिओवरून कोणाच्याही आवाजाची नक्कल करू शकते',
        },
        question: 'तुम्हाला तुमच्या मुलाचा/मुलीचा आवाज असलेला कॉल आला आहे जो तातडीने पैसे मागत आहे — तुम्ही काय कराल?',
        options: [
          {
            text: 'ताबडतोब पैसे पाठवा — आवाज खरा वाटत आहे',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. AI व्हॉइस क्लोनिंग तंत्रज्ञान सोशल मीडिया किंवा जुन्या कॉल्समधील काही सेकंदांच्या ऑडिओचा वापर करून कोणाच्याही आवाजाची नक्कल करू शकते. आवाज खरा वाटणे आता तो खरा असल्याचा पुरावा नाही.',
          },
          {
            text: 'खात्री करण्यासाठी त्यांच्या जुन्या नंबरवर परत कॉल करा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. ही नेमकी योग्य कृती आहे. फोन कट करा आणि त्वरित तुमच्या नातेवाईकाला तुमच्या संपर्कात सेव्ह केलेल्या नंबरवर परत कॉल करा. ते खरोखर अडचणीत असतील तर उत्तर देतील. अनपेक्षित कॉलवर ओळखीच्या नंबरवर पुष्टी केल्याशिवाय कधीही पैसे पाठवू नका.',
          },
          {
            text: 'फक्त अर्धे पैसे पाठवून बघू',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. अर्धे पाठवणे म्हणजे अजूनही घोटाळ्यात अडकणे. फसवणूक करणाऱ्याच्या खात्यात एकदा पैसे गेले की परत मिळवणे जवळजवळ अशक्य आहे. नंतर ते उर्वरित अर्धे देखील मागतात.',
          },
          {
            text: 'भरोसा ठेवा — फक्त कुटुंबालाच तुमचे नाव माहित असते',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. फसवणूक करणारे सोशल मीडिया, डेटा लीक किंवा सार्वजनिक नोंदींमधून तुमचे आणि कुटुंबाचे नाव शोधू शकतात. नाव माहित असणे कॉलरला विश्वासयोग्य बनवत नाही.',
          },
        ],
        feedback: {
          icon: '⚠️',
          lines: [
            'एआय वॉयस क्लोनिंग कोणाच्याही आवाजाची नक्कल करू शकते.',
            'नेहमी त्या नंबरवर परत कॉल करा जो तुमच्याकडे आधीच सेव्ह आहे.',
            'फसवणूक करणारे घाई करतात जेणेकरून तुम्ही विचार करायला थांबू नये.',
          ],
        },
      },
      {
        id: 5,
        badgeColor: '#b45309',
        post: {
          platform: 'Twitter / X',
          platformColor: '#1a1a1a',
          user: '@BreakingIndia_News99',
          verified: false,
          thumbnail: '🗞️',
          title: '"मोठी बातमी: सरकारने 3 दिवस बँक सुट्टी जाहीर केली आहे — एटीएम बंद होण्यापूर्वी तुमचे पैसे काढून घ्या!"',
          views: '10K Retweets',
          type: 'tweet',
          warning: 'खाते 2 दिवसांपूर्वी तयार केले आहे आणि कोणताही इतिहास नाही',
        },
        question: 'एक ट्विट म्हणते की बँका 3 दिवस बंद राहणार आहेत, तुम्ही काय कराल?',
        options: [
          {
            text: 'त्वरित एटीएमकडे धाव घ्या',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. घोटाळा हेच घडवायला इच्छितो. सामूहिक घाबरून पैसे काढणे अर्थव्यवस्थेला हानी पोहोचवते. BreakingIndia_News99 हे खाते फक्त 2 दिवसांपूर्वी बनले आहे. खऱ्या बँक सुट्ट्या RBI कडून rbi.org.in वर जाहीर होतात.',
          },
          {
            text: 'इतरांना सावध करण्यासाठी रिट्विट करा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. असत्यापित बातमी रिट्विट केल्याने घाबराट आणि चुकीची माहिती पसरते. बँकांबद्दल कोणतीही बातमी शेअर करण्यापूर्वी rbi.org.in आणि अधिकृत बातम्यांच्या माध्यमांवर तपासा.',
          },
          {
            text: 'कृती करण्यापूर्वी RBI.org.in आणि अधिकृत बातम्यांवर तपासा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. सर्व अधिकृत RBI घोषणा rbi.org.in वर दिसतात. हा दावा करणारे खाते फक्त 2 दिवसांपूर्वी बनले आहे आणि त्याचा कोणताही इतिहास नाही जे मोठे संकेत आहे. कोणतीही आर्थिक कृती करण्यापूर्वी अधिकृत स्रोतांमधून तपासा.',
          },
          {
            text: 'भरोसा ठेवा कारण त्याचे खूप रिट्विट आहेत',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. रिट्विटची संख्या अचूकता सिद्ध करत नाही. घाबरवणारी सामग्री सोशल मीडियावर सर्वात जलद पसरते. 2 दिवस जुने खाते आणि 10K रिट्विट हे बनावट बातम्यांचे क्लासिक लक्षण आहे.',
          },
        ],
        feedback: {
          icon: '📡',
          lines: [
            'घबराट निर्माण करणाऱ्या खोट्या बातम्या वेगाने पसरतात.',
            'अधिकृत आरबीआयच्या घोषणा rbi.org.in वर असतात — नेहमी तिथे तपासा.',
            'सोशल मीडियावरील पोस्टच्या आधारावर कधीही आर्थिक निर्णय घेऊ नका.',
          ],
        },
      },
      {
        id: 6,
        badgeColor: '#7c3aed',
        post: {
          platform: 'Instagram',
          platformColor: '#c026d3',
          user: 'David_Captain_US_Army',
          verified: false,
          thumbnail: '❤️',
          title: 'महिन्यांच्या गप्पानंतर, हा "विदेशी सैन्य अधिकारी" भेटवस्तू पाठवण्यासाठी तुमच्याकडे ₹15,000 "कस्टम शुल्क" मागत आहे.',
          views: 'Profile has model photos — no real posts',
          type: 'dm',
          warning: 'खाते खऱ्या लोकांचे चोरलेले फोटो वापरते',
        },
        question: 'ज्याला तुम्ही कधीही भेटला नाही असा ऑनलाइन "मित्र" पैशांची मागणी करत आहे — तुम्ही काय कराल?',
        options: [
          {
            text: 'पैसे पाठवा — ते कित्येक महिन्यांपासून चांगले वागत आहेत',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. महिन्यांचा दयाळूपणा हेच रोमान्स स्कॅमर तुमचा पुरेसा विश्वास बांधण्यासाठी करतात. प्रोफाईल फोटो बहुधा एखाद्या खऱ्या व्यक्तीचे चोरलेले आहेत. कोणताही खरा भेटवस्तू पाठवणारा प्राप्तकर्त्याकडून कस्टम शुल्क मागत नाही.',
          },
          {
            text: 'फक्त अर्धे पैसे पाठवून तपासू',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. कोणतीही रक्कम पाठवल्याने फसवणूक करणाऱ्याला कळते की तुम्ही पैसे देण्यास तयार आहात. अर्धे पाठवल्यानंतर ते आणखी बहाने शोधतात. एकदा पैसे गेले की परत मिळणे फार कठीण असते.',
          },
          {
            text: 'हे रोमान्स स्कॅम आहे — खाते ब्लॉक आणि रिपोर्ट करा',
            correct: true,
            customFeedback: 'शाबास, तुम्ही हे ओळखले. हे एक क्लासिक रोमान्स स्कॅम आहे. फसवणूक करणारे पैसे मागण्यापूर्वी महिने भावनिक विश्वास निर्माण करतात. प्रोफाईलमध्ये खऱ्या पोस्ट नाहीत फक्त मॉडल फोटो आहेत. कोणतीही खरी भेटवस्तू कस्टम शुल्कासह येत नाही. त्वरित ब्लॉक आणि रिपोर्ट करा.',
          },
          {
            text: 'पाठवण्यापूर्वी त्यांचा फोन नंबर मागा',
            correct: false,
            customFeedback: 'या संदेशाकडे दुर्लक्ष करू नका. फसवणूक करणारे तुम्हाला सहज एक नंबर देतात. नंबर मिळणे या व्यक्तीला खरे किंवा विश्वासयोग्य बनवत नाही. कस्टम शुल्कासाठी पैशांची मागणी हे एक हमखास घोटाळे आहे. खाते ब्लॉक आणि रिपोर्ट करा.',
          },
        ],
        feedback: {
          icon: '🛡️',
          lines: [
            'रोमान्स स्कॅमर्स पैसे मागण्यापूर्वी महिने उलटुनही विश्वास निर्माण करतात.',
            'भेटवस्तू पाठवणारा कधीही तुमच्याकडे शुल्क मागणार नाही.',
            'त्यांचे फोटो रिव्हर्स इमेज सर्च करा — सहसा ते चोरलेले असतात.',
          ],
        },
      },
    ],
  }
};
