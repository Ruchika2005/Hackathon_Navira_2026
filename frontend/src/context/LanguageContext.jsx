import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  english: {
    navira: "Navira",
    welcome: "Welcome to the Platform",
    simulations: "Simulations",
    quizzes: "Quizzes",
    logout: "Logout",
    selectLang: "Select Language",
    sim_desc: "Engage with state-of-the-art interactive 3D simulations.",
    quiz_desc: "Test your knowledge with challenging assessments.",
    back: "Back",
    
    // Simulations Page
    sim_hero_title: "Choose a Simulation",
    sim_hero_desc: "Learn digital skills by practicing in a safe environment.",
    mod1_title: "Secure Password Setup",
    mod1_desc: "Learn to create passwords that hackers can't guess.",
    mod2_title: "UPI Payment Simulation",
    mod2_desc: "Practice sending digital payments safely.",
    start: "Start Simulation",

    // Password Simulation
    pass_title: "Module 1: Secure Password Setup",
    enter_pass: "Create Password",
    confirm_pass: "Confirm Password",
    show: "Show",
    hide: "Hide",
    strength: "Strength",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    pass_match: "Passwords match",
    pass_mismatch: "Passwords do not match",
    submit: "Submit Password",
    rule_min: "At least 8 characters",
    rule_upper: "At least 1 uppercase letter",
    rule_digit: "At least 1 digit",
    rule_special: "At least 1 special character",
    suggest_min: "Please add more characters (need 8)",
    suggest_upper: "Add an UPPERCASE letter (like A, B, C)",
    suggest_digit: "Add a number (like 1, 2, 3)",
    suggest_special: "Add a symbol (like @, #, $)",
    success_pass: "Excellent! You've created a strong, secure password.",

    // UPI Simulation
    upi_title: "Module 2: UPI Payment Simulation",
    select_contact: "Select Contact",
    enter_amount: "Enter Amount",
    enter_pin: "Enter UPI PIN",
    receiver_warn: "Always check receiver name before paying.",
    pin_warn: "NEVER share your UPI PIN with anyone.",
    pay: "Pay Now",
    success_upi: "Payment Successful!",
    amount: "Amount",
    to: "To",
    phone_wallet: "My Wallet",
  },
  hindi: {
    navira: "Navira",
    welcome: "प्लेटफ़ॉर्म पर आपका स्वागत है",
    simulations: "Simulations",
    quizzes: "Quizzes",
    logout: "लॉग आउट",
    selectLang: "भाषा चुनें",
    sim_desc: "अत्याधुनिक इंटरैक्टिव 3D simulations के साथ जुड़ें।",
    quiz_desc: "चुनौतीपूर्ण assessments के साथ अपने ज्ञान का परीक्षण करें।",
    back: "पीछे",

    // Simulations Page
    sim_hero_title: "एक Simulation चुनें",
    sim_hero_desc: "सुरक्षित वातावरण में अभ्यास करके डिजिटल कौशल सीखें।",
    mod1_title: "Secure Password Setup",
    mod1_desc: "ऐसे पासवर्ड बनाना सीखें जिन्हें हैकर्स अनुमान न लगा सकें।",
    mod2_title: "UPI Payment Simulation",
    mod2_desc: "सुरक्षित रूप से डिजिटल भुगतान भेजने का अभ्यास करें।",
    start: "Simulation शुरू करें",

    // Password Simulation
    pass_title: "Module 1: Secure Password Setup",
    enter_pass: "पासवर्ड बनाएं",
    confirm_pass: "पासवर्ड की पुष्टि करें",
    show: "देखें",
    hide: "छिपाएं",
    strength: "शक्ति",
    weak: "कमजोर",
    medium: "मध्यम",
    strong: "मजबूत",
    pass_match: "पासवर्ड मेल खाते हैं",
    pass_mismatch: "पासवर्ड मेल नहीं खाते",
    submit: "पासवर्ड जमा करें",
    rule_min: "कम से कम 8 अक्षर",
    rule_upper: "कम से कम 1 बड़ा अक्षर (ABC)",
    rule_digit: "कम से कम 1 अंक (123)",
    rule_special: "कम से कम 1 विशेष वर्ण (@#$)",
    suggest_min: "कृपया और अक्षर जोड़ें (8 की आवश्यकता है)",
    suggest_upper: "एक बड़ा अक्षर (A, B, C) जोड़ें",
    suggest_digit: "एक अंक (1, 2, 3) जोड़ें",
    suggest_special: "एक विशेष वर्ण (@, #, $) जोड़ें",
    success_pass: "बहुत बढ़िया! आपने एक मजबूत और सुरक्षित पासवर्ड बनाया है।",

    // UPI Simulation
    upi_title: "Module 2: UPI Payment Simulation",
    select_contact: "संपर्क चुनें",
    enter_amount: "राशि दर्ज करें",
    enter_pin: "UPI PIN दर्ज करें",
    receiver_warn: "भुगतान करने से पहले हमेशा प्राप्तकर्ता का नाम जांचें।",
    pin_warn: "कभी भी अपना UPI PIN किसी के साथ साझा न करें।",
    pay: "अभी भुगतान करें",
    success_upi: "भुगतान सफल रहा!",
    amount: "राशि",
    to: "को",
    phone_wallet: "मेरा वॉलेट",
  },
  marathi: {
    navira: "Navira",
    welcome: "प्लॅटफॉर्मवर आपले स्वागत आहे",
    simulations: "Simulations",
    quizzes: "Quizzes",
    logout: "लॉग आउट",
    selectLang: "भाषा निवडा",
    sim_desc: "अत्याधुनिक संवादात्मक 3D simulations सह व्यस्त रहा.",
    quiz_desc: "आव्हानात्मक assessments द्वारे आपल्या ज्ञानाची चाचणी घ्या.",
    back: "मागे",

    // Simulations Page
    sim_hero_title: "एक Simulation निवडा",
    sim_hero_desc: "सुरक्षित वातावरणात सराव करून डिजिटल कौशल्ये शिका.",
    mod1_title: "Secure Password Setup",
    mod1_desc: "हॅकर्स ओळखू शकणार नाहीत असे पासवर्ड तयार करायला शिका.",
    mod2_title: "UPI Payment Simulation",
    mod2_desc: "सुरक्षितपणे डिजिटल पेमेंट पाठवण्याचा सराव करा.",
    start: "Simulation सुरू करा",

    // Password Simulation
    pass_title: "Module 1: Secure Password Setup",
    enter_pass: "पासवर्ड तयार करा",
    confirm_pass: "पासवर्डची पुष्टी करा",
    show: "दाखवा",
    hide: "लपवा",
    strength: "शक्ती",
    weak: "कमकुवत",
    medium: "मध्यम",
    strong: "मजबूत",
    pass_match: "पासवर्ड जुळतात",
    pass_mismatch: "पासवर्ड जुळत नाहीत",
    submit: "पासवर्ड सबमिट करा",
    rule_min: "किमान 8 अक्षरे",
    rule_upper: "किमान 1 मोठे अक्षर (ABC)",
    rule_digit: "किमान 1 अंक (123)",
    rule_special: "किमान 1 विशेष वर्ण (@#$)",
    suggest_min: "कृपया अधिक अक्षरे जोडा (8 आवश्यक आहेत)",
    suggest_upper: "मोठे अक्षर (A, B, C) जोडा",
    suggest_digit: "एक अंक (1, 2, 3) जोडा",
    suggest_special: "विशेष वर्ण (@, #, $) जोडा",
    success_pass: "उत्कृष्ट! तुम्ही एक मजबूत आणि सुरक्षित पासवर्ड तयार केला आहे.",

    // UPI Simulation
    upi_title: "Module 2: UPI Payment Simulation",
    select_contact: "संपर्क निवडा",
    enter_amount: "रक्कम टाका",
    enter_pin: "UPI PIN टाका",
    receiver_warn: "पेमेंट करण्यापूर्वी नेहमी प्राप्तकर्त्याचे नाव तपासा.",
    pin_warn: "तुमचा UPI PIN कधीही कोणाशीही शेअर करू नका.",
    pay: "आताच पेमेंट करा",
    success_upi: "पेमेंट यशस्वी झाले!",
    amount: "रक्कम",
    to: "ला",
    phone_wallet: "माझे वॉलेट",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('language') || 'english');

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang][key] || translations['english'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
