import React, { useState, useEffect } from "react";
import { FaGraduationCap, FaHeartbeat, FaHandHoldingHeart, FaBuilding, FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaArrowLeft, FaHeart } from "react-icons/fa";
import "./App.css";

import building from "./assets/building.png";

// Load every image in src/assets/crousel_images (sorted numerically by file name)
const carouselContext = require.context("./assets/crousel_images", false, /\.(png|jpe?g|webp)$/i);
const CAROUSEL_IMAGES = carouselContext
  .keys()
  .sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, ""), 10) || 0;
    const nb = parseInt(b.replace(/\D/g, ""), 10) || 0;
    return na - nb || a.localeCompare(b);
  })
  .map((key) => carouselContext(key));

// ─── Config loader ────────────────────────────────────────────────────────────
function useConfig() {
  const [config, setConfig] = useState({ paymentUrl: "#" });
  useEffect(() => {
    fetch("/config.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setConfig)
      .catch(console.error);
  }, []);
  return config;
}

// ─── Translation content ──────────────────────────────────────────────────────
const CONTENT = {
  hi: {
    brand: {
      name: "मेघरिख फाउण्डेशन, जोधपुर",
      address: "कार्यालय : मेघवाल महिला छात्रावास, न्यायिक अकादमी के पास, झालामण्ड, जोधपुर (राज.)",
    },
    nav: {
      home: "मुख्य पृष्ठ",
      about: "हमारे बारे में",
      gallery: "झलकियाँ",
      activities: "गतिविधियां",
      committee: "कार्यकारिणी",
      contact: "संपर्क करें",
      donate: "योगदान करें",
    },
    hero: {
      welcome: "मेघरिख फाउंडेशन में आपका स्वागत है",
      title: "\"ज्ञान, समर्पण और सहयोग के माध्यम से ",
      highlight: "समाज",
      titleSuffix: " की सेवा एवं उत्थान करना।\"",
      subtitle: "संस्था का उद्देश्य समाज की सर्वतोमुखी उन्नति करना है। इस उद्देश्य की पूर्ति के लिये संस्था निरंतर कार्यरत है।",
      learnMore: "अधिक जानें",
      donate: "योगदान करें",
    },
    objectives: {
      title: "संस्था के उद्देश्य",
      desc: "इस उद्देश्य की पूर्ति के लिये संस्था निम्नलिखित कार्य करती है:",
      items: [
        { title: "आर्थिक सहायता:", desc: "समाज के आर्थिक रूप से कमजोर, जरूरतमंद और प्रतिभावान छात्र-छात्राओं को आर्थिक सहयोग, भोजन और कपड़े निःशुल्क उपलब्ध कराना ।" },
        { title: "महिला सशक्तिकरण:", desc: "महिलाओं के लिए निःशुल्क शिक्षा, कौशल विकास और लघु कुटीर उद्योगों के माध्यम से उन्हें आत्मनिर्भर बनाने का वातावरण तैयार करना ।" },
        { title: "शैक्षणिक विकास:", desc: "पुस्तकालय, वाचनालय, छात्रावास और शिक्षण-प्रशिक्षण संस्थानों की स्थापना व संचालन करना ताकि प्रगतिशील विचारों का प्रसार हो सके ।" },
        { title: "निःशुल्क चिकित्सा:", desc: "चिकित्सालय और औषधालय संचालित करना तथा गरीब, असहाय और दिव्यांग व्यक्तियों को निःशुल्क चिकित्सा सहायता प्रदान करना ।" },
        { title: "नशामुक्ति और जन-जागृति:", desc: "आम नागरिकों को नशा मुक्ति के प्रति जागरूक करना और सामाजिक कुरीतियों, अंधविश्वास एवं छुआछूत जैसी कुप्रथाओं को मिटाने का प्रयास करना ।" },
        { title: "कृषि और स्वरोजगार:", desc: "छोटे किसानों की मदद करना और युवाओं को आधुनिक खेती, सिंचाई तथा लघु उद्योगों से संबंधित नवीनतम जानकारी और प्रशिक्षण देना ।" },
        { title: "असहायों की सेवा:", desc: "विधवाओं, अनाथों, रोगियों और दुर्घटनाग्रस्त लोगों को मानसिक, सामाजिक और आर्थिक संबल प्रदान करना ।" },
        { title: "योग और पर्यावरण:", desc: "आमजन के स्वास्थ्य के लिए योग व ध्यान कक्षाओं का संचालन करना और वृक्षारोपण के माध्यम से पर्यावरण संरक्षण के कार्य करना ।" },
        { title: "संवैधानिक मूल्यों का प्रसार:", desc: "समाज में समानता, स्वतंत्रता, भाईचारा और लोकतांत्रिक मूल्यों का विस्तार करना तथा चरित्रवान नागरिक तैयार करना ।" },
        { title: "आपदा प्रबंधन:", desc: "अकाल, बाढ़, भूकंप और अग्निकांड जैसी प्राकृतिक आपदाओं के समय पीड़ितों की हर संभव सहायता करना ।" },
      ],
    },
    gallery: {
      title: "हमारी झलकियाँ",
    },
    activities: {
      title: "हमारी गतिविधियाँ",
      items: [
        { title: "शैक्षणिक सहायता", desc: "युवाओं के लिए छात्रवृत्तियाँ, कोचिंग, और करियर मार्गदर्शन।" },
        { title: "स्वास्थ्य और कल्याण", desc: "रक्तदान शिविरों, स्वास्थ्य जांच शिविरों और जागरूकता अभियानों का आयोजन।" },
        { title: "सांस्कृतिक कार्यक्रम", desc: "त्योहारों का उत्सव, कार्यक्रमों का आयोजन, और युवाओं की भागीदारी को प्रोत्साहित करना।" },
      ],
    },
    committee: {
      title: "कार्यकारिणी समिति",
      phoneLabel: "मो.",
      members: [
        { name: "धाराराम परिहार", role: "अध्यक्ष",    img: "/Dharam_ram.png", phone: "9413395331" },
        { name: "डॉ. आशा परमार",  role: "उपाध्यक्ष",  img: null,              phone: "9929475910" },
        { name: "किशोर गुणपाल",   role: "सचिव",       img: null,              phone: "9413250255" },
        { name: "जगदीश मेघवाल",   role: "कोषाध्यक्ष", img: null,              phone: "9829950399" },
      ],
    },
    footer: {
      about: "मेघरिख फाउंडेशन एक गैर-लाभकारी संस्था है जो समाज की भलाई, शिक्षा और स्वास्थ्य के क्षेत्र में निरंतर कार्यरत है।",
      donate: "योगदान करें",
      quickLinksTitle: "त्वरित लिंक",
      quickLinks: [
        { label: "मुख्य पृष्ठ", href: "#home" },
        { label: "हमारे बारे में", href: "#about" },
        { label: "गतिविधियां", href: "#activities" },
        { label: "कार्यकारिणी", href: "#committee" },
      ],
      policiesTitle: "नीतियाँ",
      legalLinks: [
        { label: "नियम एवं शर्तें (Terms)",         page: "terms"        },
        { label: "गोपनीयता नीति (Privacy)",         page: "privacy"      },
        { label: "निरस्त नीति (Cancellation)",      page: "cancellation" },
        { label: "सेवा प्रदायगी नीति (Delivery)",   page: "shipping"     },
        { label: "संपर्क करें (Contact)",           page: "contact"      },
      ],
      contactTitle: "संपर्क जानकारी",
      address: "मेघवाल महिला छात्रावास, ज्यूडिशियल अकादमी के पास, झालामण्ड, जोधपुर (राज.)",
      copyrightSuffix: "MEGHRIKH FOUNDATION. All rights reserved.",
      legalCopyright: "मेघरिख फाउंडेशन, जोधपुर। सर्वाधिकार सुरक्षित।",
    },
    legalBack: "मुख्य पृष्ठ",
  },
  en: {
    brand: {
      name: "MEGHRIKH FOUNDATION, JODHPUR",
      address: "Office: Meghwal Mahila Chhatravas, Near Judicial Academy, Jhalamand, Jodhpur (Raj.)",
    },
    nav: {
      home: "Home",
      about: "About Us",
      gallery: "Gallery",
      activities: "Activities",
      committee: "Committee",
      contact: "Contact Us",
      donate: "Donate",
    },
    hero: {
      welcome: "Welcome to MEGHRIKH FOUNDATION",
      title: "\"To serve and uplift ",
      highlight: "society",
      titleSuffix: " through knowledge, dedication and cooperation.\"",
      subtitle: "The organisation's aim is the all-round development of society. The organisation is continuously working towards this goal.",
      learnMore: "Learn More",
      donate: "Donate",
    },
    objectives: {
      title: "Objectives of the Organisation",
      desc: "To fulfill this objective, the organisation undertakes the following activities:",
      items: [
        { title: "Financial Support:", desc: "To provide financial assistance, free food and clothing to economically weaker, needy and talented students of the community." },
        { title: "Women's Empowerment:", desc: "To create an environment for making women self-reliant through free education, skill development and small cottage industries." },
        { title: "Educational Development:", desc: "To establish and operate libraries, reading rooms, hostels and teaching-training institutes to spread progressive ideas." },
        { title: "Free Medical Aid:", desc: "To operate hospitals and dispensaries and provide free medical assistance to the poor, helpless and differently-abled persons." },
        { title: "De-addiction & Awareness:", desc: "To make ordinary citizens aware of de-addiction and strive to eradicate social evils like superstitions and untouchability." },
        { title: "Agriculture & Self-Employment:", desc: "To help small farmers and provide youth with the latest information and training on modern farming, irrigation and small industries." },
        { title: "Service to the Helpless:", desc: "To provide mental, social and financial support to widows, orphans, patients and accident victims." },
        { title: "Yoga & Environment:", desc: "To conduct yoga and meditation classes for public health and carry out environmental conservation through tree plantation." },
        { title: "Promotion of Constitutional Values:", desc: "To spread equality, freedom, brotherhood and democratic values in society and nurture people of good character." },
        { title: "Disaster Management:", desc: "To provide all possible assistance to victims during natural disasters like drought, floods, earthquakes and fires." },
      ],
    },
    gallery: {
      title: "Our Gallery",
    },
    activities: {
      title: "Our Activities",
      items: [
        { title: "Educational Support", desc: "Scholarships, coaching, and career guidance for youth." },
        { title: "Health & Welfare", desc: "Organizing blood donation camps, health check-up camps and awareness campaigns." },
        { title: "Cultural Programs", desc: "Celebrating festivals, organizing events, and encouraging youth participation." },
      ],
    },
    committee: {
      title: "Executive Committee",
      phoneLabel: "Ph.",
      members: [
        { name: "Dhara Ram Parihar", role: "President",      img: "/Dharam_ram.png", phone: "9413395331" },
        { name: "Dr. Asha Parmar",   role: "Vice President",  img: null,              phone: "9929475910" },
        { name: "Kishor Gunpal",     role: "Secretary",       img: null,              phone: "9413250255" },
        { name: "Jagdish Meghwal",   role: "Treasurer",       img: null,              phone: "9829950399" },
      ],
    },
    footer: {
      about: "MEGHRIKH FOUNDATION is a non-profit organisation continuously working in the fields of social welfare, education and health.",
      donate: "Donate",
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Activities", href: "#activities" },
        { label: "Committee", href: "#committee" },
      ],
      policiesTitle: "Policies",
      legalLinks: [
        { label: "Terms & Conditions",        page: "terms"        },
        { label: "Privacy Policy",            page: "privacy"      },
        { label: "Cancellation Policy",       page: "cancellation" },
        { label: "Delivery Policy",           page: "shipping"     },
        { label: "Contact Us",                page: "contact"      },
      ],
      contactTitle: "Contact Information",
      address: "Meghwal Mahila Chhatravas, Near Judicial Academy, Jhalamand, Jodhpur (Raj.)",
      copyrightSuffix: "MEGHRIKH FOUNDATION. All rights reserved.",
      legalCopyright: "MEGHRIKH FOUNDATION, JODHPUR. All rights reserved.",
    },
    legalBack: "Home",
  },
};

