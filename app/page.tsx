import {
  Carousel,
  Header,
  Schedule,
  Details,
  Form,
} from "@/components";

export default function Home() {
  return (
    <>
      <Carousel>
        <Header />
        <Schedule />
        <Details />
        <Form />
      </Carousel>
    </>
  );
};
