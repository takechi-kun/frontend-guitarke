import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
function SignUpModal({ isOpen, setIsOpen, messageAlert }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Failed
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{messageAlert}</p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default SignUpModal;
