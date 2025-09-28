// Sign In Page
import { redirect } from "next/navigation";
import { CredintialSigninComponent } from "@/component/credintial_signin_component";

export default async function signup() {
//   if (session) {
//     redirect("/dashboard");
//   }
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-auto p-6 bg-white rounded-lg shadow-2xl space-y-4 md:w-xl">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-sm font-bold text-gray-500">Welcome to</h1>
          <h1 className="text-2xl font-bold text-gray-800">Smart Library Management System</h1>
          <h1 className="text-sm font-bold text-gray-500">
            Sign in to your account
          </h1>
        </div>

        {/* credintial signin */}
        <div>
          <CredintialSigninComponent />
        </div>

        {/* divider */}
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>
        </div> */}

        {/* google signin */}
        {/* <div>
          <SignInBtn buttonOption={"Google"} />
        </div> */}

        {/* signup link */}
        {/* <div className="flex justify-center gap-2">
          <p className="text-sm font-bold text-gray-500">Don't have an account?</p>
          <Link href="/signup" className="text-sm font-bold text-blue-500">
            Create an account
          </Link>
        </div> */}
      </div>
    </main>
  );
}
