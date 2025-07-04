// app/contact/page.tsx

import { ContactForm } from "@/components/sections/contact/ContactForm";
import MapPage from "@/components/sections/contact/HeadOfficeMap";

export default function ContactPage() {
  return  <>
  <ContactForm />;
  <MapPage />
  </>
}

// Or if you want to use it as a section in another page:
// components/ContactSection.tsx
// export const ContactSection = () => {
//   return (
//     <section id="contact" className="py-20">
//       <ContactForm />
//       <MapPage />
//     </section>
//   );
// };