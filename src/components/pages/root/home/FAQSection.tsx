"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface FAQSectionProps {
  limitToThree?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ limitToThree = false }) => {
  const faqs = [
    {
      question: "What is the KNUST Nomination System?",
      answer:
        "The KNUST Nomination System is a platform for students to request nomination forms for various leadership positions within the university.",
    },
    {
      question: "How do I start the nomination process?",
      answer:
        "To start, you need to request a nomination form for the specific nomination set you're interested in, such as SRC or departmental positions.",
    },
    {
      question: "What nomination sets are available?",
      answer:
        "Common nomination sets include SRC positions, Hall Representative positions, and Departmental Representative positions. Check the system for current available sets.",
    },
    {
      question: "How do I request a nomination form?",
      answer:
        "Navigate to the 'Open Nominations' section, select the nomination set you're interested in, and click on 'Request Form' to submit your request.",
    },
    {
      question: "What happens after I request a form?",
      answer:
        "After requesting a form, you'll receive it via email or through the system. You can then review the available positions and requirements.",
    },
    {
      question: "Can I request multiple nomination forms?",
      answer:
        "Yes, you can request forms for different nomination sets, but be aware of any restrictions on applying for multiple positions.",
    },
    {
      question: "What information do I need to provide when requesting a form?",
      answer:
        "Typically, you'll need to provide your name, student ID, email address, and possibly your reason for interest in the nomination set.",
    },
    {
      question: "Is there a deadline for requesting nomination forms?",
      answer:
        "Yes, each nomination set has its own deadline for form requests. Check the system or official announcements for specific dates.",
    },
    {
      question: "Can I withdraw my form request?",
      answer:
        "Yes, you can usually withdraw your request before the form is processed. Contact the election committee for assistance.",
    },
    {
      question: "What should I do if I don't receive my requested form?",
      answer:
        "If you don't receive your form within the specified timeframe, contact the IT support team or the election committee for assistance.",
    },
    {
      question: "Are there eligibility requirements for requesting forms?",
      answer:
        "Yes, there may be general eligibility requirements such as minimum GPA or year of study. These will be listed in the form request section.",
    },
    {
      question: "How do I choose positions after receiving the form?",
      answer:
        "The nomination form will list available positions within the set. You can select the position(s) you wish to apply for when filling out the form.",
    },
    {
      question: "Can I change my selected position after submitting the form?",
      answer:
        "Generally, you cannot change your selection after submission. Contact the election committee if you need to make critical changes.",
    },
    {
      question: "How are candidates selected after form submission?",
      answer:
        "Candidates are selected based on eligibility criteria and the information provided in their nomination forms. The election committee reviews all submissions.",
    },
    {
      question:
        "Where can I find more information about the nomination process?",
      answer:
        "You can find more information on the KNUST Nomination System website, or contact the election committee for specific queries.",
    },
  ];

  const displayFaqs = limitToThree
    ? faqs.sort(() => 0.5 - Math.random()).slice(0, 3)
    : faqs;

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion>
          {displayFaqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
