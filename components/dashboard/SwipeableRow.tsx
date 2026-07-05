"use client";

import { useRef, useState } from "react";

const DELETE_WIDTH = 84;

export function SwipeableRow({
  children,
  onDelete,
  deleteLabel,
}: {
  children: React.ReactNode;
  onDelete: () => void;
  deleteLabel: string;
}) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const startDx = useRef(0);
  const moved = useRef(false);

  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
    startDx.current = dx;
    moved.current = false;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 4) moved.current = true;
    setDx(Math.min(0, Math.max(-DELETE_WIDTH, startDx.current + delta)));
  }

  function endDrag() {
    if (startX.current === null) return;
    startX.current = null;
    setDragging(false);
    setDx((current) => (current < -DELETE_WIDTH / 2 ? -DELETE_WIDTH : 0));
  }

  function onClickCapture(e: React.MouseEvent) {
    // Swallow the click that follows a drag, and swallow taps on an
    // already-open row so they close it instead of navigating.
    if (moved.current || dx !== 0) {
      e.preventDefault();
      e.stopPropagation();
      if (!moved.current) setDx(0);
      moved.current = false;
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => {
          setDx(0);
          onDelete();
        }}
        onFocus={() => setDx(-DELETE_WIDTH)}
        aria-label={deleteLabel}
        className="absolute inset-y-0 right-0 flex items-center justify-center bg-rose-600 text-white active:bg-rose-700"
        style={{ width: DELETE_WIDTH }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" />
        </svg>
      </button>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={{ transform: `translateX(${dx}px)`, transition: dragging ? "none" : "transform 200ms ease", touchAction: "pan-y" }}
        className="relative select-none bg-white"
      >
        {children}
      </div>
    </div>
  );
}
