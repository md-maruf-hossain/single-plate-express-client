import Image from "next/image";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 justify-center">
      {/* Contact Support Card */}
      <div className="max-w-lg rounded-md shadow-md bg-gray-50 text-gray-800">
        <Image src="/images/contact/customer-service.jpg" alt="Contact Support" width={300} height={300} className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Contact Support</h2>
            <p className="text-gray-800">Are you an existing Zerocater customer who needs help? Reach out and we’ll get back to you.</p>
          </div>
          <button className="w-full border-2 border-green-500 text-green-500 py-3 rounded-md font-semibold hover:bg-green-100 transition">Text Us: (218) 295-4518</button>
          <button className="w-full border-2 border-green-500 text-green-500 py-3 rounded-md font-semibold hover:bg-green-100 transition">Call Us: (844) 229-9376</button>
        </div>
      </div>

      {/* Become a Customer Card */}
      <div className="max-w-lg rounded-md shadow-md bg-gray-50 text-gray-800">
        <Image src="/images/contact/become-customer.jpg" alt="Become a Customer" width={300} height={300} className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Become a Customer</h2>
            <p className="text-gray-800">Interested in revolutionizing your company meal program? Contact us to learn what we can do for you.</p>
          </div>
          <button className="w-full border-2 border-green-500 text-green-500 py-3 rounded-md font-semibold hover:bg-green-100 transition">Text Us: (218) 295-4518</button>
          <button className="w-full border-2 border-green-500 text-green-500 py-3 rounded-md font-semibold hover:bg-green-100 transition">Call Us: (844) 229-9376</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
