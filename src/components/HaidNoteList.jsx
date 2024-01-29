import { HaidNotes } from "./HaidNotes";

export const HaidNoteList = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((note) => {
        return <HaidNotes key={note._id} note={note} />;
      })}
    </div>
  );
};
