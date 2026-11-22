export interface FAQItem {
  id: string;
  questionEn: string;
  questionMr: string;
  answerEn: string;
  answerMr: string;
}

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    questionEn: 'Where is your physical printing shop located in Akola?',
    questionMr: 'अकोल्यात तुमचे प्रिंटिंगचे दुकान कुठे आहे?',
    answerEn:
      'We are located at Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India. You can click "Get Directions" on our website for direct Google Maps navigation.',
    answerMr:
      'आमचे दुकान कुणाल कॉम्प्लेक्स, बॉईज झोन समोर, जवाहर नगर रोड, शास्त्री नगर, अकोला – ४४४००१ येथे आहे. आपण गुगल मॅप्स दिशानिर्देशांसाठी "Get Directions" बटणावर क्लिक करू शकता.',
  },
  {
    id: 'faq-2',
    questionEn: 'Can I pay online through payment apps or cards on this website?',
    questionMr: 'मी या वेबसाईटवर ऑनलाइन पेमेंट किंवा कार्डने पैसे भरू शकतो का?',
    answerEn:
      'No. In compliance with our transparent business policy, we do not accept or require online payments on this website. You submit your booking or quotation request online, and payment is arranged directly at our shop counter or upon delivery outside the website.',
    answerMr:
      'नाही. आमच्या पारदर्शक धोरणानुसार, या वेबसाईटवर कोणतेही ऑनलाइन पेमेंट घेतले जात नाही. आपण आपले बुकिंग किंवा कोटेशन सबमिट करू शकता आणि पेमेंट थेट दुकानात किंवा डिलिव्हरीच्या वेळी केले जाईल.',
  },
  {
    id: 'faq-3',
    questionEn: 'I don’t have a design. Can you design for my business or wedding?',
    questionMr: 'माझ्याकडे डिझाइन नाही. तुम्ही आमच्यासाठी डिझाइन बनवून द्याल का?',
    answerEn:
      'Yes, absolutely! We have in-house professional graphic designers. During booking, choose "I Need You to Create a Design" or submit a "Custom Design Request". We will share digital previews for your review and proceed to print only after your full approval.',
    answerMr:
      'होय, नक्कीच! आमच्याकडे कुशल ग्राफिक डिझायनर्स आहेत. बुकिंग करताना "मला नवीन डिझाइन बनवून हवे आहे" निवडा. आम्ही तुम्हाला प्रिव्ह्यू पाठवू आणि तुमच्या मंजुरीनंतरच प्रिंटिंग सुरू करू.',
  },
  {
    id: 'faq-4',
    questionEn: 'How much time does it take for flex printing and visiting cards?',
    questionMr: 'फ्लेक्स प्रिंटिंग आणि व्हिजिटिंग कार्ड्ससाठी किती वेळ लागतो?',
    answerEn:
      'Standard flex banners are printed within 3 to 6 hours once design is approved. Visiting cards and offset pamphlets take 24 to 48 hours depending on lamination and quantity.',
    answerMr:
      'डिझाइन मंजूर झाल्यानंतर साधे फ्लेक्स बॅनर ३ ते ६ तासांत तयार होतात. व्हिजिटिंग कार्ड्स आणि पॅम्पलेट्ससाठी लॅमिनेशननुसार २४ ते ४८ तास लागतात.',
  },
  {
    id: 'faq-5',
    questionEn: 'Do you provide delivery in Akola city?',
    questionMr: 'तुम्ही अकोला शहरात होम डिलिव्हरी देता का?',
    answerEn:
      'Yes! You can choose between "Shop Pickup" (free of charge from Kunal Complex) and "Home / Business Delivery" across Akola. Delivery details and charges are confirmed on your quotation before printing.',
    answerMr:
      'होय! आपण "दुकानातून घेऊन जाणे (Shop Pickup)" किंवा अकोल्यात "घरपोच डिलिव्हरी (Home Delivery)" निवडू शकता. डिलिव्हरी शुल्क कोटेशनमध्ये नमूद केले जाते.',
  },
  {
    id: 'faq-6',
    questionEn: 'How does the Quotation System work?',
    questionMr: 'कोटेशन प्रणाली कशी काम करते?',
    answerEn:
      'When you submit a service booking with your dimensions, material, and quantity, Guru Shree Graphics reviews your requirements and sends an itemized quotation to your portal. You can review the charges, approve or request changes. Work begins after confirmation.',
    answerMr:
      'जेव्हा आपण आपल्या आकाराच्या व प्रमाणाच्या गरजांसह बुकिंग करता, तेव्हा गुरु श्री ग्राफिक्सकडून आपल्याला सविस्तर कोटेशन पाठवले जाते. आपण ते मंजूर करू शकता किंवा बदल मागू शकता.',
  },
];
