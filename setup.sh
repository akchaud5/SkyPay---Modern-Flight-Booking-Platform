#!/bin/bash

# SkyPay Installation Script
echo "🛫 Starting SkyPay installation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ npm version $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOL
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mock API - in a real app, these would be real API endpoints
NEXT_PUBLIC_API_URL=https://api.example.com

# Stripe - in a real app, these would be real API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_mock_key
EOL
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local file already exists"
fi

# Build the project
echo "🏗️ Building the project..."
npm run build

echo "🎉 Installation complete! You can now run the development server with:"
echo "   npm run dev"
echo ""
echo "📘 See README.md and SETUP.md for more details and configuration options."