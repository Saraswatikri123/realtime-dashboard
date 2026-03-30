import React from 'react';
import { useDataSync } from './useDataSync';
import CountdownRing from './CountdownRing';
import PostCard from './PostCard';
import styles from './Dashboard.module.css';

function formatTime(date) {
  if (!date) return '—';
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function Dashboard() {
  const {
    posts,
    loading,
    error,
    countdown,
    syncCount,
    lastSynced,
    isSyncing,
    manualRefresh,
    syncInterval,
  } = useDataSync();

  return (
    <div className={styles.page}>
      {/* Background grid */}
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoMark}>
            <span />
            <span />
            <span />
          </div>
          <div>
            <h1 className={styles.title}>DataSync</h1>
            <p className={styles.subtitle}>Real-time Data Environment</p>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* Stats strip */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Posts</span>
              <span className={styles.statValue}>{posts.length}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statLabel}>Syncs</span>
              <span className={styles.statValue}>{syncCount}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statLabel}>Last sync</span>
              <span className={styles.statValue}>{formatTime(lastSynced)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sync bar */}
      <div className={styles.syncBar}>
        <div className={styles.syncLeft}>
          <CountdownRing
            countdown={countdown}
            syncInterval={syncInterval}
            isSyncing={isSyncing}
          />
          <div className={styles.syncInfo}>
            <p className={styles.syncStatus}>
              {isSyncing ? (
                <span className={styles.syncing}>Syncing data…</span>
              ) : (
                <>
                  <span className={styles.syncLabel}>Next update in </span>
                  <span className={styles.syncCountdown}>{countdown}s</span>
                </>
              )}
            </p>
            <p className={styles.syncSource}>
              Data Syncing <code></code>
            </p>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(countdown / syncInterval) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <button
          className={styles.refreshBtn}
          onClick={manualRefresh}
          disabled={isSyncing || loading}
          aria-label="Manually refresh data"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          Refresh Now
        </button>
      </div>

      {/* Main content */}
      <main className={styles.main}>
        {loading && !posts.length ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Fetching posts…</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>⚠ {error}</p>
            <button onClick={manualRefresh}>Try Again</button>
          </div>
        ) : (
          <div className={styles.grid} key={syncCount}>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>Auto-syncs every {syncInterval}s · No page reload required</span>
        <span className={styles.footerDot}>·</span>
       
      </footer>
    </div>
  );
}
