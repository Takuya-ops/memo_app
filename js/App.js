import NotesAPI from "./NotesAPI.js"
import NotesView from "./NotesView.js"

export default class App {
  // 初期化（最初に呼ばれる）
  constructor(root) {
    this.notes = []
    this.activeNote = null
    this.view = new NotesView(root, this._handlers())
    
    this._refreshNotes()
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes()
    console.log(notes)
    this._setNotes(notes)

    // 配列の中身があるかチェック
    if (notes.length > 0) {
      this._setActiveNote(notes[0])
    }
  }

  _setActiveNote(note) {
    this.activeNote = note
    this.view.updateActiveNote(note)
  }

  _setNotes(notes) {
    // すべてのメモがここに入る
    this.notes = notes
    this.view.updateNoteList(notes)
  }

  _handlers() {
    return {
      onNoteSelect: (noteId) => {
        console.log(noteId + "のノートが選択されています。")
        // 選択されたメモがハイライトされるようにする
        const selectedNote = this.notes.find((note) => note.id == noteId)
        this._setActiveNote(selectedNote)
      },
      onNoteAdd: () => {
        console.log("noteが追加されました。")
        const newNote = {
          title: "新しいノート",
          body: "ここに本文を追加"
        }
        NotesAPI.saveNote(newNote)
        this._refreshNotes()
      },
      onNoteEdit: (title, body) => {
        // console.log(title)
        // console.log(body)
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: title,
          body: body
        })
        // 保存した後にリロードする
        this._refreshNotes()
      },
      onNoteDelete: (noteId) => {
        console.log(noteId + "のノートが選択されました。")
        NotesAPI.deleteNote(noteId)
        this._refreshNotes()
      }
    }
  }
}