#!/bin/bash
# Backend setup script for MUJ ACM

echo "🚀 Setting up MUJ ACM Backend..."

# Copy environment template
if [ ! -f .env ]; then
  echo "📋 Creating .env from .env.example..."
  cp .env.example .env
  echo "⚠️  Please edit .env with your email credentials"
else
  echo "✓ .env already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✓ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env with your SMTP credentials"
echo "2. Run: npm run dev (development with auto-reload)"
echo "3. Or run: npm start (production)"
echo ""
echo "🧪 Test the API:"
echo "   curl http://localhost:5000/health"
echo ""
