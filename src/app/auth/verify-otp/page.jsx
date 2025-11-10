'use client'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { verifyOtp } from '@/utils/axios/authEndPoints'
import useLoadingStore from '@/utils/store/useLoading'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const { loading } = useLoadingStore();

  const router = useRouter()

  const onSubmit = async (formData) => {
    try {
      await verifyOtp(formData)
      router.push("/auth/login");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message))
    }
  }
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Verify Otp 
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            OTP
          </label>
          <input
            type="text"
            {...register("otp")}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Verifying..." : "Verify Otp"}

        </button>

        <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
         Didnt recieve OTP? <a href="/login" className="text-blue-500 hover:underline">Resend</a>
        </p>
      </form>
    </motion.div>
  )
}
