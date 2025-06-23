import Link from 'next/link';
import React from 'react';

const LoginRegisterPage = () => {
    return (
        <div className="hidden lg:flex space-x-4">
        <Link href="/login" className="text-gray-600 hover:text-green-500">
          Login/ Register
        </Link>
      </div>
    );
};

export default LoginRegisterPage;