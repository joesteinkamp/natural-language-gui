import styles from './page.module.css';
import { ComponentViewerBidirectional } from '@/components/ComponentViewerBidirectional';

export default function Home() {
  return (
    <main className={styles.container}>
      <ComponentViewerBidirectional>
        <header className={styles.header}>
          <div className="flex flex-col gap-2">
            <h1 className={styles.title}>Natural Language Interface</h1>
            <p className={styles.subtitle}>
              Bidirectional conversion between GUI components and natural language markdown.
            </p>
          </div>
        </header>
      </ComponentViewerBidirectional>
    </main>
  );
}
