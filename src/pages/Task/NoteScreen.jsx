import Kanban from "../../components/Kanban/Kanban";
import NoteInfo from "./NoteInfo";
function NoteScreen() {
  return (
    <>
      <NoteInfo param={1} />
      <Kanban />
    </>
  );
}

export default NoteScreen;