// ─── Legal page content (lang-aware) ─────────────────────────────────────────
const NGO_EMAIL = "meghrikhfoundation@gmail.com";
const NGO_PHONE = "+91 94133 95331";

function getLegalPages(lang) {
  const NGO = lang === "en" ? "MEGHRIKH FOUNDATION" : "मेघरिख फाउंडेशन";
  const ADDRESS = lang === "en"
    ? "Meghwal Mahila Chhatravas, Near Judicial Academy, Jhalamand, Jodhpur (Raj.)"
    : "मेघवाल महिला छात्रावास, ज्यूडिशियल अकादमी के पास, झालामण्ड, जोधपुर (राज.)";
  const HOURS = lang === "en" ? "10:00 AM to 6:00 PM" : "प्रातः 10:00 बजे से सायं 6:00 बजे तक";

  if (lang === "en") {
    return {
      terms: {
        title: "Terms & Conditions",
        sections: [
          { heading: null, body: `By using this website, you agree to the following terms and conditions of ${NGO} ("Organisation"). Please read them carefully.` },
          { heading: "1. Purpose", body: `This platform facilitates making monthly contributions to ${NGO}. The collected amount is used for educational and social activities.` },
          { heading: "2. Eligibility", body: `This platform can only be used by persons aged 18 years or above. OTP verification via mobile number is mandatory. Contributions will be accepted only from a limited number of people. For more information, contact the President of ${NGO}.` },
          { heading: "3. Payment", body: "Monthly contribution is auto-renewed. Payments are securely processed through Razorpay. You can cancel your contribution at any time." },
          { heading: "4. 80G Tax Exemption", body: `Donations made to ${NGO} may be eligible for tax exemption under Section 80G of the Indian Income Tax Act. Consult your tax advisor for tax benefits.` },
          { heading: "5. Limitation of Liability", body: "The organisation will not be liable for any technical failure, internet disruption, or issues with third-party payment gateways." },
          { heading: "6. Amendments", body: "The organisation reserves the right to amend these terms without prior notice. Modified terms will be effective from the date of publication on the website." },
        ],
      },
      privacy: {
        title: "Privacy Policy",
        sections: [
          { heading: null, body: `${NGO} gives highest priority to your privacy. This policy explains how we collect, use and protect your information.` },
          { heading: "1. Data Collected", body: "We collect the following information: mobile number (for OTP verification), name, father's name, gotra, village, pin code, and payment-related information." },
          { heading: "2. Data Usage", body: "Your information is used for contribution management, issuing receipts, providing 80G tax exemption certificates and informing you about the organisation's activities." },
          { heading: "3. Third-party Sharing", body: "Your information is shared with Razorpay for payment processing, which is PCI-DSS compliant." },
          { heading: "4. Data Security", body: "Your data is secured by SSL encryption. We follow industry-standard security measures." },
          { heading: "5. Your Rights", body: "You may request to view, correct or delete your personal information. Contact us for this purpose." },
        ],
      },
      cancellation: {
        title: "Cancellation & Refund Policy",
        sections: [
          { heading: null, body: `The cancellation and refund policy of ${NGO} is as follows. Please read carefully before making a contribution.` },
          { heading: "1. Cancellation", body: "You can cancel your monthly contribution at any time through the app. No amount will be deducted from the next month after cancellation." },
          { heading: "2. Refund Policy", body: "Since this is a voluntary donation, refunds are generally not provided for payments already processed. In special circumstances, refund requests will be decided at the organisation's discretion." },
          { heading: "3. Technical Failure", body: "If the amount has been deducted from your account but the contribution is not activated, please contact us within 7 working days. After verification, a refund or activation of the contribution will be done." },
          { heading: "4. Refund Process", body: "Approved refunds will be returned within 7–10 working days to the original payment method. Charges levied by Razorpay may be deducted." },
          { heading: "5. Contact", body: 'For any refund or cancellation queries, contact us using the details on the "Contact Us" page.' },
        ],
      },
      shipping: {
        title: "Delivery & Exchange Policy",
        sections: [
          { heading: null, body: `${NGO} is a non-profit organisation that collects donations for educational and social activities. We do not sell any physical products.` },
          { heading: "1. Service Delivery", body: "The contribution amount you provide is spent directly on education and accommodation facilities for beneficiaries. This is a digital service — no physical goods are sent." },
          { heading: "2. Acknowledgement & Receipt", body: "After each successful payment, you will receive a digital confirmation. 80G tax exemption certificate will be made available after the end of the financial year." },
          { heading: "3. Exchange Policy", body: "Due to the nature of donations, exchange of any contribution is not possible. A donation once made cannot be taken back." },
          { heading: "4. Annual Report", body: `${NGO} provides donors with information each year about how their contributions were used.` },
        ],
      },
      contact: {
        title: "Contact Us",
        sections: [
          { heading: null, body: `For any questions, complaints, or support, you can contact ${NGO} through the following means.` },
          { heading: "📧 Email", body: NGO_EMAIL },
          { heading: "📞 Phone", body: NGO_PHONE },
          { heading: "📍 Address", body: ADDRESS },
          { heading: "Office Hours", body: HOURS },
          { heading: "Grievance Redressal", body: "We will contact you within 7 working days of receiving your complaint or request." },
        ],
      },
    };
  }

  return {
    terms: {
      title: "नियम एवं शर्तें (Terms & Conditions)",
      sections: [
        { heading: null, body: `इस वेबसाइट का उपयोग करके आप ${NGO} ("संस्था") की निम्नलिखित नियम एवं शर्तों (Terms & Conditions) से सहमत होते हैं। कृपया इन्हें ध्यानपूर्वक पढ़ें।` },
        { heading: "1. सेवा का उद्देश्य (Purpose)", body: `यह प्लेटफ़ॉर्म ${NGO} को मासिक योगदान देने की सुविधा प्रदान करता है। एकत्रित राशि का उपयोग शैक्षणिक (Educational) एवं सामाजिक कार्यों के लिए किया जाता है।` },
        { heading: "2. पात्रता (Eligibility)", body: `इस प्लेटफ़ॉर्म का उपयोग केवल 18 वर्ष या उससे अधिक आयु के व्यक्ति कर सकते हैं। मोबाइल नंबर के माध्यम से OTP सत्यापन (Verification) अनिवार्य है। योगदान केवल सीमित व्यक्तियों से ही स्वीकार किया जाएगा। अधिक जानकारी के लिए ${NGO} के अध्यक्ष से संपर्क करें।` },
        { heading: "3. योगदान एवं भुगतान (Payment)", body: "मासिक योगदान स्वतः नवीनीकृत (Auto-renewed) होता है। भुगतान Razorpay के माध्यम से सुरक्षित रूप से संसाधित (Processed) किया जाता है। आप किसी भी समय अपना योगदान निरस्त कर सकते हैं।" },
        { heading: "4. धारा 80G कर छूट (Tax Exemption)", body: `${NGO} द्वारा दिया गया दान भारतीय आयकर अधिनियम (Income Tax Act) की धारा 80G के अंतर्गत कर छूट के लिए पात्र हो सकता है। कर लाभ के लिए अपने कर सलाहकार (Tax Consultant) से परामर्श करें।` },
        { heading: "5. दायित्व सीमा (Limitation of Liability)", body: "संस्था किसी भी तकनीकी विफलता (Technical Failure), इंटरनेट व्यवधान (Interruption) या तृतीय-पक्ष (Third-party) भुगतान गेटवे की समस्याओं के लिए उत्तरदायी (Liable) नहीं होगी।" },
        { heading: "6. नियमों में परिवर्तन (Amendments)", body: "संस्था इन नियमों को बिना पूर्व सूचना के संशोधित (Amend) करने का अधिकार सुरक्षित रखती है। परिवर्तित नियम वेबसाइट पर प्रकाशन (Publication) की तिथि से प्रभावी होंगे।" },
      ],
    },
    privacy: {
      title: "गोपनीयता नीति (Privacy Policy)",
      sections: [
        { heading: null, body: `${NGO} आपकी गोपनीयता (Privacy) को सर्वोच्च प्राथमिकता देती है। यह नीति बताती है कि हम आपकी जानकारी कैसे एकत्र (Collect), उपयोग और सुरक्षित करते हैं।` },
        { heading: "1. एकत्र की जाने वाली जानकारी (Data Collected)", body: "हम निम्नलिखित जानकारी एकत्र करते हैं: मोबाइल नंबर (OTP सत्यापन हेतु), नाम, पिता का नाम, गोत्र, गांव, पिन कोड तथा भुगतान से संबंधित जानकारी।" },
        { heading: "2. जानकारी का उपयोग (Data Usage)", body: "आपकी जानकारी का उपयोग योगदान प्रबंधन (Management), रसीद जारी करने, कर-छूट प्रमाण पत्र (80G Certificate) प्रदान करने तथा संस्था की गतिविधियों की जानकारी देने के लिए किया जाता है।" },
        { heading: "3. तृतीय पक्ष साझाकरण (Third-party Sharing)", body: "भुगतान प्रसंस्करण (Processing) के लिए आपकी जानकारी Razorpay के साथ साझा की जाती है, जो PCI-DSS अनुपालित (Compliant) है।" },
        { heading: "4. डेटा सुरक्षा (Data Security)", body: "आपका डेटा SSL एन्क्रिप्शन (Encryption) द्वारा सुरक्षित है। हम उद्योग-मानक (Industry-standard) सुरक्षा उपायों का पालन करते हैं।" },
        { heading: "5. आपके अधिकार (Your Rights)", body: "आप अपनी व्यक्तिगत जानकारी देखने, सुधारने या हटाने का अनुरोध कर सकते हैं। इसके लिए हमसे संपर्क करें।" },
      ],
    },
    cancellation: {
      title: "निरस्त एवं धनवापसी नीति (Cancellation & Refund Policy)",
      sections: [
        { heading: null, body: `${NGO} की निरस्त (Cancellation) एवं धनवापसी (Refund) नीति निम्नानुसार है। कृपया योगदान देने से पूर्व इसे ध्यानपूर्वक पढ़ें।` },
        { heading: "1. योगदान निरस्त करना (Cancellation)", body: "आप किसी भी समय इस ऐप के माध्यम से अपना मासिक योगदान निरस्त कर सकते हैं। निरस्त होने के बाद अगले माह से कोई राशि नहीं काटी जाएगी।" },
        { heading: "2. धनवापसी नीति (Refund Policy)", body: "चूँकि यह एक स्वैच्छिक (Voluntary) दान है, इसलिए एक बार संसाधित (Processed) हो चुके भुगतान पर सामान्यतः धनवापसी (Refund) नहीं की जाती। किसी विशेष परिस्थिति में धनवापसी के अनुरोध पर संस्था विवेकाधिकार (Discretion) से निर्णय लेगी।" },
        { heading: "3. तकनीकी विफलता (Technical Failure) की स्थिति में", body: "यदि भुगतान आपके खाते से कट गया हो किन्तु योगदान सक्रिय न हुआ हो, तो कृपया 7 कार्य दिवसों के भीतर हमसे संपर्क करें। सत्यापन (Verification) के पश्चात् धनवापसी या योगदान सक्रिय किया जाएगा।" },
        { heading: "4. धनवापसी प्रक्रिया (Refund Process)", body: "स्वीकृत धनवापसी 7-10 कार्य दिवसों में मूल भुगतान विधि (Payment Method) पर वापस की जाएगी। Razorpay द्वारा लगाए गए शुल्क काटे जा सकते हैं।" },
        { heading: "5. संपर्क (Contact)", body: 'धनवापसी या निरस्त से संबंधित किसी भी जानकारी के लिए "संपर्क करें" पृष्ठ पर दिए गए विवरण पर हमसे संपर्क करें।' },
      ],
    },
    shipping: {
      title: "सेवा प्रदायगी एवं विनिमय नीति (Delivery & Exchange Policy)",
      sections: [
        { heading: null, body: `${NGO} एक गैर-लाभकारी (Non-profit) संस्था है जो शैक्षणिक (Educational) एवं सामाजिक कार्यों के लिए दान एकत्र करती है। हम कोई भौतिक (Physical) उत्पाद नहीं बेचते।` },
        { heading: "1. सेवा प्रदायगी (Service Delivery)", body: "आपके द्वारा दी गई योगदान राशि सीधे लाभार्थियों (Beneficiaries) की शिक्षा एवं आवास सुविधाओं पर व्यय की जाती है। यह एक डिजिटल सेवा है — कोई भौतिक (Physical) वस्तु नहीं भेजी जाती।" },
        { heading: "2. पावती एवं रसीद (Acknowledgement & Receipt)", body: "प्रत्येक सफल भुगतान के पश्चात् आपको एक डिजिटल पुष्टि (Confirmation) प्राप्त होगी। 80G कर-छूट प्रमाण पत्र वित्तीय वर्ष (Financial Year) की समाप्ति के पश्चात् उपलब्ध कराया जाएगा।" },
        { heading: "3. विनिमय नीति (Exchange Policy)", body: "दान की प्रकृति के कारण किसी भी योगदान का विनिमय (Exchange) संभव नहीं है। एक बार दिया गया दान वापस नहीं लिया जा सकता।" },
        { heading: "4. वार्षिक रिपोर्ट (Annual Report)", body: `संस्था प्रतिवर्ष अपने दानकर्ताओं (Donors) को यह जानकारी देती है कि उनका योगदान किस प्रकार उपयोग किया गया।` },
      ],
    },
    contact: {
      title: "संपर्क करें (Contact Us)",
      sections: [
        { heading: null, body: `किसी भी प्रश्न, शिकायत (Complaint) या सहायता (Support) के लिए आप ${NGO} से नीचे दिए गए माध्यमों से संपर्क कर सकते हैं।` },
        { heading: "📧 ईमेल (Email)", body: NGO_EMAIL },
        { heading: "📞 फ़ोन (Phone)", body: NGO_PHONE },
        { heading: "📍 पता (Address)", body: ADDRESS },
        { heading: "कार्यालय समय (Office Hours)", body: HOURS },
        { heading: "शिकायत निवारण (Grievance Redressal)", body: "आपकी शिकायत (Complaint) या अनुरोध (Request) प्राप्त होने के 7 कार्य दिवसों (Working Days) के भीतर हम आपसे संपर्क करेंगे।" },
      ],
    },
  };
}

