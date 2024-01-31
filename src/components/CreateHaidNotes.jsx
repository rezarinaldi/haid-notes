"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { textAtom } from "./atoms/haidNotes";
import { useEffect, useState } from "react";

export const CreateHaidNotes = () => {
  const router = useRouter();
  const [haid_1, setHaidSatu] = useState(0);
  const [suci, setSuci] = useState(0);
  const [haid_2, setHaidDua] = useState(0);
  const [keterangan, setKeterangan] = useAtom(textAtom);
  const [canCreate, setCanCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  // jika salah satu input masih kosong, tidak dapat menekan tombol create
  useEffect(() => {
    if (haid_1 && suci && haid_2 && keterangan) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [haid_1, suci, haid_2, keterangan]);

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
    <div className="card m-10">
      <h3 className="text-center text-white font-semibold text-2xl">
        🌸 Create Haid Notes
      </h3>
      <Input
        label="Keluar Darah Pertama"
        placeholder="0"
        value={haid_1}
        type="number"
        onChange={(e) => setHaidSatu(e.target.value)}
      />
      <Input
        label="Bersih"
        placeholder="0"
        value={suci}
        type="number"
        onChange={(e) => setSuci(e.target.value)}
      />
      <Input
        label="Keluar Darah Kedua"
        placeholder="0"
        value={haid_2}
        type="number"
        onChange={(e) => setHaidDua(e.target.value)}
      />
      <Textarea
        label="Keterangan"
        placeholder="Istihadoh 0 dan Haid 0 atau Istihadoh Semua"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <Button
        color="danger"
        isLoading={loading}
        disabled={!canCreate}
        onClick={handleCreateHaidNotes}
        className="w-full hover:disabled:cursor-not-allowed hover:disabled:bg-opacity-60"
      >
        ✅ Create
      </Button>
    </div>
  );
};
