import { Toaster } from 'sonner'
import './index.css'
import { ThemeProvider } from "@/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import DynamicRouter from '@/router';
function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="w-screen h-screen relative">
                <Toaster position='top-center' richColors />
                <DynamicRouter />
                <div className="fixed bottom-4 right-4">
                    <ModeToggle />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
