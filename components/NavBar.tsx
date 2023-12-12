import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

function NavBar() {
  return (
    <div className="flex justify-between p-3 px-10 border-b shadow-sm">
        <div className="flex items-center gap-10">
            <Image
                src="/logo.png"
                alt="logo"
                width={60}
                height={60}
            />
            <div className="hidden md:flex gap-6">
                <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
                    Home
                </h2>
                
                <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
                    History
                </h2>
                
                <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
                    Help
                </h2>
                
            </div>            
        </div>
        <UserButton />
    </div>
  )
}

export default NavBar