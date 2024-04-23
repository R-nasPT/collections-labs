import { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  

export default function MutiApi() {
    // ---------- Mutiple Fetch Data ----------
  const [firstData, setFirstData] = useState<Todo[]>([]);
  const [secondData, setSecondData] = useState<Post[]>([]);
  const [thirdData, setThirdData] = useState<Comment[]>([]);

  useEffect(() => {
    const multipleFetchData = async () => {
      const [res1, res2, res3] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/todos"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();

      setFirstData(data1);
      setSecondData(data2);
      setThirdData(data3);
    };

    multipleFetchData();
  }, []);

  console.log("1 :", firstData);
  console.log("2 :", secondData);
  console.log("3 :", thirdData);

    // ---------- One Fetch Data ----------
  const [zeroData, setZeroData] = useState<User[]>([]);

  useEffect(() => {
    const oneFetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());
    //   const data = await res.json();
      setZeroData(res);
    };

    oneFetchData();
  }, []);

  console.log("0 :", zeroData);

  return (
    <>
      <div>{zeroData[0]?.email}</div>
      <div>{firstData[0]?.title}</div>
      <div>{secondData[0]?.body}</div>
      <div>{thirdData[0]?.name}</div>
    </>
  );
}
