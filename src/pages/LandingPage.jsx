import { CheckCircle, Shield, FileText, Zap } from 'lucide-react';

export default function LandingPage({ onShowLogin, onShowSignup }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">BillBuddy</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onShowLogin}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign In
            </button>
            <button
              onClick={onShowSignup}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Your AI-Powered Medical Bill Advocate
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Stop overpaying for healthcare. BillBuddy uses AI to analyze your medical bills, 
          detect billing errors, and help you dispute incorrect charges.
        </p>
        <button
          onClick={onShowSignup}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 shadow-lg"
        >
          Analyze Your First Bill Free
        </button>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Instant Analysis"
            description="Upload your bill and get AI-powered analysis in seconds"
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Error Detection"
            description="Automatically identify duplicate charges, overcharges, and invalid codes"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Dispute Tools"
            description="Generate professional dispute letters and emails instantly"
          />
          <FeatureCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Save Money"
            description="Recover thousands in incorrect charges and billing errors"
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Upload Your Bill"
              description="Simply upload a photo or PDF of your medical bill"
            />
            <Step
              number="2"
              title="AI Analysis"
              description="Our AI scans for errors, overcharges, and billing mistakes"
            />
            <Step
              number="3"
              title="Dispute & Save"
              description="Generate dispute letters and recover your money"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Medical Bills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients who have saved money with BillBuddy
          </p>
          <button
            onClick={onShowSignup}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 shadow-lg"
          >
            Start Analyzing Bills Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">© 2024 BillBuddy. Built for patient advocacy.</p>
          <p className="text-sm">Empowering patients to challenge unfair medical billing.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}