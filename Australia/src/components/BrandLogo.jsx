const PRIMARY = "/images/logo/logo.png";
const FALLBACK = "/images/logo/logo.jpeg";

export default function BrandLogo({ className, alt = "KSD Homes" }) {
  return (
    <img
      src={PRIMARY}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.src.includes("logo.jpeg")) return;
        event.currentTarget.src = FALLBACK;
      }}
    />
  );
}
