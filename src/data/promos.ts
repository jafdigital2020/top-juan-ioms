interface Promo {
  title: string;
  dateRange: string;
 image: string;
}

const promos: Promo[] = [
  {
    title: "Grand Opening Discount",
    dateRange: "Nov 1, 2024 - Nov 30, 2024",
   image: "/images/party.png"
  },
  {
    title: "Holiday Special",
    dateRange: "Dec 1, 2024 - Dec 31, 2024",
   image: "/images/special-offer.png"
  },
  {
    title: "New Year Celebration",
    dateRange: "Jan 1, 2025 - Jan 15, 2025",
   image: "/images/cofee-cup.png"
  },
  {
    title: "Valentine's Day Offer",
    dateRange: "Feb 1, 2025 - Feb 14, 2025",
   image: "/images/offer.png"
  }
];

export default promos;
