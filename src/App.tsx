import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Montserrat',
        'url(https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.woff2)'
      );

      try {
        await font.load();
        document.fonts.add(font);
        console.log('Montserrat font loaded successfully');
      } catch (error) {
        console.error('Error loading Montserrat font:', error);
      }
    };

    loadFont();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default App;