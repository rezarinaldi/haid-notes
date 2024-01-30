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
  const [loading, setLoading] = useState(false);

  async function handleUpdateHaidNotes() {
    setLoading(true);

    const res = await fetch("https://v1.appbackend.io/v1/rows/TyLhTJDyYOIA", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: note._id, haid_1, suci, haid_2, keterangan }),
    });
    const data = await res.json();
    router.refresh();
    setLoading(false);
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
    router.refresh();
    toast.success("Catatan haid berhasil dihapus.");
  }

  return (
    <div className="card">
      {editMode ? (
        <>
          <h3 className="text-center text-white font-semibold text-2xl">
            📝 Update Haid Notes
          </h3>
          <Input
            label="Keluar Darah Pertama"
            value={haid_1}
            type="number"
            onChange={(e) => setHaidSatu(e.target.value)}
          />
          <Input
            label="Bersih"
            value={suci}
            type="number"
            onChange={(e) => setSuci(e.target.value)}
          />
          <Input
            label="Keluar Darah Kedua"
            value={haid_2}
            type="number"
            onChange={(e) => setHaidDua(e.target.value)}
          />
          <Textarea
            label="Keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <Button
              onPress={handleUpdateHaidNotes}
              color="primary"
              isLoading={loading}
            >
              🔄 Update
            </Button>
            <Button onPress={() => setEditMode(false)} color="default">
              🔙 Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-white text-lg font-semibold">
            Keluar Darah Pertama: {note.haid_1}
          </h3>
          <h3 className="text-white text-lg font-semibold">
            Bersih: {note.suci}
          </h3>
          <h3 className="text-white text-lg font-semibold">
            Keluar Darah Kedua: {note.haid_2}
          </h3>
          <p className="text-black text-xl font-semibold">
            Keterangan: {note.keterangan}
          </p>
          <div className="flex gap-3 justify-end">
            {/* Button Edit */}
            <Button onPress={() => setEditMode(true)} color="primary">
              🔄 Edit
            </Button>
            {/* Button Delete */}
            <Button onPress={onOpen} color="secondary">
              ❎ Delete
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
                      ❌ Delete Haid Notes
                    </ModalHeader>
                    <ModalBody>
                      <p>Are you sure you want to delete this note?</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        🔙 Cancel
                      </Button>
                      <Button color="secondary" onPress={handleDeleteHaidNotes}>
                        ❎ Delete
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};
