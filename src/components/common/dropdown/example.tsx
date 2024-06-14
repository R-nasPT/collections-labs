import Button from "@/components/button";
import Dropdown, { DropdownItem } from "@/components/dropdown";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="flex justify-end">
        <Dropdown trigger={<Button>Menu</Button>}>
          <DropdownItem>
            <Image
              src={
                "https://static-00.iconduck.com/assets.00/openai-icon-1011x1024-uztb7qme.png"
              }
              width={40}
              height={40}
              alt="logo"
            />
            <div className="py-2">
              <p className="font-medium">The GPT Genius</p>
              <a className="text-sm font-medium text-gray-500">
                test1234@gmail.com
              </a>
            </div>
          </DropdownItem>
          <DropdownItem>Cart</DropdownItem>
          <DropdownItem>Orders</DropdownItem>
          <DropdownItem>Preferences</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </Dropdown>
      </section>
    </main>
  );
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static-00.iconduck.com"],
  },
};

export default nextConfig;
