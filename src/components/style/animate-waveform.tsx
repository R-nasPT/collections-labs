@keyframes waveform {
  0%, 100% { height: 8px;  opacity: 0.4; }
  50%       { height: 40px; opacity: 1;   }
}

@utility animate-waveform {
  animation: waveform 1s ease-in-out infinite;
}

<div className="flex items-center gap-[5px]">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <span
          key={i}
          className="animate-waveform block w-[5px] rounded-full bg-blue-500 dark:bg-blue-400"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
