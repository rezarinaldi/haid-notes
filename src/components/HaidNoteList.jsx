import { CreateHaidNotes } from "./CreateHaidNotes";
import { Footer } from "./Footer";
import { HaidNotes } from "./HaidNotes";
import { Header } from "./Header";

export const HaidNoteList = ({ data }) => {
  return (
    <div className="max-w-2xl m-auto relative h-screen border border-white bg-pink-200 shadow-xl overflow-y-scroll">
      <Header />
      <CreateHaidNotes />
      <section className=" mb-24 my-9 px-9  pb-32">
        {data.map((note) => {
          return <HaidNotes key={note._id} note={note} />;
        })}
      </section>
      <Footer />
    </div>
  );
};
