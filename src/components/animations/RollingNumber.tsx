const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

interface RollingDigitProps {
  digit: string;
  duration: number;
}

function RollingDigit({ digit, duration }: RollingDigitProps) {
  const numericValue = parseInt(digit, 10);

  return (
    <span className="inline-block h-[1em] overflow-hidden" style={{ lineHeight: 1 }}>
      <span
        className="flex flex-col"
        style={{
          transform: `translateY(-${numericValue * 10}%)`,
          transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="h-[1em] flex items-center justify-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

interface RollingNumberProps {
  value: number;
  duration?: number;
  format?: (value: number) => string;
  className?: string;
}

export default function RollingNumber({
  value,
  duration = 2000,
  format = (v: number) => Math.round(v).toLocaleString(),
  className,
}: RollingNumberProps) {
  const formatted = format(value);

  return (
    <span className={`inline-flex tabular-nums ${className ?? ""}`}>
      {formatted.split("").map((char, i) =>
        /\d/.test(char) ? (
          <RollingDigit key={i} digit={char} duration={duration} />
        ) : (
          <span key={i} className="h-[1em] flex items-center justify-center">{char}</span>
        )
      )}
    </span>
  );
}
