import { useState } from "react";
import PageBanner from "../../components/Breadcrumb/Breadcrumb";
import Banner from "../../components/Banner/Banner";
import ServiceList from "../../components/ServiceList/ServiceList";
import Pagination from "../../components/Common/Pagination";
import { PageLoader, PageError, Empty } from "../../components/Status";
import { useApi, asset } from "../../api";

const DUMMY_SERVICES = [
  {
    slug: "marble-flooring",
    title: "Marble Flooring & Dry-Lay",
    description: "Flawlessly calibrated natural marble slabs installed with tight hairline joints and bookmatched flow.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    slug: "wall-cladding",
    title: "Architectural Wall Cladding",
    description: "Book-matched feature walls and vertical stone facade installations for luxury residences and hotels.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    slug: "countertops-vanities",
    title: "Countertops & Vanities",
    description: "CNC waterjet fabricated natural quartzite, granite and marble vanity counters with mitered edges.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    slug: "staircases-inlays",
    title: "Custom Staircases & Medallions",
    description: "Grand stone staircases, treads, risers, brass & gold inlay detailing and precision waterjet medallions.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&h=800&q=85",
  },
];

export default function Services() {
  const { data, loading, error, reload } = useApi("/services");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const allServices = (data && data.length)
    ? data.map((s) => ({
        slug: s.slug,
        title: s.title,
        description: s.shortDescription || "",
        image: asset(s.image),
      }))
    : DUMMY_SERVICES;

  const startIndex = (page - 1) * pageSize;
  const paginatedServices = allServices.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <PageBanner title="Our Stone Services" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Services" }]} />
      {loading ? (
        <PageLoader />
      ) : error && (!data || !data.length) ? (
        <ServiceList services={DUMMY_SERVICES} />
      ) : allServices.length ? (
        <>
          <ServiceList services={paginatedServices} />
          <Pagination
            currentPage={page}
            totalItems={allServices.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      ) : (
        <Empty title="No services yet" text="Services added in the admin panel will appear here." />
      )}
      <Banner />
    </>
  );
}
