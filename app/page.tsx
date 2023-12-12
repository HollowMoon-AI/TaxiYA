import Booking from "@/components/Booking/Booking";
import Map from "@/components/Map/Map";


export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <Booking />
        </div>
        <div className="col-span-2">
          <Map />
        </div>
      </div>
    </div>
  )
}
