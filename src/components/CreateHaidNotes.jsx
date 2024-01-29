"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { textAtom } from "./atoms/haidNotes";
import { useState } from "react";

export const CreateHaidNotes = () => {
  const router = useRouter();
  const [haid_1, setHaidSatu] = useState(0);
  const [suci, setSuci] = useState(0);
  const [haid_2, setHaidDua] = useState(0);
  const [keterangan, setKeterangan] = useAtom(textAtom);
  const [loading, setLoading] = useState(false);

  async function handleCreateHaidNotes() {
    setLoading(true);

    const res = await fetch("https://v1.appbackend.io/v1/rows/TyLhTJDyYOIA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ haid_1, suci, haid_2, keterangan }]),
    });
    const data = await res.json();

    router.refresh();
    setLoading(false);
    toast.success("Catatan haid berhasil ditambah.");
    setHaidSatu(0);
    setSuci(0);
    setHaidDua(0);
    setKeterangan("");
  }

  return (
    <main className="space-y-2">
      <h3>Create Haid Notes</h3>
      <Input
        placeholder="KD 1"
        value={haid_1}
        type="number"
        onChange={(e) => setHaidSatu(e.target.value)}
      />
      <Input
        placeholder="Bersih"
        value={suci}
        type="number"
        onChange={(e) => setSuci(e.target.value)}
      />
      <Input
        placeholder="KD 2"
        value={haid_2}
        type="number"
        onChange={(e) => setHaidDua(e.target.value)}
      />
      <Textarea
        placeholder="Keterangan"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <Button
        color="secondary"
        isLoading={loading}
        onPress={handleCreateHaidNotes}
      >
        Create
      </Button>
    </main>
  );
};
