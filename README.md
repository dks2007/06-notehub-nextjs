# NoteHub

A simple and efficient application for managing personal notes, built with Next.js and TypeScript.

## Features

- Create, view, and delete notes
- Search notes by keyword
- Pagination for large note lists
- Responsive design with CSS Modules
- Server-side rendering (SSR) with data prefetching
- Client-side state management with TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd 06-notehub-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your API token:
   ```
   NEXT_PUBLIC_NOTEHUB_TOKEN=your_api_token_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Global layout with Header/Footer
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Global loading component
│   ├── notes/
│   │   ├── page.tsx       # Notes list page (SSR)
│   │   ├── Notes.client.tsx # Client-side notes logic
│   │   ├── NotesPage.module.css
│   │   ├── error.tsx      # Error boundary for notes
│   │   └── [id]/
│   │       ├── page.tsx   # Note details page (SSR)
│   │       ├── NoteDetails.client.tsx
│   │       ├── NoteDetails.module.css
│   │       └── error.tsx  # Error boundary for note details
├── components/            # Reusable components
│   ├── Header/            # Navigation header
│   ├── Footer/            # Site footer
│   ├── TanStackProvider/  # Query client provider
│   ├── NoteList/          # Notes list component
│   ├── NoteForm/          # Note creation form
│   ├── SearchBox/         # Search input
│   ├── Pagination/        # Pagination component
│   ├── Modal/             # Modal dialog
│   ├── Loader/            # Loading indicator
│   └── ErrorMessage/      # Error display
├── lib/
│   └── api.ts             # API functions
├── types/
│   ├── note.ts            # Note type definitions
│   └── movie.ts           # Movie types (legacy)
└── styles/
    └── globals.css        # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API

The application uses the NoteHub API. Make sure to set the `NEXT_PUBLIC_NOTEHUB_TOKEN` environment variable with your API token.

## Deployment

The application is configured for deployment on Vercel. Make sure to set the environment variables in your Vercel project settings.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **CSS Modules** - Scoped styling
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

## Troubleshooting

### API Token Issues

If you see authentication errors, make sure your `NEXT_PUBLIC_NOTEHUB_TOKEN` is correctly set in `.env.local`.

### Build Errors

Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 3000 is busy, Next.js will automatically use the next available port. Check the console output for the correct URL.