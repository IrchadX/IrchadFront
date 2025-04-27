"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Ban } from "lucide-react";
import { Device } from "@/data/dispositifs";
import { DeviceService } from "@/app/admin/devices/_lib/services/deviceService";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DeviceActionModalProps {
  device: Device | null;
  action: "edit" | "delete" | "block" | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedDevice?: Device) => void;
}

export function DeviceActionModal({
  device,
  action,
  isOpen,
  onClose,
  onConfirm,
}: DeviceActionModalProps) {
  const [editableDevice, setEditableDevice] = useState<Device | null>(null);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceStates, setDeviceStates] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && action === "edit") {
      const loadFormData = async () => {
        setLoading(true);
        try {
          const [types, states, usersList] = await Promise.all([
            DeviceService.fetchDeviceTypes(),
            DeviceService.fetchDeviceStates(),
            DeviceService.fetchUsers()
          ]);
          setDeviceTypes(types);
          setDeviceStates(states);
          setUsers(usersList);
        } catch (error) {
          console.error("Error loading form data:", error);
        } finally {
          setLoading(false);
        }
      };
      loadFormData();
    }
  }, [isOpen, action]);

  useEffect(() => {
    if (device) {
      setEditableDevice({ ...device });
    }
  }, [device]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableDevice) {
      setEditableDevice({ ...editableDevice, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (editableDevice) {
      setEditableDevice({ ...editableDevice, [name]: value });
    }
  };

  const handleToggleChange = (name: string, value: boolean) => {
    if (editableDevice) {
      setEditableDevice({ ...editableDevice, [name]: value });
    }
  };

  const getActionDetails = () => {
    switch (action) {
      case "edit":
        return {
          title: "Modifier le dispositif",
          icon: <Edit className="h-5 w-5 mr-2 text-[#2B7A78]" />,
          confirmText: "Enregistrer",
          confirmColor: "bg-[#2B7A78] hover:bg-blue-600",
        };
      case "delete":
        return {
          title: "Supprimer le dispositif",
          icon: <Trash2 className="h-5 w-5 mr-2 text-red-500" />,
          confirmText: "Supprimer",
          confirmColor: "bg-red-500 hover:bg-red-600",
        };
      case "block":
        return {
          title: device?.comm_state ? "Bloquer le dispositif" : "Débloquer le dispositif",
          icon: <Ban className="h-5 w-5 mr-2 text-red-500" />,
          confirmText: device?.comm_state ? "Bloquer" : "Débloquer",
          confirmColor: device?.comm_state ? "bg-red-500" : "bg-[#2B7A78]",
        };
      default:
        return {
          title: "",
          icon: null,
          confirmText: "",
          confirmColor: "",
        };
    }
  };

  const handleSubmit = () => {
    if (action === "edit" && editableDevice) {
      const processedDevice = {
        ...editableDevice,
        type_id: typeof editableDevice.type_id === 'string' ? parseInt(editableDevice.type_id) : editableDevice.type_id,
        state_type_id: typeof editableDevice.state_type_id === 'string' ? parseInt(editableDevice.state_type_id) : editableDevice.state_type_id,
        user_id: editableDevice.user_id === "" ? null : (typeof editableDevice.user_id === 'string' ? parseInt(editableDevice.user_id) : editableDevice.user_id),
      };
      onConfirm(processedDevice);
    } else {
      onConfirm();
    }
  };

  const actionDetails = getActionDetails();

  if (!device || !editableDevice) return null;

  const modalWidth = action === "edit" ? "sm:max-w-2xl" : "sm:max-w-md";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${modalWidth} font-montserrat`}>
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-semibold">
            {actionDetails.icon}
            {actionDetails.title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {action === "edit" ? (
            loading ? (
              <div className="text-center py-4">Chargement des données...</div>
            ) : (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type_id">Type d'appareil</Label>
                    <Select
                      value={editableDevice.type_id?.toString() || ""}
                      onValueChange={(value) => handleSelectChange("type_id", value)}
                    >
                      <SelectTrigger className="w-full bg-main/5 rounded-[8px] border border-black/30">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="software_version">Version du logiciel</Label>
                    <Input 
                      id="software_version" 
                      name="software_version" 
                      value={editableDevice.software_version} 
                      onChange={handleInputChange} 
                      className="bg-main/5 rounded-[8px] border border-black/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_service">Date de mise en service</Label>
                    <Input 
                      id="date_of_service" 
                      name="date_of_service"
                      type="date"
                      value={editableDevice.date_of_service} 
                      onChange={handleInputChange} 
                      className="bg-main/5 rounded-[8px] border border-black/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state_type_id">État initial</Label>
                    <Select
                      value={editableDevice.state_type_id?.toString() || ""}
                      onValueChange={(value) => handleSelectChange("state_type_id", value)}
                    >
                      <SelectTrigger className="w-full bg-main/5 rounded-[8px] border border-black/30">
                        <SelectValue placeholder="Sélectionner un état" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceStates.map((state) => (
                          <SelectItem key={state.id} value={state.id.toString()}>
                            {state.state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mac_address">Adresse MAC</Label>
                    <Input 
                      id="mac_address" 
                      name="mac_address" 
                      value={editableDevice.mac_address} 
                      onChange={handleInputChange} 
                      className="bg-main/5 rounded-[8px] border border-black/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="battery_capacity">Capacité de batterie</Label>
                    <Input 
                      id="battery_capacity" 
                      name="battery_capacity" 
                      value={editableDevice.battery_capacity} 
                      onChange={handleInputChange} 
                      className="bg-main/5 rounded-[8px] border border-black/30"
                    />
                  </div>
                </div>

                

                <div className="flex items-center justify-between">
                  <Label htmlFor="comm_state">Communication activée</Label>
                  <Switch 
                    checked={editableDevice.comm_state}
                    onCheckedChange={(checked) => handleToggleChange("comm_state", checked)}
                  />
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              Êtes-vous sûr de vouloir {actionDetails.title.toLowerCase()} ?
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            className={actionDetails.confirmColor} 
            onClick={handleSubmit}
          >
            {actionDetails.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
