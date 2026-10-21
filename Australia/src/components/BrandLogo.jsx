const PRIMARY = "/images/logo/logo.png";

export default function BrandLogo({ className, alt = "KSD Homes" }) {
  return (
    <img
      src={PRIMARY}
      alt={alt}
      className={className}
    />
  );
}
