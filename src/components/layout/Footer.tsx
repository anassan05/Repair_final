import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    services: [
      { label: "Screen Repair", href: "#" },
      { label: "Battery Replacement", href: "#" },
      { label: "Keyboard Repair", href: "#" },
      { label: "SSD Upgrade", href: "#" },
      { label: "Motherboard Repair", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
    support: [
      { label: "FAQs", href: "#" },
      { label: "Warranty Policy", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-white/80 dark:bg-[#10151b]/80 backdrop-blur-lg text-gray-800 dark:text-gray-100 border-t border-gray-200/50 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-10">
        {/* Top section: Brand + Contact */}
        <div className="mb-8 sm:mb-10">
          <a href="#home" className="flex items-center mb-4">
            <span className="text-lg sm:text-xl font-display font-bold text-gray-900 dark:text-white">
              CareMyLap<span className="text-blue-500 dark:text-blue-400">.com</span>
            </span>
          </a>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4 max-w-md">
            Expert laptop & PC repair services at your doorstep. Transparent pricing,
            genuine parts, and warranty on all repairs.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-700 dark:text-gray-200">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              +91 12345 67890
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              support@caremylap.com
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              Pan India Service
            </span>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-gray-200 dark:border-gray-800 pt-8">
          {/* Services */}
          <div>
            <h4 className="text-sm sm:text-base font-display font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm sm:text-base font-display font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm sm:text-base font-display font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2026 CareMyLap.com. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
