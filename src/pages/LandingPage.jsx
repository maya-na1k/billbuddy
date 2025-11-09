import { Zap, FileText, FileBadge, DollarSign, ArrowRight } from 'lucide-react';

// Replaced CheckCircle, Shield, FileText, Zap, Lock, Brain, TrendingUp imports with the necessary ones

// This component is updated to reflect the visual style and content of the provided images.
// The background is changed to a light pastel gradient.

export default function LandingPage({ onShowLogin, onShowSignup }) {
  // Utility components for reusability
  const StatItem = ({ label, value }) => (
    <div className="text-center">
      <p className="text-xl font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-3xl font-extrabold text-purple-700">{value}</p>
    </div>
  );

  const HowItWorksCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const SimpleStep = ({ number, title, description }) => (
    <div className="text-center">
      <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{description}</p>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation - Top Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileBadge className="w-7 h-7 text-purple-600" />
            <h1 className="text-2xl font-extrabold text-gray-900">BillBuddy</h1>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={onShowLogin}
              className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors text-lg"
            >
              Sign In
            </button>
            <button
              onClick={onShowSignup}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Matching Image 1 (Dark Text on Light Background) */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Statistics Bar (Simulating the top row in a light theme) */}
        <div className="flex justify-center gap-12 mb-16 p-4 rounded-xl">
          <StatItem label="AVERAGE SAVINGS" value="$3,200" />
          <StatItem label="SUCCESS RATE" value="89%" />
          <StatItem label="BILLS ANALYZED" value="50,000+" />
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight max-w-4xl mx-auto">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AI Platform</span> Patients Choose
          for <span className="text-purple-700">Medical Bill Advocacy</span>
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          BillBuddy helps patients reduce financial burden, strengthen their rights, and ensure fair billing so
          everyone can focus on what matters most—their health and recovery.
        </p>

        {/* Primary CTA */}
        <button
          className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all shadow-lg"
        >
          Analyze Your Bill Free <ArrowRight className="w-5 h-5 ml-2" />
        </button>

        {/* Trusted By Section */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Trusted by patients at</p>
          <div className="flex justify-center items-center gap-10 sm:gap-16 flex-wrap">
            {['Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic', 'Kaiser Permanente'].map((clinic) => (
              <span key={clinic} className="text-xl md:text-2xl font-bold text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
                {clinic}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      ---

      {/* How BillBuddy Works Section - Matching Image 3 */}
      <div className="py-20 bg-white/70">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">How BillBuddy Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <HowItWorksCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Analysis"
              description="Upload your bill and get AI-powered analysis in seconds"
            />
            <HowItWorksCard
              icon={<FileText className="w-8 h-8" />}
              title="Error Detection"
              description="Automatically identify duplicate charges, overcharges, and invalid codes"
            />
            <HowItWorksCard
              icon={<FileBadge className="w-8 h-8" />}
              title="Dispute Tools"
              description="Generate professional dispute letters and emails instantly"
            />
            <HowItWorksCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Save Money"
              description="Recover thousands in incorrect charges and billing errors"
            />
          </div>
        </div>
      </div>

      ---

      {/* Three Simple Steps Section - Matching Image 2 */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-16">Three Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <SimpleStep
              number="1"
              title="Upload Your Bill"
              description="Simply upload a photo or PDF of your medical bill"
            />
            <SimpleStep
              number="2"
              title="AI Analysis"
              description="Our AI scans for errors, overcharges, and billing mistakes"
            />
            <SimpleStep
              number="3"
              title="Dispute & Save"
              description="Generate dispute letters and recover your money"
            />
          </div>
        </div>
      </div>

      ---

      {/* Secondary CTA Section - Matching the bottom banner in Image 2 */}
      <div className="relative py-20 bg-gradient-to-r from-purple-500 to-pink-500 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Take Control of Your Medical Bills?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Join thousands of patients who have saved money with BillBuddy
          </p>
          <button
            onClick={onShowSignup}
            className="inline-flex items-center bg-white text-purple-600 px-10 py-3 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Start Analyzing Bills Now <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Footer (Simplified to keep the component focused on the requested sections) */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-1">© 2024 BillBuddy. All rights reserved.</p>
          <p className="text-sm text-gray-500">Empowering patients to challenge unfair medical billing.</p>
        </div>
      </footer>
    </div>
  );
}