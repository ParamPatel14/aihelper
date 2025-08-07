import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "@/app/lib/auth";
import SignOutButton from "@/components/SignOutButton";


const DashboardPage = async () => {
  
  const session = await getServerSession(authOptions);

  
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const { user } = session;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-2 text-md text-gray-600">Welcome back, {user.name}!</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {user.image && (
            <Image
              src={user.image}
              alt="User Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-indigo-500"
            />
          )}
          <div className="text-left w-full bg-gray-50 p-4 rounded-lg">
            {/* ID field removed because user.id does not exist on session user type */}
            <p className="text-lg font-semibold text-gray-700">
              Name: <span className="font-normal text-gray-900">{user.name}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Email: <span className="font-normal text-gray-900">{user.email}</span>
            </p>
          </div>
        </div>
        <div className="mt-6">
            <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;