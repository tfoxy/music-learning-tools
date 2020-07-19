import React from "react";
import { useMidiActiveNotes } from "../midiHooks";
import { getStringNoteIndexes } from "../musicUtils";
import { FRET_WIDTH, FRET_HEIGHT } from "./constants";
import styles from "./StringLine.module.css";

interface Props {
  index: number;
  naturalNote: number;
  scaleNotes: number[];
  frets: number;
}

export default function StringLine({
  index,
  naturalNote,
  scaleNotes,
  frets,
}: Props) {
  const stringNoteIndexes = getStringNoteIndexes({
    naturalNote,
    scaleNotes,
    frets,
  });
  const midiActiveNotes = useMidiActiveNotes();
  const midiNoteIndexes = [...midiActiveNotes.values()]
    .map((note) => note - naturalNote)
    .filter((note) => note >= 0 && note < frets);

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
      {midiNoteIndexes.map((noteIndex) => (
        <div
          key={noteIndex}
          className={styles.noteDot}
          style={{
            left: -7,
            top: FRET_HEIGHT * (noteIndex - 0.75),
            backgroundColor: "red",
          }}
        />
      ))}
    </div>
  );
}
