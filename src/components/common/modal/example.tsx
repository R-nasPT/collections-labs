'use client'
import Modal from "@/components/modal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <main className="container mx-auto">
      <section className="flex justify-end">
        <Modal open={open} onClose={() => setOpen((prev) => !prev)}>
          <h1>Delete</h1>
        </Modal>
      </section>
    </main>
  );
}
