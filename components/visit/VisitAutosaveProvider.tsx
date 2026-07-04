"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { Visit, VisitUpdate } from "@/lib/types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type Ctx = {
  visit: Visit;
  updateField: (patch: VisitUpdate) => void;
  saveStatus: SaveStatus;
  saveNow: () => void;
};

const VisitCtx = createContext<Ctx | null>(null);

export function useVisit() {
  const ctx = useContext(VisitCtx);
  if (!ctx) throw new Error("useVisit must be used within VisitAutosaveProvider");
  return ctx;
}

const DEBOUNCE_MS = 800;

export function VisitAutosaveProvider({
  initialVisit,
  children,
}: {
  initialVisit: Visit;
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [visit, setVisit] = useState<Visit>(initialVisit);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const pendingRef = useRef<VisitUpdate>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visitIdRef = useRef(initialVisit.id);

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const patch = pendingRef.current;
    if (Object.keys(patch).length === 0) return;
    pendingRef.current = {};
    setSaveStatus("saving");
    const { error } = await supabase
      .from("visits")
      .update(patch)
      .eq("id", visitIdRef.current);

    if (error) {
      pendingRef.current = { ...patch, ...pendingRef.current };
      setSaveStatus("error");
    } else {
      setSaveStatus("saved");
    }
  }, [supabase]);

  const updateField = useCallback(
    (patch: VisitUpdate) => {
      setVisit((prev) => ({ ...prev, ...patch }));
      pendingRef.current = { ...pendingRef.current, ...patch };
      setSaveStatus("idle");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        flush();
      }, DEBOUNCE_MS);
    },
    [flush]
  );

  const saveNow = useCallback(() => {
    flush();
  }, [flush]);

  useEffect(() => {
    const handleFlush = () => {
      if (Object.keys(pendingRef.current).length > 0) flush();
    };
    window.addEventListener("beforeunload", handleFlush);
    window.addEventListener("online", handleFlush);
    document.addEventListener("visibilitychange", handleFlush);
    return () => {
      window.removeEventListener("beforeunload", handleFlush);
      window.removeEventListener("online", handleFlush);
      document.removeEventListener("visibilitychange", handleFlush);
      // Client-side navigation (e.g. clicking "返回列表") unmounts this
      // provider without firing beforeunload — flush any pending debounced
      // change instead of just cancelling the timer, or the last edit is lost.
      flush();
    };
  }, [flush]);

  return (
    <VisitCtx.Provider value={{ visit, updateField, saveStatus, saveNow }}>
      {children}
    </VisitCtx.Provider>
  );
}
