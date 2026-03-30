import React from 'react';
import styles from './PostCard.module.css';

const ACCENT_COLORS = ['#00e5ff', '#7c3aed', '#f59e0b', '#10b981', '#ef4444', '#ec4899'];

export default function PostCard({ post, index }) {
  const accentColor = ACCENT_COLORS[post.userId % ACCENT_COLORS.length];

  return (
    <article
      className={styles.card}
      style={{ '--card-accent': accentColor, animationDelay: `${index * 40}ms` }}
    >
      <div className={styles.header}>
        <span className={styles.idBadge} style={{ borderColor: accentColor, color: accentColor }}>
          #{String(post.id).padStart(2, '0')}
        </span>
        <span className={styles.userId}>User {post.userId}</span>
      </div>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.body}>{post.body}</p>
      <div className={styles.footer}>
        <span className={styles.dot} style={{ background: accentColor }} />
        <span className={styles.live}>LIVE</span>
      </div>
    </article>
  );
}
