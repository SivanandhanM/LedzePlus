export default function Footer() {
  return (
    <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>© {new Date().getFullYear()} LEDZE Plus ERP. All rights reserved.</p>
      <p className="mt-2">
        Powered by <a href="https://www.navanalatech.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">NAVANALA TECHNOLOGIES PRIVATE LIMITED</a>
      </p>
    </footer>
  );
}
