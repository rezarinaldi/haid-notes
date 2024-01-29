"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

export const HaidNotes = ({ note }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();

  const [haid_1, setHaidSatu] = useState(note.haid_1);
  const [suci, setSuci] = useState(note.suci);
  const [haid_2, setHaidDua] = useState(note.haid_2);
  const [keterangan, setKeterangan] = useState(note.keterangan);

  async function handleUpdateHaidNotes() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/TyLhTJDyYOIA", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: note._id, haid_1, suci, haid_2, keterangan }),
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
    setEditMode(false);
    toast.success("Catatan haid berhasil diubah.");
  }

  async function handleDeleteHaidNotes() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/TyLhTJDyYOIA", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([note._id]),
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
    toast.success("Catatan haid berhasil dihapus.");
  }

  if (editMode) {
    return (
      <main className="space-y-2">
        <h3>Update Haid Notes</h3>
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
          onPress={handleUpdateHaidNotes}
          color="warning"
          className="mr-2"
        >
          Update
        </Button>
        <Button onPress={() => setEditMode(false)} color="default">
          Cancel
        </Button>
      </main>
    );
  }

  return (
    <div>
      <h3>Keluar Darah Pertama: {note.haid_1}</h3>
      <h3>Bersih: {note.suci}</h3>
      <h3>Keluar Darah Kedua: {note.haid_2}</h3>
      <p className="font-semibold">Keterangan: {note.keterangan}</p>
      <div className="flex gap-2">
        {/* Button Delete */}
        <Button onPress={onOpen} color="danger">
          Delete
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Haid Notes
                </ModalHeader>
                <ModalBody>
                  <p>Yakin ingin menghapus catatan ini?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" onPress={handleDeleteHaidNotes}>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* Button Edit */}
        <Button onPress={() => setEditMode(true)} color="warning">
          Edit
        </Button>
      </div>
    </div>
  );
};
