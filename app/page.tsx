"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

const START_DATE_UTC = "2015-10-22T00:00:00Z";
const ANIMATION_FRAMES = 30;
const ANIMATION_INTERVAL_MS = 50;

function daysSince(startIsoUtc: string): number {
  const start = new Date(startIsoUtc);
  const now = new Date();

  // Convert to UTC midnight for each day to ignore timezone and DST
  const startUTC = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate()
  );
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const diffMs = nowUTC - startUTC;
  return Math.max(0, Math.floor(diffMs / 86_400_000));
}

function msUntilNextUtcMidnight(): number {
  const now = new Date();
  const next = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0
    )
  );
  return next.getTime() - now.getTime();
}

const SplitFlapDisplay: React.FC = () => {
  const finalValue = useMemo(() => daysSince(START_DATE_UTC), []);
  const [displayValue, setDisplayValue] = useState<string>(
    finalValue.toString()
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [currentDays, setCurrentDays] = useState<number>(finalValue);

  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dailyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dailyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Dynamically determine digit count based on current value
  const digitCount = Math.max(4, currentDays.toString().length);

  // Initial split-flap-style animation with random digits
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      if (frame < ANIMATION_FRAMES) {
        const randomDigits = Array.from({ length: digitCount }, () =>
          Math.floor(Math.random() * 10)
        ).join("");
        setDisplayValue(randomDigits);
        frame++;
        animTimeoutRef.current = setTimeout(animate, ANIMATION_INTERVAL_MS);
      } else {
        setDisplayValue(currentDays.toString().padStart(digitCount, "0"));
        setIsAnimating(false);
      }
    };

    animate();

    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, [digitCount, currentDays]);

  // Schedule update exactly at midnight UTC
  useEffect(() => {
    const scheduleNextTick = () => {
      const ms = msUntilNextUtcMidnight();
      dailyTimeoutRef.current = setTimeout(() => {
        const updated = daysSince(START_DATE_UTC);
        setCurrentDays(updated);
        setDisplayValue(
          updated
            .toString()
            .padStart(Math.max(4, updated.toString().length), "0")
        );
        // After the first tick, use a stable daily interval
        dailyIntervalRef.current = setInterval(() => {
          const v = daysSince(START_DATE_UTC);
          setCurrentDays(v);
          setDisplayValue(
            v.toString().padStart(Math.max(4, v.toString().length), "0")
          );
        }, 86_400_000);
      }, ms);
    };

    scheduleNextTick();

    return () => {
      if (dailyTimeoutRef.current) clearTimeout(dailyTimeoutRef.current);
      if (dailyIntervalRef.current) clearInterval(dailyIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 flex flex-col items-center justify-center p-8">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-light text-slate-800 mb-12 text-center tracking-wide">
        Dias sem ter que inverter uma
        <br />
        <span className="font-semibold text-slate-900">árvore binária</span> no
        trabalho
      </h1>

      {/* Split-flap Display Container */}
      <div
        className="relative"
        aria-label={`Dias desde ${new Date(
          START_DATE_UTC
        ).toLocaleDateString()} em UTC`}
      >
        {/* Background shadow effect */}
        <div className="absolute inset-0 bg-black/5 blur-3xl" />

        {/* Main display container */}
        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-200">
          <div className="flex gap-3 md:gap-4">
            {displayValue
              .toString()
              .padStart(digitCount, "0")
              .split("")
              .map((digit, index) => (
                <div key={index} className="relative">
                  {/* Individual split-flap card - BLACK */}
                  <div className="w-16 h-24 md:w-24 md:h-36 bg-black rounded-lg shadow-lg overflow-hidden relative select-none">
                    {/* Top half of the card */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-800 to-black border-b border-gray-900" />

                    {/* Number display - WHITE */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-100 ${
                        isAnimating ? "animate-pulse" : ""
                      }`}
                    >
                      <span className="text-5xl md:text-7xl font-bold text-white font-mono tabular-nums">
                        {digit}
                      </span>
                    </div>

                    {/* Bottom half shadow effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />

                    {/* Horizontal divider line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-700 -translate-y-1/2" />

                    {/* Top highlight effect */}
                    <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg pointer-events-none" />
                  </div>

                  {/* Card reflection effect */}
                  <div className="absolute -bottom-2 left-0 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent blur-sm" />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer information */}
      <div className="mt-16 text-slate-600 text-sm text-center">
        <p className="font-mono">
          Contador iniciado em{" "}
          {new Date(START_DATE_UTC).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          })}{" "}
          (UTC)
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Atualiza diariamente às 00:00 UTC
        </p>
      </div>
    </div>
  );
};

export default SplitFlapDisplay;
