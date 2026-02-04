'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const gradeOptions = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3']

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Student Information
    studentFirstName: '',
    studentLastName: '',
    studentMiddleName: '',
    dateOfBirth: '',
    gender: '',
    gradeApplyingFor: '',
    previousSchool: '',
    previousSchoolAddress: '',
    
    // Parent/Guardian Information
    parentFirstName: '',
    parentLastName: '',
    relationship: '',
    parentEmail: '',
    parentPhone: '',
    alternatePhone: '',
    
    // Address Information
    homeAddress: '',
    city: '',
    state: '',
    
    // Additional Information
    howDidYouHear: '',
    specialNeeds: '',
    additionalComments: '',
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call - replace with actual API endpoint when ready
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const isStep1Valid = formData.studentFirstName && formData.studentLastName && 
    formData.dateOfBirth && formData.gender && formData.gradeApplyingFor

  const isStep2Valid = formData.parentFirstName && formData.parentLastName && 
    formData.relationship && formData.parentEmail && formData.parentPhone

  if (submitted) {
    return (
      <div className="font-sans antialiased">
        <Header currentPage="admissions" />
        
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-[70vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-circle text-green-600 text-4xl"></i>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Application Submitted!
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Thank you for applying to Yeshua High School. We have received your application 
                and will review it shortly. Our admissions team will contact you within 3-5 business days.
              </p>
              <div className="bg-[#a73434]/5 border border-[#a73434]/20 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
                <ul className="text-gray-600 text-left space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-[#a73434] mt-1 mr-3"></i>
                    <span>Our admissions team will review your application</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-[#a73434] mt-1 mr-3"></i>
                    <span>You will receive an email confirmation with next steps</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-[#a73434] mt-1 mr-3"></i>
                    <span>We may schedule an interview or assessment</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/home"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  <i className="fas fa-home mr-2"></i>
                  Return Home
                </Link>
                <Link
                  href="/home#contact"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="font-sans antialiased">
      <Header currentPage="admissions" />

      {/* Hero Section */}
      <section
        className="relative py-24 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/32.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <i className="fas fa-graduation-cap mr-2"></i>
            Admissions 2025-2026
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply to Yeshua High School</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-200">
            Begin your journey with us. Complete the application form below to start the admissions process.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                  step >= num 
                    ? 'bg-[#a73434] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > num ? <i className="fas fa-check"></i> : num}
                </div>
                <span className={`ml-2 hidden sm:inline font-medium ${
                  step >= num ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {num === 1 ? 'Student Info' : num === 2 ? 'Parent Info' : 'Review'}
                </span>
                {num < 3 && (
                  <div className={`w-12 sm:w-24 h-1 mx-2 sm:mx-4 rounded ${
                    step > num ? 'bg-[#a73434]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            {/* Step 1: Student Information */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#a73434]/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-user-graduate text-[#a73434]"></i>
                  </div>
                  Student Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.studentFirstName}
                      onChange={(e) => updateField('studentFirstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.studentLastName}
                      onChange={(e) => updateField('studentLastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={formData.studentMiddleName}
                      onChange={(e) => updateField('studentMiddleName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Enter middle name (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => updateField('gender', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gradeApplyingFor}
                      onChange={(e) => updateField('gradeApplyingFor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      required
                    >
                      <option value="">Select grade level</option>
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous School
                    </label>
                    <input
                      type="text"
                      value={formData.previousSchool}
                      onChange={(e) => updateField('previousSchool', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Name of previous school (if applicable)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous School Address
                    </label>
                    <input
                      type="text"
                      value={formData.previousSchoolAddress}
                      onChange={(e) => updateField('previousSchoolAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Address of previous school"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep1Valid}
                    className="bg-[#a73434] hover:bg-[#8f2c2c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center"
                  >
                    Continue
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Parent/Guardian Information */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#a73434]/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-users text-[#a73434]"></i>
                  </div>
                  Parent/Guardian Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.parentFirstName}
                      onChange={(e) => updateField('parentFirstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Parent/Guardian first name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.parentLastName}
                      onChange={(e) => updateField('parentLastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Parent/Guardian last name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship to Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.relationship}
                      onChange={(e) => updateField('relationship', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      required
                    >
                      <option value="">Select relationship</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => updateField('parentEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => updateField('parentPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="e.g., 08012345678"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={(e) => updateField('alternatePhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Alternative contact number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.homeAddress}
                      onChange={(e) => updateField('homeAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="City"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all flex items-center"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep2Valid}
                    className="bg-[#a73434] hover:bg-[#8f2c2c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center"
                  >
                    Continue
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-[#a73434]/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-clipboard-check text-[#a73434]"></i>
                  </div>
                  Review & Submit
                </h2>

                {/* Student Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-user-graduate text-[#a73434] mr-2"></i>
                    Student Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Full Name</span>
                      <p className="font-medium text-gray-800">
                        {formData.studentFirstName} {formData.studentMiddleName} {formData.studentLastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date of Birth</span>
                      <p className="font-medium text-gray-800">{formData.dateOfBirth}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Gender</span>
                      <p className="font-medium text-gray-800 capitalize">{formData.gender}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Grade Applying For</span>
                      <p className="font-medium text-gray-800">{formData.gradeApplyingFor}</p>
                    </div>
                    {formData.previousSchool && (
                      <div className="md:col-span-2">
                        <span className="text-sm text-gray-500">Previous School</span>
                        <p className="font-medium text-gray-800">{formData.previousSchool}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Parent Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-users text-[#a73434] mr-2"></i>
                    Parent/Guardian Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Full Name</span>
                      <p className="font-medium text-gray-800">
                        {formData.parentFirstName} {formData.parentLastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Relationship</span>
                      <p className="font-medium text-gray-800 capitalize">{formData.relationship}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email</span>
                      <p className="font-medium text-gray-800">{formData.parentEmail}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone</span>
                      <p className="font-medium text-gray-800">{formData.parentPhone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-sm text-gray-500">Address</span>
                      <p className="font-medium text-gray-800">
                        {formData.homeAddress}, {formData.city}, {formData.state}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-info-circle text-[#a73434] mr-2"></i>
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        value={formData.howDidYouHear}
                        onChange={(e) => updateField('howDidYouHear', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                      >
                        <option value="">Select an option</option>
                        <option value="friend">Friend/Family</option>
                        <option value="social">Social Media</option>
                        <option value="website">Website</option>
                        <option value="church">Church</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Needs/Requirements
                      </label>
                      <input
                        type="text"
                        value={formData.specialNeeds}
                        onChange={(e) => updateField('specialNeeds', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all"
                        placeholder="Any special requirements?"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Comments
                      </label>
                      <textarea
                        value={formData.additionalComments}
                        onChange={(e) => updateField('additionalComments', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a73434] focus:border-[#a73434] outline-none transition-all resize-none"
                        placeholder="Any additional information you'd like to share..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
                    <p className="text-sm text-yellow-800">
                      Please review all information carefully before submitting. Once submitted, 
                      you will receive a confirmation email with further instructions.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all flex items-center"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#a73434] hover:bg-[#8f2c2c] disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <i className="fas fa-paper-plane ml-2"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
