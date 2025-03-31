function ContactFormPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className=" sm:w-[700px]">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          For more information. Please complete this form.
        </p>

        <form>
          <div className="mb-8">
            <label className="block text-md font-medium text-gray-700">
              Name*
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-8">
            <label className="block text-md font-medium text-gray-700">
              E-Mail Address*
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactFormPage;
