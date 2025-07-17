type PrintOrientation = 'landscape' | 'portrait';
type PrintSize = 'A4' | 'letter' | 'legal' | string;

interface PrintStyleProps {
  orientation?: PrintOrientation;
  size?: PrintSize;
  margin?: string;
}

export default function PrintStyle({
  orientation = 'portrait',
  size,
  margin = '0',
}: PrintStyleProps) {
  const pageSize = size ? `${size} ${orientation}` : orientation;

  return (
    <style>{`
      @media print {
        @page {
          size: ${pageSize};
          margin: ${margin};
        }
      }
    `}</style>
  );
}
