import { useState } from 'react';
// import { Switch } from '@headlessui/react';
// import {
//   MapPinIcon,
//   PhoneIcon,
//   EnvelopeIcon,
// } from '@heroicons/react/24/outline';

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <div className="bg-white  px-6 py-24 sm:py-32 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info Section */}
          <div className="text-center p-3">
            <h1 className="text-2xl font-bold">Contact us</h1>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white border border-gray-300 rounded-md shadow-md p-6 sm:p-10 max-w-3xl mx-auto">
            <form action="#" method="POST" className="mx-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name*"
                    className="mt-2.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-black shadow-sm placeholder-gray-400 focus:ring-0 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email*"
                    className="mt-2.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-black shadow-sm placeholder-gray-400 focus:ring-0 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject*"
                    className="mt-2.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-black shadow-sm placeholder-gray-400 focus:ring-0 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message..."
                    rows={4}
                    className="mt-2.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-black shadow-sm placeholder-gray-400 focus:ring-0 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center space-x-3 sm:col-span-2 mt-4">
                {/* <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={`group flex w-8 flex-none cursor-pointer rounded-full p-px transition-colors duration-200 ease-in-out ${
                    agreed ? 'bg-orange-400' : 'bg-gray-400'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${
                      agreed ? 'translate-x-3.5' : 'translate-x-0'
                    }`}
                  />
                </Switch> */}
                <p className="text-sm text-gray-700">
                  By selecting this, you agree to our{' '}
                  <a href="#" className="font-semibold text-custom-blue">
                    privacy&nbsp;policy
                  </a>
                  .
                </p>
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={!agreed}
                  className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm transition ${
                    agreed
                      ? 'bg-orange-400 text-white hover:bg-custom-blue'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Send a Message
                </button>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-8 mb-10">
            <div>
              {/* <MapPinIcon className="h-8 w-8 text-custom-blue mx-auto" /> */}
              <p className="font-semibold mt-2">Address</p>
              <p className="text-gray-600 text-sm">
                329 Queensberry Street, Copenhagen VIC 3051, Denmark.
              </p>
            </div>
            <div>
              {/* <PhoneIcon className="h-8 w-8 text-custom-blue mx-auto" /> */}
              <p className="font-semibold mt-2">Call Us</p>
              <p className="text-gray-600 text-sm">123 456 7890</p>
            </div>
            <div>
              {/* <EnvelopeIcon className="h-8 w-8 text-custom-blue mx-auto" /> */}
              <p className="font-semibold mt-2">Email</p>
              <p className="text-gray-600 text-sm">
                contact.lifebonder@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
