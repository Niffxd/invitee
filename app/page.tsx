import {
  Carousel,
  GradientBackground,
  SparklesBackground,
  Header,
  Schedule,
  Details,
  Form,
} from "@/components";

export default function Home() {
  return (
    <>
      <SparklesBackground />
      <GradientBackground />
      <Carousel>
        <Header />
        <Schedule />
        <Details />
        <Form />
      </Carousel>
    </>
  );
};
