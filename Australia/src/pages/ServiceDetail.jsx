import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ServiceDetails from "../components/Services/ServiceDetails";
import { useApi, siteImage, paras, pairs, youtubeId } from "../api";
import { FALLBACK_SERVICES_MAP, DEFAULT_FALLBACK, SERVICE_SIDEBAR } from "../data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const serviceApi = useApi(slug ? `/services/${slug}` : null);
  const allServicesApi = useApi("/services");

  const service = useMemo(() => {
    const raw = serviceApi.data?.slug === slug ? serviceApi.data : null;
    const fallback = FALLBACK_SERVICES_MAP[slug] || DEFAULT_FALLBACK;

    if (!raw) {
      return {
        title: fallback.title,
        hero: fallback.heroImage,
        contactImage: fallback.image,
        sideImage: fallback.image,
        shortDescription: fallback.shortDescription,
        paragraphs: fallback.paragraphs,
        strategyHeading: fallback.strategyHeading,
        strategyText: fallback.strategyText,
        features: fallback.features,
        processHeading: fallback.processHeading,
        steps: fallback.steps,
        videoHeading: fallback.videoHeading,
        videoText: fallback.videoText,
        video: fallback.videoUrl ? { thumb: fallback.heroImage, youtubeId: youtubeId(fallback.videoUrl) } : null,
        faqHeading: fallback.faqHeading,
        faqs: fallback.faqs,
      };
    }

    const vid = youtubeId(raw.videoUrl);
    const parsedFeatures = (Array.isArray(raw.features) && typeof raw.features[0] === "object" && !Array.isArray(raw.features[0]))
      ? raw.features
      : (raw.features ? pairs(raw.features).map(([title, text]) => ({ title, text })) : fallback.features);

    const parsedSteps = (Array.isArray(raw.steps) && typeof raw.steps[0] === "object" && !Array.isArray(raw.steps[0]))
      ? raw.steps
      : (raw.steps ? pairs(raw.steps).map(([title, text]) => ({ title, text })) : fallback.steps);

    const parsedFaqs = (Array.isArray(raw.faqs) && typeof raw.faqs[0] === "object" && !Array.isArray(raw.faqs[0]))
      ? raw.faqs
      : (raw.faqs ? pairs(raw.faqs).map(([q, a]) => ({ q, a })) : fallback.faqs);

    return {
      title: raw.title || fallback.title,
      hero: siteImage(raw.heroImage, siteImage(raw.image, fallback.heroImage)),
      contactImage: siteImage(raw.image, fallback.image),
      sideImage: siteImage(raw.image, siteImage(raw.heroImage, fallback.image)),
      shortDescription: raw.shortDescription || fallback.shortDescription,
      paragraphs: raw.paragraphs ? paras(raw.paragraphs) : (raw.description ? [raw.description] : fallback.paragraphs),
      strategyHeading: raw.strategyHeading || fallback.strategyHeading,
      strategyText: raw.strategyText || fallback.strategyText,
      features: parsedFeatures && parsedFeatures.length > 0 ? parsedFeatures : fallback.features,
      processHeading: raw.processHeading || fallback.processHeading,
      steps: parsedSteps && parsedSteps.length > 0 ? parsedSteps : fallback.steps,
      videoHeading: raw.videoHeading || fallback.videoHeading,
      videoText: raw.videoText || fallback.videoText,
      video: vid ? { thumb: siteImage(raw.heroImage, fallback.heroImage), youtubeId: vid } : null,
      faqHeading: raw.faqHeading || fallback.faqHeading,
      faqs: parsedFaqs && parsedFaqs.length > 0 ? parsedFaqs : fallback.faqs,
    };
  }, [serviceApi.data, slug]);

  const sidebarLinks = useMemo(() => {
    const fromList = allServicesApi.data && allServicesApi.data.length > 0
      ? allServicesApi.data
      : null;
    const fromRelated = serviceApi.data?.related?.length
      ? [serviceApi.data, ...serviceApi.data.related].filter(
          (x, i, arr) => x?.slug && arr.findIndex((y) => y.slug === x.slug) === i
        )
      : null;
    const rows = fromList || fromRelated;
    if (rows?.length) {
      const ordered = [...rows].sort((a, b) => (a.slug === slug ? -1 : b.slug === slug ? 1 : 0));
      return ordered.slice(0, 4).map((item) => ({
        label: item.title,
        href: `/services/${item.slug || item.id}`,
      }));
    }
    return SERVICE_SIDEBAR.slice(0, 4);
  }, [allServicesApi.data, serviceApi.data, slug]);

  if (serviceApi.loading && (!serviceApi.data || serviceApi.data.slug !== slug)) {
    return (
      <div>
        <Breadcrumb title="Service" />
        <p style={{ padding: "2rem", textAlign: "center" }}>Loading service…</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb title={service.title} />
      <ServiceDetails service={service} links={sidebarLinks} />
    </div>
  );
}
