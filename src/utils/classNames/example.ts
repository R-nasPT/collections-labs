import { cn } from "cn.ts";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
 newClassNames: string;
 isPending: boolean;
 title: string;
 [key: string]: unknown;
}

export default function Button({ newClassNames, title, isPending, ...props }: Readonly<IButton>) {
 const oldClassNames = "h-10 w-14 bg-black text-red-500 border-2 border-white";
 return (
  <button
   className={cn(oldClassNames, newClassNames, {
    "border-8 border-green-600": isPending, 
   })}
    {...props}
  >
   {title}
  </button>
 );
}


<Button title="test" newClassNames="text-black w-40 bg-white" />
