"use client";
import Link from "next/link";
import SearchInput from "@/components/shared/search-input";
import { useState, useEffect } from "react";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/components/admin/devices/columns";
import { Device } from "@/data/dispositifs";
import { DeviceService } from "./_lib/services/deviceService";
import { DialogDemo } from "@/components/admin/devices/DialogDemo";

const Page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await DeviceService.fetchAssignedDevices();
    
        const updatedDevices = await Promise.all(
          fetchedDevices.map(async (device) => {
            const user = await DeviceService.getUserByDeviceId(device.user_id);
            const state = await DeviceService.getStateTypeById(device.state_type_id);
            const type = await DeviceService.getTypeByTypeId(device.type_id);
            
            return {
              ...device,
              client_name: user.first_name,
              client_family_name: user.family_name,
              actual_state: state.state,     
              type: type.type,
            };
          })
        );
    
        setDevices(updatedDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    
    fetchDevices(); 
  }, []);

  // Filter function for search
  const filteredDevices = devices.filter((device) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      device.client_name?.toLowerCase().includes(searchLower) ||
      device.client_family_name?.toLowerCase().includes(searchLower) ||
      device.type?.toLowerCase().includes(searchLower) ||
      device.actual_state?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          <SearchInput 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un dispositif..." 
          />
        </div>
        <div className="flex gap-2">
          <Button className="px-8 font-montserrat">
            Dispositifs
          </Button>
          <Button className="px-8 font-montserrat">
            <Link href="/admin/devices/add-device">Nouveau</Link>
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto py-5">
        <DataTable 
          columns={columns} 
          data={filteredDevices} 
          // Pass a visibility configuration for columns
          columnVisibility={{
            user_id: false,
            state_type_id: false,
            type_id: false,
          }}
        />
      </div>
    </div>
  );
};

export default Page;