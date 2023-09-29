export default class NotesAPI {
  // すべてのメモを取得する（staticをつけるとどこのファイルからも呼び出せるようになる）
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    return notes;
  }

  // メモの保存API
  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    // 既に存在しているメモか確認
    const existingNote = notes.find((note) => note.id == noteToSave.id)

    // 編集、更新
    if (existingNote) {
      existingNote.title = noteToSave.title
      existingNote.body = noteToSave.body
      existingNote.updated = new Date().toISOString()
    } else {
      // noteToSave.id = Math.floor(Math.random() * 1000000);
      // noteToSave.updated = new Date().toISOString();
      // notes.push(noteToSave)
      noteToSave.id = noteToSave.id
      noteToSave.updated = new Date().toISOString()
      notes.push(noteToSave)
    }
    localStorage.setItem("notes", JSON.stringify(notes))
  }

  // メモの削除
static deleteNote(id) {
  // メモの削除処理を実装する
  const notes = NotesAPI.getAllNotes();
  // 選択されたノートを削除
  const newNotes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(newNotes));
}
}
