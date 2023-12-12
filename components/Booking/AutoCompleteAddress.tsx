import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AutoCompleteAddress() {
    const [source, setSource] = useState<any>();
    const [sourceChange, setSourceChange] = useState<any>(false);
    const [destinationChange, setDestinationChange] = useState<any>(false);
    const [addressList, setAddressList] = useState<any>([]);
    const [destination, setDestination] = useState<any>();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList()
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source, destination]);

    const getAddressList = async() => {
        const res = await fetch(`/api/search-address/route?q=${encodeURIComponent(source)}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.ok) {
            const data = await res.json();
            setAddressList(data.features.map(f => ({
              full_address: f.place_name
            })))
        } else {
            setAddressList([]);
        }
    }


  return (
    <div className="mt-5">
        <div className="relative">
            <Label className="text-gray-400">Desde</Label>
            <Input
                type="text"
                placeholder="Ingrese la dirección de encuentro"
                className="w-full bg-white p-1 border rounded-md focus:border-yellow-300"
                value={source}
                onChange = { (e) => setSource(e.target.value) }
            />
            {addressList.length > 0 && sourceChange?
            <div className="abssolute w-full p-1 shadow-md rounded-md bg-white">
                {addressList.map((item:any, index:number) => (
                    // eslint-disable-next-line react/jsx-key
                    <h2 className="p-3 hover:bg-gray-100 cursor-pointer">
                        onClick={() => {setSource(item.full_address); setAddressList([]); setSourceChange(false)}}
                        {item.full_address}
                    </h2>
                ))}
            </div>: null}
        </div>
        <div className="mt-3">
            <Label className="text-gray-400">Hasta</Label>
            <Input
                    type="text"
                    placeholder="Ingrese la dirección final"
                    className="w-full bg-white p-1 border rounded-md focus:border-yellow-300"
                    value={destination}
                    onChange = { (e) => setDestination(e.target.value) }
            />
            {addressList.length > 0 && destinationChange?
            <div className="abssolute w-full p-1 shadow-md rounded-md bg-white">
                {addressList.map((item:any, index:number) => (
                    // eslint-disable-next-line react/jsx-key
                    <h2 className="p-3 hover:bg-gray-100 cursor-pointer">
                        onClick={() => {setDestination(item.full_address); setAddressList([]); setDestinationChange(false)}}
                        {item.full_address}
                    </h2>
                ))}
            </div>: null}
        </div>
    </div>
  )
}

export default AutoCompleteAddress