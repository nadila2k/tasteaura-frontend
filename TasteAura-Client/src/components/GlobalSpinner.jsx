// components/GlobalSpinner.jsx
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

const spinnerContainer = document.createElement("div");
document.body.appendChild(spinnerContainer);
const root = createRoot(spinnerContainer);

let show = () => {};
let hide = () => {};

function Spinner() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    show = () => {
      isLoadingRef.current = true;
      
      
      timeoutRef.current = setTimeout(() => {
        if (isLoadingRef.current) {
          setVisible(true);
        }
      }, 1000); 
    };
    
    hide = () => {
      isLoadingRef.current = false;
      setVisible(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .spinner-ring {
          animation: spin 0.8s linear infinite;
        }
        
        .pulse-text {
          animation: pulse-soft 1.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="bg-white/95 rounded-2xl px-12 py-10 shadow-2xl flex flex-col items-center gap-5">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full spinner-ring"></div>
        <div className="text-gray-700 text-sm font-medium tracking-wide pulse-text">
          Loading...
        </div>
      </div>
    </div>
  );
}

root.render(<Spinner />);

export const showSpinner = () => show();
export const hideSpinner = () => hide();