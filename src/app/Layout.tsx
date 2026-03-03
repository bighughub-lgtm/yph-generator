import { Outlet } from 'react-router';
import { WizardProvider } from './context/WizardContext';

export function Layout() {
  return (
    <WizardProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </WizardProvider>
  );
}