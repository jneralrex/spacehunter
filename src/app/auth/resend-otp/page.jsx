'use client'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { resendOtp } from '@/utils/axios/authEndPoints'
import useLoadingStore from '@/utils/store/useLoading'
import useAuthStore from '@/utils/store/useAuthStore'

export default function RegisterPage() {
    const { register, handleSubmit } = useForm()

    const { loading } = useLoadingStore();
    const router = useRouter();
    const { error, setError } = useAuthStore();

    const onSubmit = async () => {
        setError(null)
        try {
            await resendOtp()
            router.push("/auth/verify-otp")
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
                    Didnt recieve OTP?
                </h2>
                {error ? (<span className='text-red-600'>
                    {error}
                </span>) : ""}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    {loading ? "Resending..." : "Resend "}

                </button>
            </form>
        </motion.div>
    )
}
