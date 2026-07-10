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
import type { Lead, LeadUpdate } from "@/lib/types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type Ctx = {
  lead: Lead;
  updateField: (patch: LeadUpdate) => void;
  saveStatus: SaveStatus;
  saveNow: () => void;
};

const LeadCtx = createContext<Ctx | null>(null);

export function useLead() {
  const ctx = useContext(LeadCtx);
  if (!ctx) throw new Error("useLead must be used within LeadAutosaveProvider");
  return ctx;
}

const DEBOUNCE_MS = 800;

export function LeadAutosaveProvider({
  initialLead,
  children,
}: {
  initialLead: Lead;
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [lead, setLead] = useState<Lead>(initialLead);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const pendingRef = useRef<LeadUpdate>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leadIdRef = useRef(initialLead.id);

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const patch = pendingRef.current;
    if (Object.keys(patch).length === 0) return;
    pendingRef.current = {};
    setSaveStatus("saving");
    const { error } = await supabase.from("leads").update(patch).eq("id", leadIdRef.current);

    if (error) {
      pendingRef.current = { ...patch, ...pendingRef.current };
      setSaveStatus("error");
    } else {
      setSaveStatus("saved");
    }
  }, [supabase]);

  const updateField = useCallback(
    (patch: LeadUpdate) => {
      setLead((prev) => ({ ...prev, ...patch }));
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
      flush();
    };
  }, [flush]);

  return <LeadCtx.Provider value={{ lead, updateField, saveStatus, saveNow }}>{children}</LeadCtx.Provider>;
}
