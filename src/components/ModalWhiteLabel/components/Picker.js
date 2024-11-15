import React, { useMemo, useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useOutsideAction } from "../../../utils/hooks/useOutsideAction";
import { transformColor } from "../../../utils/transformColor";

export const Picker = ({ options, onChange, values }) => {
  const [open, setOpen] = useState(false);
  const { title, position, key } = options;
  const color = useMemo(() => values[key], [key, values]);

  let wrapperRef = useRef();
  useOutsideAction([wrapperRef], () => setOpen(false));
  return (
    <div className={`wrapper-pickup-${position}`}>
      <span>{title}</span>
      <div
        className="view-color"
        onClick={() => setOpen(true)}
        style={{ background: `${color}` }}
      >
        <small style={{ color: transformColor(color) }}>{color}</small>
      </div>
      {open && (
        <div className={`wrapper-chromePicker-${position}`} ref={wrapperRef}>
          <ChromePicker color={color} onChange={(e) => onChange(e.hex, key)} />
        </div>
      )}
    </div>
  );
};
