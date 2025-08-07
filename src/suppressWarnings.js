// Suppress React Router future flag warnings
const originalWarn = console.warn;
console.warn = function(...args) {
  // Suppress specific React Router warnings
  if (args[0] && typeof args[0] === 'string' && 
      (args[0].includes('React Router Future Flag Warning') ||
       args[0].includes('v7_startTransition') ||
       args[0].includes('v7_relativeSplatPath'))) {
    return;
  }
  originalWarn.apply(console, args);
};
