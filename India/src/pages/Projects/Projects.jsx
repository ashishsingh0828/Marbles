import { useState } from "react";
import PageBanner from "../../components/Breadcrumb/Breadcrumb";
import Banner from "../../components/Banner/Banner";
import ProjectGallery from "../../components/Gallery/ProjectGallery";
import Pagination from "../../components/Common/Pagination";
import { PageLoader, PageError, Empty } from "../../components/Status";
import { useApi } from "../../api";

const DUMMY_PROJECTS = [
  {
    id: "p1",
    title: "Statuario Grand Villa Living & Entryway",
    slug: "statuario-grand-villa",
    imageA: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    imageB: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "p2",
    title: "Calacatta Gold Bookmatched Bath Suite",
    slug: "calacatta-gold-bath-suite",
    imageA: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85",
    imageB: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "p3",
    title: "Emperador Dark & Spanish Crema Foyer",
    slug: "emperador-dark-foyer",
    imageA: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    imageB: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "p4",
    title: "Nero Marquina Monolithic Waterfall Island",
    slug: "nero-marquina-waterfall",
    imageA: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    imageB: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Projects() {
  const { data, loading, error, reload } = useApi("/projects");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const list = data?.length ? data : DUMMY_PROJECTS;
  const startIndex = (page - 1) * pageSize;
  const paginatedProjects = list.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <PageBanner title="Our Stone Projects" breadcrumbs={[{ label: "Home", path: "/" }, { label: "Projects" }]} />
      {loading ? (
        <PageLoader />
      ) : error && !list?.length ? (
        <PageError error={error} onRetry={reload} />
      ) : (
        <>
          <ProjectGallery projects={paginatedProjects} />
          <Pagination
            currentPage={page}
            totalItems={list.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
      <Banner />
    </>
  );
}
