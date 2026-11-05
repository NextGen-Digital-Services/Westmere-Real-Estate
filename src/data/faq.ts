export interface FAQItem {
  id: string;
  category: "Buying" | "Selling" | "Legal & Tax" | "Expats";
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Buying",
    question: "What is the difference between Freehold (Eigen grond) and Leasehold (Erfpacht)?",
    answer: "In the Netherlands, Freehold (Eigen grond) means you own both the building and the underlying land permanently. In cities like Amsterdam and parts of The Hague, many properties are situated on municipal Leasehold (Erfpacht). The municipality retains ground ownership while granting long-term usage rights in exchange for an annual canon (ground rent) or perpetual pre-paid buyout (eeuwigdurend afgekocht).",
  },
  {
    id: "faq-2",
    category: "Legal & Tax",
    question: "What is the 3-day statutory cooling-off period (Bedenktijd)?",
    answer: "Under Dutch consumer law, a private buyer enjoys a mandatory statutory three-day cooling-off period after receiving a copy of the fully signed purchase agreement (koopovereenkomst). During these three days, the buyer may dissolve the agreement without stating reasons or paying penalty fees.",
  },
  {
    id: "faq-3",
    category: "Legal & Tax",
    question: "How is Transfer Tax (Overdrachtsbelasting) calculated?",
    answer: "For residential owner-occupiers purchasing their primary residence, the statutory rate is 2%. First-time buyers aged 18–35 purchasing homes below the national exemption threshold qualify for 0%. For secondary residences, buy-to-let investments, and commercial properties, the transfer tax is 10.4% paid at the civil-law notary.",
  },
  {
    id: "faq-4",
    category: "Buying",
    question: "What does Kosten Koper (k.k.) mean?",
    answer: "Kosten Koper translates to 'Purchaser's Costs' and indicates that statutory purchase-related expenses are borne by the buyer. These typically comprise transfer tax, civil notary deed fees, cadastral registration, and valuation report charges (typically totaling 4% to 6% on top of the purchase price for owner-occupiers).",
  },
  {
    id: "faq-5",
    category: "Expats",
    question: "Can foreign nationals obtain a 100% mortgage in the Netherlands?",
    answer: "Yes. Dutch lending institutions do not discriminate on nationality for EU or non-EU residents holding valid residence permits. You can borrow up to 100% of the certified market value of the property, provided your verifiable gross annual income supports the stress-tested monthly payments.",
  },
  {
    id: "faq-6",
    category: "Selling",
    question: "Why opt for private off-market sales (Stille Verkoop)?",
    answer: "Discreet off-market sales protect your personal privacy, security, and estate prestige. Your property is shared strictly with pre-qualified buyers and trusted family offices, avoiding public portals, open house foot-traffic, and internet price speculation.",
  },
];
