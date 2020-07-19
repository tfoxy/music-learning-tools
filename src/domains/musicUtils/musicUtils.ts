export function getStringNoteIndexes({
  naturalNote,
  scaleNotes,
  frets,
}: {
  naturalNote: number;
  scaleNotes: number[];
  frets: number;
}) {
  const stringNotes: number[] = [];
  let noteCount = 0;
  let currentScaleNote = naturalNote % 12;
  while (true) {
    const oldScaleNote = currentScaleNote;
    const nextScaleNote = scaleNotes.find((note) => note >= oldScaleNote) ?? -1;
    if (nextScaleNote < 0) {
      noteCount += 12 - oldScaleNote + scaleNotes[0];
      currentScaleNote = scaleNotes[0];
    } else {
      noteCount += nextScaleNote - oldScaleNote;
      currentScaleNote = nextScaleNote;
    }
    if (noteCount < frets) {
      stringNotes.push(noteCount);
      currentScaleNote += 1;
      noteCount += 1;
    } else {
      break;
    }
  }
  return stringNotes;
}
