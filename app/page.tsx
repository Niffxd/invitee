import {
  Carousel,
  Header,
  Schedule,
  Details,
  Form,
} from "@/components";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Home({ searchParams }: PageProps) {
  const { inviteeId } = searchParams;

  return (
    <>
      <Carousel>
        <Header inviteeId={inviteeId} />
        {inviteeId && <Schedule />}
        {inviteeId && <Details />}
        {inviteeId && <Form />}
      </Carousel>
    </>
  );
};
