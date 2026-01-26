import {
  Carousel,
  GradientBackground,
  SparklesBackground,
  Header,
  Schedule,
  Details,
  Form,
} from "@/components";
import { Toast } from "@heroui/react";

export default function Home() {
  return (
    <>
      <Toast.Container placement="bottom" />
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
