import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    'nli-markdown'?: string;
    'nli-group-label'?: string;
    'nli-target-id'?: string;
  }
}
