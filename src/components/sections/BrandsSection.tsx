const brands = [
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Acer",
  "Apple",
  "MSI",
  "Samsung",
];

const BrandsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-8">
          We repair all major laptop brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-2xl md:text-3xl font-display font-bold text-muted-foreground/50 hover:text-primary transition-colors cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
