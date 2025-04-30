"use client";
import Link from "next/link";
import SearchInput from "@/components/shared/search-input";
import { useState, useEffect } from "react";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { createColumns } from "@/components/admin/devices/columns";
import { Device } from "@/data/dispositifs";
import { DeviceService } from "./_lib/services/deviceService";
import { DeviceActionModal } from "@/components/admin/devices/DeviceActionModal";

const Page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [modalDevice, setModalDevice] = useState<Device | null>(null);
  const [modalAction, setModalAction] = useState<"edit" | "delete" | "block" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (device: Device) => {
    setModalDevice(device);
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (device: Device) => {
    setModalDevice(device);
    setModalAction("delete");
    setIsModalOpen(true);
  };

  const handleBlock = (device: Device) => {
    setModalDevice(device);
    setModalAction("block");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAction = async (updatedDevice?: Device) => {
    if (!modalDevice) return;
    
    if (modalAction === "edit" && updatedDevice) {
      console.log(`Edit device for user ${modalDevice.user_id}`);
      console.log(updatedDevice);
      console.log(`Edit device ${updatedDevice.id} for user ${updatedDevice.user_id}`);
      
      try {
        // Update the device in the backend
        await DeviceService.updateDevice(updatedDevice);
        
        setDevices(prev => 
          prev.map(device => device.id === updatedDevice.id ? updatedDevice : device)
        );
        
        console.log("Device updated successfully", updatedDevice);
      } catch (error) {
        console.error("Error updating device:", error);
      }
    } else if (modalAction === "delete") {
      console.log(`Delete device ${modalDevice.id} for user ${modalDevice.user_id}`);
      
      try {
        await DeviceService.deleteDevice(modalDevice.id);
        
        // Remove the device from the local state
        setDevices(prev => prev.filter(device => device.id !== modalDevice.id));
        
        console.log("Device deleted successfully");
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    } else if (modalAction === "block") {
      console.log(`Block device ${modalDevice.id} for user ${modalDevice.user_id}`);
      
      try {
        await DeviceService.blockCommunication(modalDevice.id);
        
        // Update the local state to reflect the change in comm_state
        const updatedDevices = devices.map(device => {
          if (device.id === modalDevice.id) {
            return { ...device, comm_state: !device.comm_state };
          }
          return device;
        });
        
        setDevices(updatedDevices);
        
        console.log("Device communication state updated successfully");
      } catch (error) {
        console.error("Error updating device communication state:", error);
      }
    }
    
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await DeviceService.fetchAssignedDevices();
        console.log( "***************************");

        console.log( fetchedDevices);
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
              comm_state: device.comm_state,
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

  // Create columns with action handlers
  const columns = createColumns(handleEdit, handleDelete, handleBlock);

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
          <Link href="/admin/devices/unassigned">  Associer un dispositif
          </Link>

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
          columnVisibility={{
            user_id: false,
            state_type_id: false,
            type_id: false,
          }}
        />
      </div>

      {/* Device Action Modal */}
      <DeviceActionModal 
        device={modalDevice}
        action={modalAction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

export default Page;