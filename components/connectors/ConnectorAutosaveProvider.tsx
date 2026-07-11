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
import type { Connector, ConnectorUpdate } from "@/lib/types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type Ctx = {
  connector: Connector;
  updateField: (patch: ConnectorUpdate) => void;
  saveStatus: SaveStatus;
  saveNow: () => void;
};

const ConnectorCtx = createContext<Ctx | null>(null);

export function useConnector() {
  const ctx = useContext(ConnectorCtx);
  if (!ctx) throw new Error("useConnector must be used within ConnectorAutosaveProvider");
  return ctx;
}

const DEBOUNCE_MS = 800;

export function ConnectorAutosaveProvider({
  initialConnector,
  children,
}: {
  initialConnector: Connector;
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const [connector, setConnector] = useState<Connector>(initialConnector);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const pendingRef = useRef<ConnectorUpdate>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const connectorIdRef = useRef(initialConnector.id);

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const patch = pendingRef.current;
    if (Object.keys(patch).length === 0) return;
    pendingRef.current = {};
    setSaveStatus("saving");
    const { error } = await supabase.from("connectors").update(patch).eq("id", connectorIdRef.current);

    if (error) {
      pendingRef.current = { ...patch, ...pendingRef.current };
      setSaveStatus("error");
    } else {
      setSaveStatus("saved");
    }
  }, [supabase]);

  const updateField = useCallback(
    (patch: ConnectorUpdate) => {
      setConnector((prev) => ({ ...prev, ...patch }));
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

  return <ConnectorCtx.Provider value={{ connector, updateField, saveStatus, saveNow }}>{children}</ConnectorCtx.Provider>;
}
