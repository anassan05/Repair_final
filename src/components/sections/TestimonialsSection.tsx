import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Developer",
    avatar: "RS",
    rating: 5,
    content: "Amazing service! The technician arrived on time and fixed my laptop screen in just 30 minutes. Highly professional and transparent pricing.",
  },
  {
    name: "Priya Patel",
    role: "Student",
    avatar: "PP",
    rating: 5,
    content: "My laptop battery was dying. They replaced it at my doorstep with a genuine part. The 180-day warranty gives me peace of mind.",
  },
  {
    name: "Amit Kumar",
    role: "Business Owner",
    avatar: "AK",
    rating: 5,
    content: "We use their enterprise membership for our office. The dedicated technician and priority support has saved us so much time.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers have to say 
            about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
