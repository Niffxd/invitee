import {
  Carousel,
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
      <Carousel>
        <Header />
        <Schedule />
        <Details />
        <Form />
      </Carousel>
    </>
  );
};
