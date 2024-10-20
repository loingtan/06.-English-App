// import LoginImage from '@/assets/LoginImage.jpg'
import { Link } from "react-router-dom"
export const RegisterPage = () => {
  return (
    <>
      <div className="flex h-register-table w-register-table flex-col justify-between">
        <span className="text-title font-bold text-[#5d5fef]">Create an account</span>

        <div>
          <span className="text-default font-normal text-black">Already have an acount? </span>
          <Link to="/Login" className="text-default text-[#f17ab7] underline-offset-4">
            Login
          </Link>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="rounded-lg bg-white p-1 text-default text-[#f17ab7]"
        />

        <div className="flex w-full justify-between">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-72 rounded-lg bg-white p-1 text-default text-[#f17ab7]"
          />
          <input
            type="password"
            name="retype-password"
            placeholder="Retype Password"
            className="w-72 rounded-lg bg-white p-1 text-default text-[#f17ab7]"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="rounded-lg bg-white p-1 text-default text-[#f17ab7]"
        />

        <div>
          <input type="checkbox" className="mr-1 bg-white" />
          <label className="text-default font-normal text-black">I agree to the </label>
          <Link to="/Login" className="text-default text-[#f17ab7] underline-offset-4">
            Terms and Conditions
          </Link>
        </div>

        <button className="w-full rounded-lg bg-fuschia text-2xl font-normal text-white">Create account</button>

        <div className="flex-start flex justify-between align-bottom">
          <hr className="mt-6 block w-4/12 border-2 text-[#767676]" />
          <span className="text-default font-normal text-[#767676]">Or register with</span>
          <hr className="mt-6 block w-4/12 border-2 text-[#767676]" />
        </div>
      </div>
    </>
  )
}