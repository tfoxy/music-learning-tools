import React from "react";
import StringNeck from "../StringNeck";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.root}>
      <StringNeck
        frets={24}
        scaleNotes={[0, 2, 4, 6, 7, 9, 11]}
        stringNotes={[40, 45, 50, 55, 59, 64]}
      />
    </div>
  );
}
