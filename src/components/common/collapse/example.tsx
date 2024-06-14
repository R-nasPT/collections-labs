import Collapse from "@/components/accordiontwo";

const list = [
  {
    question: "What's your name ?",
    answer: "My name is Lun Dev",
  },
  {
    question: "What do you do ?",
    answer: "I'm FullStack Deveoper",
  },
];

export default function Home() {
  return (
    <div className="bg-[#f2f2f2] h-screen flex justify-center items-center">
      <div className="list">
        {list.map((item, key) => (
          <Collapse key={key} title={item.question}>
            {item.answer}
          </Collapse>
        ))}
      </div>
    </div>
  );
}
