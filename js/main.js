import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

// NotesAPI.saveNote({
//   id: 123456,
//   title: "2回目のメモです",
//   body: "React勉強中",
// })

const app = document.getElementById("app")
const view = new NotesView(app, {
  onNoteSelect(id) {
    console.log(id + "のnoteが選択されました。")
  },
  onNoteAdd() {
    console.log("noteが追加されました")
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle)
    console.log(newBody)
  },
  onNoteDelete(id) {
    console.log(id + "のnoteが削除されました")
  }
});

console.log(NotesAPI.getAllNotes())
const notes = NotesAPI.getAllNotes()
view.updateNoteList(notes)
