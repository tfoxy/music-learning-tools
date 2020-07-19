import { useEffect, useState } from "react";

const NOTE_ON = 144;
const NOTE_OFF = 128;

export function useMidiInputs() {
  const [inputs, setInput] = useState<WebMidi.MIDIInput[]>([]);

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        setInput(Array.from(midiAccess.inputs.values()));
        midiAccess.onstatechange = () => {
          setInput(Array.from(midiAccess.inputs.values()));
        };
      });
    }
  }, []);

  return inputs;
}

export function useMidiActiveNotes() {
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const inputs = useMidiInputs();
  useEffect(() => {
    inputs.forEach((input) => {
      const { onmidimessage } = input;
      input.onmidimessage = (event) => {
        if (onmidimessage) onmidimessage(event);
        const [command, note, velocity = 0] = event.data;
        if (command === NOTE_ON && velocity > 0) {
          setActiveNotes((value) => {
            if (value.has(note)) {
              return value;
            }
            const set = new Set(value);
            set.add(note);
            return set;
          });
        } else if (
          command === NOTE_OFF ||
          (command === NOTE_ON && velocity === 0)
        ) {
          setActiveNotes((value) => {
            if (!value.has(note)) {
              return value;
            }
            const set = new Set(value);
            set.delete(note);
            return set;
          });
        }
      };
    });
  }, [inputs]);
  return activeNotes;
}
