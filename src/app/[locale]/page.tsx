import { useTranslations } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ValuePropsSection from "../components/ValuePropsSection";
import DestinationsSection from "../components/DestinationsSection";
import GuidesSection from "../components/GuidesSection";
import ShoreExcursionsSection from "../components/ShoreExcursionsSection";
import TrustMetricsSection from "../components/TrustMetricsSection";

export default function HomePage() {
  // const t = useTranslations("home");

  return (
    <main>
      <Header />
      <div className="pt-20">
        {/* <HeroSection
          title={t("title")}
          subtitle={t("subtitle")}
          searchLabel={t("search")}
        />   */}
        <ValuePropsSection />
        <DestinationsSection />
        <GuidesSection />
        <ShoreExcursionsSection />
        <TrustMetricsSection />
      </div>
      <Footer />
    </main>
  );
}
