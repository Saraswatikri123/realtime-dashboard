import React from 'react';
import styles from './CountdownRing.module.css';

export default function CountdownRing({ countdown, syncInterval, isSyncing }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = countdown / syncInterval;
  const dashoffset = circumference * (1 - progress);

  // Color shifts from green → amber → red as time runs out
  const hue = Math.round(progress * 140); // 140=green, 0=red
  const ringColor = isSyncing ? '#7c3aed' : `hsl(${hue}, 90%, 55%)`;

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 120 120" className={styles.svg}>
        {/* Track */}
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="#1a1a26"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s ease' }}
        />
        {/* Glow dot at tip */}
        {!isSyncing && (
          <circle
            cx={60 + radius * Math.cos((progress * 360 - 90) * (Math.PI / 180))}
            cy={60 + radius * Math.sin((progress * 360 - 90) * (Math.PI / 180))}
            r="5"
            fill={ringColor}
            style={{ filter: `drop-shadow(0 0 6px ${ringColor})` }}
          />
        )}
      </svg>
      <div className={styles.center}>
        {isSyncing ? (
          <span className={styles.syncingText}>SYNC</span>
        ) : (
          <>
            <span className={styles.number}>{countdown}</span>
            <span className={styles.label}>sec</span>
          </>
        )}
      </div>
    </div>
  );
}
