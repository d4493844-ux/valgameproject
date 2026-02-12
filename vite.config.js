import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
```

## 3️⃣ **.gitignore**
```
logs
*.log
node_modules
dist
dist-ssr
*.local
.vscode/*
.idea
.DS_Store
.env
.env.local
.env.production
```

## 4️⃣ **.env.example**
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key