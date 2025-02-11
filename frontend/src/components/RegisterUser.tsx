import signupImage from '../assets/networkingImage.jpg';
import formImage from '../assets/formImage.svg';

const RegisterUser = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex justify-center items-center p-5">
        <div className="w-full max-w-md">
          <form className="p-5 shadow-xl w-full mx-auto">
            <img className="w-44" src={formImage} alt="form image" />
            <h1 className="text-2xl font-bold">Sign up and get on board</h1>
            <div className="grid grid-cols-1 gap-3">
              <label className="input bg-white my-2 input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="First Name" />
              </label>
              <label className="input bg-white my-2 input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Last Name" />
              </label>
              <label className="input bg-white my-2 input-bordered flex items-center gap-2">
                <input
                  type="email"
                  className="grow bg-none"
                  placeholder="Email"
                />
              </label>
              <label className="input bg-white my-2 input-bordered flex items-center gap-2">
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                />
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                className="checkbox checkbox-xs border border-black"
              />
              <p className="">
                I agree to the Terms and conditions of LifeBonder
              </p>
            </div>
            <div className="my-4">
              <p>
                Got an account?{' '}
                <span className="text-orange-400 cursor-pointer">
                  Log in here
                </span>
              </p>
            </div>
            <button className="w-full btn bg-orange-400 hover:bg-orange-500 border-none text-white">
              Create Account
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex flex-1 h-screen">
        <img
          src={signupImage}
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterUser;
