"use client";

export function DateInput({
  value,
  onChange,
  onBlur,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
  onBlur?: () => void;
}) {
  return (
    <input
      type="date"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      onBlur={onBlur}
      className="tap-target w-full rounded-lg border border-gray-300 px-3 py-1.5 text-base focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
    />
  );
}
