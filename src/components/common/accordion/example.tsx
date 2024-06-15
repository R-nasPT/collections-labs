import Accordion from "@/components/accordion";

export default function Home() {

  return (
    <main className="container mx-auto">
      <section className="flex justify-end">
        <div className="bg-gray-200 w-full px-5 py-3 flex flex-col gap-3">
          <Accordion
            title={<div className="bg-red-500">sdfdfsdfdsf</div>}
          >
            <div className="py-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              earum consequatur assumenda doloribus error nostrum aspernatur
              iste incidunt fuga quaerat. Itaque laudantium minima harum quasi
              mollitia, placeat eligendi velit dolorum?
            </div>
          </Accordion>
          <hr className="border border-black"/>
          <Accordion
            title={<div className="bg-red-500">sdfdfsdfdsf</div>}
          >
            <div className="py-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              earum consequatur assumenda doloribus error nostrum aspernatur
              iste incidunt fuga quaerat. Itaque laudantium minima harum quasi
              mollitia, placeat eligendi velit dolorum?
            </div>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
