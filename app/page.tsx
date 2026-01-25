import {
  Carousel,
  GradientBackground,
  HeaderPage,
  SparklesBackground,
  DetailsPage,
  FormPage,
} from "@/components";

export default function Home() {
  return (
    <div className="relative " style={{ minHeight: "100dvh" }}>
      <SparklesBackground />
      <GradientBackground />
      <Carousel>
        <HeaderPage />
        <DetailsPage />
        <FormPage />
      </Carousel>
    </div>
  );
};