// ─── Language Toggle ──────────────────────────────────────────────────────────
const LanguageToggle = ({ lang, setLang }) => {
  const toggle = () => {
    const next = lang === "hi" ? "en" : "hi";
    setLang(next);
    localStorage.setItem("lang", next);
  };
  return (
    <button
      onClick={toggle}
      style={{
        display: "flex", alignItems: "center", gap: "4px",
        padding: "6px 12px", borderRadius: "999px",
        border: "1px solid #cbd5e1", background: "transparent",
        cursor: "pointer", fontSize: "0.85rem", fontWeight: "700",
        whiteSpace: "nowrap",
      }}
      aria-label="Toggle language"
    >
      <span style={{ color: lang === "hi" ? "#1a3a5c" : "#94a3b8" }}>हिं</span>
      <span style={{ color: "#cbd5e1", margin: "0 1px" }}>|</span>
      <span style={{ color: lang === "en" ? "#1a3a5c" : "#94a3b8" }}>EN</span>
    </button>
  );
};

// ─── Brand Logo ───────────────────────────────────────────────────────────────
const BrandLogo = ({ t }) => (
  <a href="/" className="logo-link">
    <img src="/logo-meghrikh.png" alt="MEGHRIKH FOUNDATION Logo" className="logo" />
    <div className="logo-text-wrapper">
      <div style={{ display: "flex", flexDirection: "column", width: "max-content" }}>
        <div className="reg-info" style={{ alignSelf: "flex-end", textAlign: "right", fontSize: "9px", fontWeight: "600", color: "#333", lineHeight: "1.2", marginBottom: "0px" }}>
          <div>Reg. No. COOP/2025/JODHPUR/500440</div>
          <div>80G Reg. No. AAYAM5824HE20251</div>
        </div>
        <span className="logo-title">{t.brand.name}</span>
      </div>
      <span className="logo-address">{t.brand.address}</span>
    </div>
  </a>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ paymentUrl, setPage, t, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <BrandLogo t={t} />

        <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <a href="#home"       className="nav-item active-link" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
          <a href="#about"      className="nav-item" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
          <a href="#gallery"    className="nav-item" onClick={() => setMobileMenuOpen(false)}>{t.nav.gallery}</a>
          <a href="#activities" className="nav-item" onClick={() => setMobileMenuOpen(false)}>{t.nav.activities}</a>
          <a href="#committee"  className="nav-item" onClick={() => setMobileMenuOpen(false)}>{t.nav.committee}</a>
          <a href="#contact"    className="nav-item" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>
        </div>

        <div className="nav-actions">
          <LanguageToggle lang={lang} setLang={setLang} />
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: "0.9rem", padding: "8px 18px", whiteSpace: "nowrap" }}
          >
            <FaHeart style={{ marginRight: "6px", display: "inline" }} />
            {t.nav.donate}
          </a>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ paymentUrl, t }) => (
  <section id="home" className="hero">
    <div className="container hero-container">
      <div className="hero-content">
        <div className="welcome-pill">{t.hero.welcome}</div>
        <h1 className="hero-title">
          {t.hero.title}<span className="highlight">{t.hero.highlight}</span>{t.hero.titleSuffix}
        </h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-buttons">
          <a href="#about" className="btn btn-primary btn-large">{t.hero.learnMore}</a>
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-large"
          >
            <FaHeart style={{ marginRight: "8px", display: "inline" }} />
            {t.hero.donate}
          </a>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <div className="blob-bg"></div>
        <img src={building} alt="MEGHRIKH FOUNDATION Building" className="hero-image" />
      </div>
    </div>
  </section>
);

