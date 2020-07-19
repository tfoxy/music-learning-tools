import React from "react";
import { FRET_WIDTH, FRET_HEIGHT } from "./constants";
import StringLine from "./StringLine";
import styles from "./StringNeck.module.css";

interface Props {
  stringNotes: number[];
  frets: number;
  scaleNotes: number[];
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
          naturalNote={note}
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
