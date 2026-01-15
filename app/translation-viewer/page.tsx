import styles from './page.module.css';
import { ComponentViewer } from './ComponentViewer';

export default function TranslationViewerPage() {
  return (
    <main className={styles.container}>
      <ComponentViewer>
        <header className={styles.header}>
          <div className="flex flex-col gap-2">
            <h1 className={styles.title}>UI to Markdown</h1>
            <p className={styles.subtitle}>
              Review and manage your localized content with precision and ease.
            </p>
          </div>
        </header>
      </ComponentViewer>
    </main>
  );
}
