"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Understand Your Medical Reports with AI
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                AfterDoc helps you interpret medical reports and prescriptions in simple terms, providing valuable insights about your health.
              </p>
              <button
                onClick={() => router.push('/get-started')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </motion.div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/file.svg"
                alt="Medical Report Analysis"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Why Choose AfterDoc?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300"
            >
              <div className="text-blue-500 text-4xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center max-w-sm"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to understand your medical reports better?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Start using AfterDoc today and get clear insights about your health.
          </p>
          <button
            onClick={() => router.push('/analysis')}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Try AfterDoc Now
          </button>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    icon: '🔍',
    title: 'AI-Powered Analysis',
    description: 'Advanced AI technology that breaks down complex medical terminology into simple, understandable language.'
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'Get immediate insights about your medical reports and prescriptions without any waiting time.'
  },
  {
    icon: '📊',
    title: 'Comprehensive Insights',
    description: 'Detailed analysis of test results, critical values, and recommendations in an easy-to-understand format.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your medical data is processed securely and never stored on our servers.'
  },
  {
    icon: '📱',
    title: 'Accessible Anywhere',
    description: 'Access your medical report analysis from any device, anytime, anywhere.'
  },
  {
    icon: '🤝',
    title: 'Patient-Centric',
    description: 'Designed to help you make informed decisions about your health with confidence.'
  }
];

const steps = [
  {
    title: 'Upload Your Report',
    description: 'Simply upload your medical report or prescription in any common format.'
  },
  {
    title: 'AI Analysis',
    description: 'Our AI system analyzes the document and extracts key information.'
  },
  {
    title: 'Get Clear Insights',
    description: 'Receive easy-to-understand explanations and actionable insights about your health.'
  }
];