// ─── Objectives ───────────────────────────────────────────────────────────────
const Objectives = ({ t }) => (
  <section id="about" className="objectives py-section bg-light">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">{t.objectives.title}</h2>
        <div className="title-underline"></div>
        <p className="section-desc">{t.objectives.desc}</p>
      </div>
      <div className="objectives-content">
        <ul className="objectives-list">
          {t.objectives.items.map((obj, idx) => (
            <li key={idx} className="objective-item">
              <span className="objective-icon"><FaHandHoldingHeart /></span>
              <span className="objective-text">
                <strong>{obj.title}</strong> {obj.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

// ─── Activities ───────────────────────────────────────────────────────────────
const ACTIVITY_ICONS = [
  { icon: <FaGraduationCap />, color: "blue" },
  { icon: <FaHeartbeat />,     color: "red"  },
  { icon: <FaBuilding />,      color: "orange" },
];

const Activities = ({ t }) => (
  <section id="activities" className="activities py-section">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">{t.activities.title}</h2>
        <div className="title-underline"></div>
      </div>
      <div className="activity-cards">
        {t.activities.items.map((act, idx) => (
          <div className={`activity-card card-${ACTIVITY_ICONS[idx].color}`} key={idx}>
            <div className="card-icon">{ACTIVITY_ICONS[idx].icon}</div>
            <h3 className="card-title">{act.title}</h3>
            <p className="card-desc">{act.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Image Carousel ───────────────────────────────────────────────────────────
const ImageCarousel = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = CAROUSEL_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="gallery" className="carousel-section py-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{t.gallery.title}</h2>
          <div className="title-underline"></div>
        </div>
        <div className="carousel-container">
          <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((img, idx) => (
              <div className="carousel-slide" key={idx}>
                <img src={img} alt={`Slide ${idx + 1}`} />
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {images.map((_, idx) => (
              <button key={idx} className={`indicator ${idx === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(idx)} aria-label={`Go to slide ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Committee ────────────────────────────────────────────────────────────────
const placeholderImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

const Committee = ({ t }) => (
  <section id="committee" className="committee py-section bg-light">
    <div className="container">
      <div className="section-header text-center">
        <h2 className="section-title">{t.committee.title}</h2>
        <div className="title-underline"></div>
      </div>
      <div className="committee-grid">
        {t.committee.members.map((member, idx) => (
          <div className="member-card" key={idx}>
            <div className="member-photo">
              <img src={member.img || placeholderImg} alt={member.name} />
            </div>
            <h4 className="member-name">{member.name}</h4>
            <div style={{ marginBottom: "10px" }}><span className="member-role">{member.role}</span></div>
            {member.phone && (
              <p style={{ margin: "5px 0 0", color: "#666", fontSize: "0.95rem", fontWeight: "600" }}>
                {t.committee.phoneLabel} {member.phone}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage, paymentUrl, t }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <div className="footer-logo-link" style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "1.5rem", textDecoration: "none" }}>
            <div style={{ background: "white", padding: "10px", display: "flex", borderRadius: "8px", alignItems: "center" }}>
              <img src="/logo-meghrikh.png" alt="Logo" className="footer-logo" style={{ marginBottom: 0 }} />
            </div>
            <div className="footer-logo-text" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div className="footer-reg-info" style={{ alignSelf: "flex-start", textAlign: "left", fontSize: "11px", color: "#cbd5e1", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.02em", marginBottom: "4px" }}>
                <div>Reg. No. COOP/2025/JODHPUR/500440</div>
                <div>80G Reg. No. AAYAM5824HE20251</div>
              </div>
              <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "800", lineHeight: "1.1" }}>{t.brand.name}</span>
              <span style={{ color: "#cbd5e1", fontSize: "0.8rem", fontWeight: "500", marginTop: "3px" }}>{t.brand.address}</span>
            </div>
          </div>
          <p className="footer-about">{t.footer.about}</p>
          <div style={{ marginTop: "1rem" }}>
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "0.9rem" }}>
              <FaHeart style={{ marginRight: "6px", display: "inline" }} />
              {t.footer.donate}
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>{t.footer.quickLinksTitle}</h3>
          <ul>
            {t.footer.quickLinks.map(({ label, href }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t.footer.policiesTitle}</h3>
          <ul>
            {t.footer.legalLinks.map(({ label, page }) => (
              <li key={page}>
                <button
                  onClick={() => { setPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ background: "none", border: "none", color: "#cbd5e1", cursor: "pointer", padding: 0, fontSize: "inherit", textAlign: "left" }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h3>{t.footer.contactTitle}</h3>
          <ul>
            <li><FaMapMarkerAlt className="contact-icon" /> {t.footer.address}</li>
            <li><FaPhoneAlt className="contact-icon" /> 9413395331</li>
            <li><FaEnvelope className="contact-icon" /> {NGO_EMAIL}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container flex-between">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyrightSuffix}</p>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

// ─── Legal Page Layout ────────────────────────────────────────────────────────
const LegalPage = ({ title, sections, onBack, t, lang }) => (
  <div className="app-wrapper" data-lang={lang}>
    <nav className="navbar scrolled">
      <div className="nav-container" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#1a3a5c", fontWeight: "600", fontSize: "1rem", whiteSpace: "nowrap", justifySelf: "start" }}
        >
          <FaArrowLeft /> {t.legalBack}
        </button>
        <div style={{ justifySelf: "center" }}>
          <BrandLogo t={t} />
        </div>
        <div />
      </div>
    </nav>

    <main style={{ paddingTop: "160px", minHeight: "70vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="section-header" style={{ marginBottom: "2rem" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>{title}</h2>
          <div className="title-underline" style={{ margin: "0.5rem 0 0" }}></div>
        </div>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: "1.75rem" }}>
            {section.heading && (
              <h3 style={{ color: "#1a3a5c", fontWeight: "700", marginBottom: "0.5rem", fontSize: "1.05rem" }}>
                {section.heading}
              </h3>
            )}
            <p style={{ color: "#444", lineHeight: "1.8", fontSize: "0.97rem", whiteSpace: "pre-line" }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </main>

    <div style={{ borderTop: "1px solid #e2e8f0", padding: "1.5rem 0", textAlign: "center", background: "#f8fafc" }}>
      <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>
        &copy; {new Date().getFullYear()} {t.footer.legalCopyright}
      </p>
    </div>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const config = useConfig();
  const t = CONTENT[lang];

  if (page !== "home") {
    const legalPages = getLegalPages(lang);
    const pageData = legalPages[page];
    if (pageData) {
      return (
        <LegalPage
          title={pageData.title}
          sections={pageData.sections}
          onBack={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          t={t}
          lang={lang}
        />
      );
    }
  }

  return (
    <div className="app-wrapper" data-lang={lang}>
      <Navbar paymentUrl={config.paymentUrl} setPage={setPage} t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero paymentUrl={config.paymentUrl} t={t} />
        <Objectives t={t} />
        <ImageCarousel t={t} />
        <Activities t={t} />
        <Committee t={t} />
      </main>
      <Footer setPage={setPage} paymentUrl={config.paymentUrl} t={t} />
    </div>
  );
}

export default App;
