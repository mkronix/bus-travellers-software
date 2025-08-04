
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Bus } from 'lucide-react';
import { useApi, useApiMutation } from '@/hooks/useApi';
import { apiService } from '@/services/api';
import AdminGuard from '@/components/admin/AdminGuard';
import toast from 'react-hot-toast';

interface BusFormData {
  bus_number: string;
  bus_type: string;
  seating_type: string;
  total_seats: number;
  base_price: number;
  driver_name: string;
  driver_phone: string;
  helper_name?: string;
  helper_phone?: string;
  is_active: boolean;
}

const AdminBuses = () => {
  const { data: buses, loading, refetch } = useApi(() => apiService.getAllBuses(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [formData, setFormData] = useState<BusFormData>({
    bus_number: '',
    bus_type: '',
    seating_type: '',
    total_seats: 0,
    base_price: 0,
    driver_name: '',
    driver_phone: '',
    helper_name: '',
    helper_phone: '',
    is_active: true
  });

  const createMutation = useApiMutation(
    (data: BusFormData) => apiService.createBus(data),
    {
      onSuccess: () => {
        toast.success('Bus created successfully');
        setIsCreateDialogOpen(false);
        resetForm();
        refetch();
      }
    }
  );

  const updateMutation = useApiMutation(
    ({ id, data }: { id: string; data: BusFormData }) => apiService.updateBus(id, data),
    {
      onSuccess: () => {
        toast.success('Bus updated successfully');
        setIsEditDialogOpen(false);
        resetForm();
        refetch();
      }
    }
  );

  const deleteMutation = useApiMutation(
    (id: string) => apiService.deleteBus(id),
    {
      onSuccess: () => {
        toast.success('Bus deleted successfully');
        refetch();
      }
    }
  );

  const filteredBuses = buses?.filter(bus => {
    const matchesSearch = bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driver_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? bus.is_active : !bus.is_active);
    return matchesSearch && matchesStatus;
  }) || [];

  const resetForm = () => {
    setFormData({
      bus_number: '',
      bus_type: '',
      seating_type: '',
      total_seats: 0,
      base_price: 0,
      driver_name: '',
      driver_phone: '',
      helper_name: '',
      helper_phone: '',
      is_active: true
    });
    setSelectedBus(null);
  };

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleEdit = (bus: any) => {
    setSelectedBus(bus);
    setFormData({
      bus_number: bus.bus_number,
      bus_type: bus.bus_type,
      seating_type: bus.seating_type,
      total_seats: bus.total_seats,
      base_price: bus.base_price,
      driver_name: bus.driver_name,
      driver_phone: bus.driver_phone,
      helper_name: bus.helper_name || '',
      helper_phone: bus.helper_phone || '',
      is_active: bus.is_active
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (selectedBus) {
      updateMutation.mutate({ id: selectedBus.id, data: formData });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this bus?')) {
      deleteMutation.mutate(id);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <AdminGuard requiredRole="superadmin">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bus Management</h1>
            <p className="text-gray-600">Manage your fleet of buses</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Bus
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Bus</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bus_number">Bus Number</Label>
                    <Input
                      id="bus_number"
                      value={formData.bus_number}
                      onChange={(e) => setFormData({ ...formData, bus_number: e.target.value })}
                      placeholder="Enter bus number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bus_type">Bus Type</Label>
                    <Select value={formData.bus_type} onValueChange={(value) => setFormData({ ...formData, bus_type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bus type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="Non-AC">Non-AC</SelectItem>
                        <SelectItem value="Sleeper">Sleeper</SelectItem>
                        <SelectItem value="Semi-Sleeper">Semi-Sleeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seating_type">Seating Type</Label>
                    <Select value={formData.seating_type} onValueChange={(value) => setFormData({ ...formData, seating_type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select seating type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2+2">2+2</SelectItem>
                        <SelectItem value="2+3">2+3</SelectItem>
                        <SelectItem value="1+2">1+2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total_seats">Total Seats</Label>
                    <Input
                      id="total_seats"
                      type="number"
                      value={formData.total_seats}
                      onChange={(e) => setFormData({ ...formData, total_seats: parseInt(e.target.value) || 0 })}
                      placeholder="Enter total seats"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base_price">Base Price (₹)</Label>
                  <Input
                    id="base_price"
                    type="number"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                    placeholder="Enter base price"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver_name">Driver Name</Label>
                    <Input
                      id="driver_name"
                      value={formData.driver_name}
                      onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })}
                      placeholder="Enter driver name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver_phone">Driver Phone</Label>
                    <Input
                      id="driver_phone"
                      value={formData.driver_phone}
                      onChange={(e) => setFormData({ ...formData, driver_phone: e.target.value })}
                      placeholder="Enter driver phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="helper_name">Helper Name (Optional)</Label>
                    <Input
                      id="helper_name"
                      value={formData.helper_name}
                      onChange={(e) => setFormData({ ...formData, helper_name: e.target.value })}
                      placeholder="Enter helper name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="helper_phone">Helper Phone (Optional)</Label>
                    <Input
                      id="helper_phone"
                      value={formData.helper_phone}
                      onChange={(e) => setFormData({ ...formData, helper_phone: e.target.value })}
                      placeholder="Enter helper phone"
                    />
                  </div>
                </div>

                <Button onClick={handleCreate} className="w-full" disabled={createMutation.loading}>
                  {createMutation.loading ? 'Creating...' : 'Create Bus'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search buses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuses.map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Bus className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">{bus.bus_number}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bus.bus_type}</div>
                          <div className="text-sm text-gray-500">{bus.seating_type}</div>
                        </div>
                      </TableCell>
                      <TableCell>{bus.total_seats}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bus.driver_name}</div>
                          <div className="text-sm text-gray-500">{bus.driver_phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>₹{bus.base_price}</TableCell>
                      <TableCell>
                        <Badge variant={bus.is_active ? 'default' : 'secondary'}>
                          {bus.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(bus)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDelete(bus.id)}
                            disabled={deleteMutation.loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Bus</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Same form fields as create, but with edit_ prefixes for ids */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_bus_number">Bus Number</Label>
                  <Input
                    id="edit_bus_number"
                    value={formData.bus_number}
                    onChange={(e) => setFormData({ ...formData, bus_number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_bus_type">Bus Type</Label>
                  <Select value={formData.bus_type} onValueChange={(value) => setFormData({ ...formData, bus_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="Non-AC">Non-AC</SelectItem>
                      <SelectItem value="Sleeper">Sleeper</SelectItem>
                      <SelectItem value="Semi-Sleeper">Semi-Sleeper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_seating_type">Seating Type</Label>
                  <Select value={formData.seating_type} onValueChange={(value) => setFormData({ ...formData, seating_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2+2">2+2</SelectItem>
                      <SelectItem value="2+3">2+3</SelectItem>
                      <SelectItem value="1+2">1+2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_total_seats">Total Seats</Label>
                  <Input
                    id="edit_total_seats"
                    type="number"
                    value={formData.total_seats}
                    onChange={(e) => setFormData({ ...formData, total_seats: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_base_price">Base Price (₹)</Label>
                <Input
                  id="edit_base_price"
                  type="number"
                  value={formData.base_price}
                  onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_driver_name">Driver Name</Label>
                  <Input
                    id="edit_driver_name"
                    value={formData.driver_name}
                    onChange={(e) => setFormData({ ...formData, driver_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_driver_phone">Driver Phone</Label>
                  <Input
                    id="edit_driver_phone"
                    value={formData.driver_phone}
                    onChange={(e) => setFormData({ ...formData, driver_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_helper_name">Helper Name</Label>
                  <Input
                    id="edit_helper_name"
                    value={formData.helper_name}
                    onChange={(e) => setFormData({ ...formData, helper_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_helper_phone">Helper Phone</Label>
                  <Input
                    id="edit_helper_phone"
                    value={formData.helper_phone}
                    onChange={(e) => setFormData({ ...formData, helper_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit_is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="edit_is_active">Active</Label>
              </div>

              <Button onClick={handleUpdate} className="w-full" disabled={updateMutation.loading}>
                {updateMutation.loading ? 'Updating...' : 'Update Bus'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminGuard>
  );
};

export default AdminBuses;
