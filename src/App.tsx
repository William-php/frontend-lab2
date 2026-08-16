import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AppRoutes />
      </main>
    </div>
  )
}
