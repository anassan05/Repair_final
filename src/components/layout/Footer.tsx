import { Laptop, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
      { label: "How It Works", href: "#how-it-works" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
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
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Laptop className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-primary-foreground">
                Repair<span className="text-primary">Karo</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Expert laptop repair services at your doorstep. Transparent pricing, 
              genuine parts, and warranty on all repairs.
            </p>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <a href="mailto:support@repairkaro.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                support@repairkaro.com
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Delhi NCR, Mumbai, Bangalore, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2025 RepairKaro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
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
