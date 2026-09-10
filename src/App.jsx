import React from 'react';
import ScrollytellingExperience from './components/ScrollytellingExperience.jsx';
import OverlayUI from './components/OverlayUI.jsx';

// Catches render-time failures so the user sees guidance instead of a void.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch() {
    document.getElementById('boot-veil')?.remove();
  }
  render() {
    if (this.state.error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] p-6 text-center">
          <div className="max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <div className="text-3xl mb-3">🛠️</div>
            <h1 className="font-display text-2xl text-[#faf7f0] mb-2">The workshop hit a snag</h1>
            <p className="text-[13px] text-white/60 leading-relaxed mb-5">
              HandyTrust couldn&rsquo;t start the 3D tour on this device or browser.
              Please use an up-to-date Chrome, Edge, Safari or Firefox with hardware
              acceleration enabled, then reload.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-black bg-gradient-to-b from-brass-300 to-brass-500"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#0a0a0a] overflow-hidden select-none font-sans">
      <ErrorBoundary>
        <ScrollytellingExperience />
        <OverlayUI />
      </ErrorBoundary>
    </div>
  );
}
