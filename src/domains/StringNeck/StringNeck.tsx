import React from "react";
import styles from "./StringNeck.module.css";

const FRET_WIDTH = 20;
const FRET_HEIGHT = 30;

interface Props {
  stringNotes: number[];
  frets: number;
  scaleNotes: number[];
}

function getStringNoteIndexes({
  note,
  scaleNotes,
  frets,
}: {
  note: number;
  scaleNotes: number[];
  frets: number;
}) {
  const stringNotes: number[] = [];
  let noteCount = 0;
  let currentScaleNote = note % 12;
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

function StringLine({
  index,
  note,
  scaleNotes,
  frets,
}: {
  index: number;
  note: number;
  scaleNotes: number[];
  frets: number;
}) {
  const stringNoteIndexes = getStringNoteIndexes({ note, scaleNotes, frets });
  console.log(stringNoteIndexes);
  return (
    <div
      className={styles.stringLine}
      style={{ left: FRET_WIDTH * index, height: FRET_HEIGHT * (frets - 1) }}
    >
      {stringNoteIndexes.map((noteIndex) => (
        <div
          key={noteIndex}
          className={styles.noteDot}
          style={{
            left: -7,
            top: FRET_HEIGHT * (noteIndex - 0.75),
          }}
        />
      ))}
    </div>
  );
}

function RootFretLine({ strings }: { strings: number }) {
  return (
    <div
      className={styles.rootFretLine}
      style={{ width: FRET_WIDTH * (strings - 1) }}
    />
  );
}

function FretLine({ index, strings }: { index: number; strings: number }) {
  return (
    <div
      className={styles.fretLine}
      style={{
        top: FRET_HEIGHT * (index + 1),
        width: FRET_WIDTH * (strings - 1),
      }}
    />
  );
}

export default function StringNeck({ stringNotes, frets, scaleNotes }: Props) {
  return (
    <div className={styles.root}>
      {stringNotes.map((note, index) => (
        <StringLine
          key={index}
          index={index}
          note={note}
          scaleNotes={scaleNotes}
          frets={frets}
        />
      ))}
      <RootFretLine strings={stringNotes.length} />
      {[...new Array(frets - 1)].map((_, index) => (
        <FretLine key={index} index={index} strings={stringNotes.length} />
      ))}
    </div>
  );
}
