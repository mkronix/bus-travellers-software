
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2, Route, Clock, MapPin } from 'lucide-react';
import { useApi, useApiMutation } from '@/hooks/useApi';
import { apiService } from '@/services/api';
import AdminGuard from '@/components/admin/AdminGuard';
import toast from 'react-hot-toast';

interface RouteFormData {
  name: string;
  start_location: string;
  end_location: string;
  distance_km: number;
  duration_hours: number;
  stops: string[];
  is_active: boolean;
}

const AdminRoutes = () => {
  const { data: routes, loading, refetch } = useApi(() => apiService.getAllRoutes(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [formData, setFormData] = useState<RouteFormData>({
    name: '',
    start_location: '',
    end_location: '',
    distance_km: 0,
    duration_hours: 0,
    stops: [],
    is_active: true
  });
  const [stopsText, setStopsText] = useState('');

  const createMutation = useApiMutation(
    (data: RouteFormData) => apiService.createRoute(data),
    {
      onSuccess: () => {
        toast.success('Route created successfully');
        setIsCreateDialogOpen(false);
        resetForm();
        refetch();
      }
    }
  );

  const updateMutation = useApiMutation(
    ({ id, data }: { id: string; data: RouteFormData }) => apiService.updateRoute(id, data),
    {
      onSuccess: () => {
        toast.success('Route updated successfully');
        setIsEditDialogOpen(false);
        resetForm();
        refetch();
      }
    }
  );

  const deleteMutation = useApiMutation(
    (id: string) => apiService.deleteRoute(id),
    {
      onSuccess: () => {
        toast.success('Route deleted successfully');
        refetch();
      }
    }
  );

  const filteredRoutes = routes?.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.start_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.end_location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  const resetForm = () => {
    setFormData({
      name: '',
      start_location: '',
      end_location: '',
      distance_km: 0,
      duration_hours: 0,
      stops: [],
      is_active: true
    });
    setStopsText('');
    setSelectedRoute(null);
  };

  const handleCreate = () => {
    const stops = stopsText.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    createMutation.mutate({ ...formData, stops });
  };

  const handleEdit = (route: any) => {
    setSelectedRoute(route);
    setFormData({
      name: route.name,
      start_location: route.start_location,
      end_location: route.end_location,
      distance_km: route.distance_km || 0,
      duration_hours: route.duration_hours || 0,
      stops: Array.isArray(route.stops) ? route.stops : [],
      is_active: route.is_active
    });
    const stopsArray = Array.isArray(route.stops) ? route.stops : [];
    setStopsText(stopsArray.join('\n'));
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (selectedRoute) {
      const stops = stopsText.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      updateMutation.mutate({ id: selectedRoute.id, data: { ...formData, stops } });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this route?')) {
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
            <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
            <p className="text-gray-600">Manage bus routes and schedules</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Route
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Route</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Route Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter route name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_location">Start Location</Label>
                    <Input
                      id="start_location"
                      value={formData.start_location}
                      onChange={(e) => setFormData({ ...formData, start_location: e.target.value })}
                      placeholder="Enter start location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_location">End Location</Label>
                    <Input
                      id="end_location"
                      value={formData.end_location}
                      onChange={(e) => setFormData({ ...formData, end_location: e.target.value })}
                      placeholder="Enter end location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance_km">Distance (KM)</Label>
                    <Input
                      id="distance_km"
                      type="number"
                      value={formData.distance_km}
                      onChange={(e) => setFormData({ ...formData, distance_km: parseInt(e.target.value) || 0 })}
                      placeholder="Enter distance in km"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_hours">Duration (Hours)</Label>
                    <Input
                      id="duration_hours"
                      type="number"
                      step="0.5"
                      value={formData.duration_hours}
                      onChange={(e) => setFormData({ ...formData, duration_hours: parseFloat(e.target.value) || 0 })}
                      placeholder="Enter duration in hours"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stops">Stops (one per line)</Label>
                  <Textarea
                    id="stops"
                    value={stopsText}
                    onChange={(e) => setStopsText(e.target.value)}
                    placeholder="Enter each stop on a new line"
                    rows={5}
                  />
                </div>

                <Button onClick={handleCreate} className="w-full" disabled={createMutation.loading}>
                  {createMutation.loading ? 'Creating...' : 'Create Route'}
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
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>From - To</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Route className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">{route.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm">{route.start_location}</span>
                          <span className="mx-2">→</span>
                          <MapPin className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-sm">{route.end_location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {route.distance_km ? `${route.distance_km} km` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {route.duration_hours ? `${route.duration_hours}h` : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {Array.isArray(route.stops) ? (
                          <span className="text-sm text-gray-600">
                            {route.stops.length} stops
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">No stops</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={route.is_active ? 'default' : 'secondary'}>
                          {route.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(route)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDelete(route.id)}
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
              <DialogTitle>Edit Route</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_name">Route Name</Label>
                <Input
                  id="edit_name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_start_location">Start Location</Label>
                  <Input
                    id="edit_start_location"
                    value={formData.start_location}
                    onChange={(e) => setFormData({ ...formData, start_location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_end_location">End Location</Label>
                  <Input
                    id="edit_end_location"
                    value={formData.end_location}
                    onChange={(e) => setFormData({ ...formData, end_location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_distance_km">Distance (KM)</Label>
                  <Input
                    id="edit_distance_km"
                    type="number"
                    value={formData.distance_km}
                    onChange={(e) => setFormData({ ...formData, distance_km: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_duration_hours">Duration (Hours)</Label>
                  <Input
                    id="edit_duration_hours"
                    type="number"
                    step="0.5"
                    value={formData.duration_hours}
                    onChange={(e) => setFormData({ ...formData, duration_hours: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit_stops">Stops (one per line)</Label>
                <Textarea
                  id="edit_stops"
                  value={stopsText}
                  onChange={(e) => setStopsText(e.target.value)}
                  rows={5}
                />
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
                {updateMutation.loading ? 'Updating...' : 'Update Route'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminGuard>
  );
};

export default AdminRoutes;
