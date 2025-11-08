# BillBuddy - AI-Powered Medical Bill Advocate

BillBuddy is an AI-powered web application that helps patients analyze medical bills, detect billing errors, and generate dispute letters automatically.

## 🌟 Features

- **AI Bill Analysis**: Upload medical bills (PDF/Image) and get instant AI-powered analysis
- **Error Detection**: Automatically identifies:
  - Duplicate charges
  - Overcharges vs Medicare benchmarks
  - Invalid billing codes
  - Missing documentation
- **OCR Text Extraction**: Extracts text from images and PDFs using Tesseract.js
- **Dispute Tools**: Auto-generates professional dispute letters and email templates
- **Savings Calculator**: Estimates potential savings from billing errors
- **Secure Storage**: Bills and analysis stored securely in Supabase

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage)
- **AI**: OpenAI GPT-4o-mini
- **OCR**: Tesseract.js
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (planned)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/maya-na1k/billbuddy.git
cd billbuddy
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your credentials:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm start
```

## 🚀 Usage

1. Sign up for an account
2. Upload a medical bill (PDF or image)
3. Wait for AI analysis (30-60 seconds)
4. Review detected issues and potential savings
5. Generate dispute letters/emails
6. Download or copy documents to send to billing department

## 🎯 Problem Solved

Medical billing errors affect 80% of medical bills, costing patients billions annually. BillBuddy democratizes access to billing expertise by:
- Making bill analysis accessible to everyone
- Reducing financial stress during medical crises
- Empowering patients to challenge unfair charges
- Providing professional dispute tools without expensive advocates

## 📊 Database Schema

- **profiles**: User information
- **medical_bills**: Uploaded bills metadata
- **bill_line_items**: Individual charges from bills
- **bill_analyses**: AI analysis results
- **dispute_documents**: Generated dispute letters

## 🔐 Security

- Row-level security (RLS) enabled on all tables
- Secure file storage with user-based access control
- Environment variables for API keys
- Authentication required for all features

## 🤝 Contributing

This is a hackathon project. Contributions welcome!

## 📝 License

MIT License

## 👥 Team

Built with ❤️ for patient advocacy

---

**Note**: This is an MVP built for demonstration purposes. Always consult with healthcare professionals and billing experts for official disputes.