
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { RolesService, RoleResponse, RoleCreate, RoleUpdate } from "@/lib/api";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface EditingRole extends RoleResponse {
  id?: number;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<EditingRole | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await RolesService.listRolesRolesGet();
      setRoles(response);
    } catch (err) {
      setError("Failed to fetch roles.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async () => {
    if (!editingRole || !adminPassword) return;
    
    try {
      const roleData: RoleCreate = {
        name: editingRole.name,
        display_name: editingRole.display_name || "", 
        system_prompt: editingRole.system_prompt || "",
        elevenlabs_voice_id: editingRole.elevenlabs_voice_id || "",
        did_avatar_id: editingRole.did_avatar_id || "",
      };
      
      await RolesService.createRoleRolesPost(adminPassword, roleData);
      await fetchRoles();
      setIsCreating(false);
      setEditingRole(null);
    } catch (err) {
      setError("Failed to create role.");
      console.error(err);
    }
  };

  const handleUpdate = async (roleId: number) => {
    if (!editingRole || !adminPassword) return;
    
    try {
      const roleData: RoleUpdate = {
        name: editingRole.name,
        // Changed from description to display_name
        display_name: editingRole.display_name || "",
        // Changed from role_prompt to system_prompt
        system_prompt: editingRole.system_prompt || "",
        // Add other required fields if they are part of RoleUpdate and not handled by the UI
        elevenlabs_voice_id: editingRole.elevenlabs_voice_id || "",
        did_avatar_id: editingRole.did_avatar_id || "",
      };
      
      await RolesService.updateRoleRolesRoleIdPut(roleId, adminPassword, roleData);
      await fetchRoles();
      setEditingRole(null);
    } catch (err) {
      setError("Failed to update role.");
      console.error(err);
    }
  };

  const handleDelete = async (roleId: number) => {
    if (!adminPassword) {
      setError("Admin password required for deletion.");
      return;
    }
    
    if (!confirm("Are you sure you want to delete this role?")) return;
    
    try {
      await RolesService.deleteRoleRolesRoleIdDelete(roleId, adminPassword);
      await fetchRoles();
    } catch (err) {
      setError("Failed to delete role.");
      console.error(err);
    }
  };

  const startCreating = () => {
    setEditingRole({
      name: "",
      // Changed from description to display_name
      display_name: "",
      // Changed from role_prompt to system_prompt
      system_prompt: "",
      elevenlabs_voice_id: "", // Initialize new fields
      did_avatar_id: "", // Initialize new fields
      id: 0, // id is required by RoleResponse, but might be auto-generated for creation
      // Removed created_at and updated_at as they are not in RoleResponse schema
    });
    setIsCreating(true);
  };

  const startEditing = (role: RoleResponse) => {
    setEditingRole({ ...role });
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingRole(null);
    setIsCreating(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Manage AI roles and their prompts for different conversation types.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  type="password"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-64"
                />
                <Button onClick={startCreating} disabled={isCreating}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              {loading ? (
                <p>Loading roles...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
          
                      <TableHead>Display Name</TableHead>

                      <TableHead>System Prompt</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isCreating && (
                      <TableRow>
                        <TableCell>
                          <Input
                            value={editingRole?.name || ""}
                            onChange={(e) => setEditingRole(prev => prev ? {...prev, name: e.target.value} : null)}
                            placeholder="Role name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
            
                            value={editingRole?.display_name || ""}
                            onChange={(e) => setEditingRole(prev => prev ? {...prev, display_name: e.target.value} : null)}
                            placeholder="Display Name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                      
                            value={editingRole?.system_prompt || ""}
                            onChange={(e) => setEditingRole(prev => prev ? {...prev, system_prompt: e.target.value} : null)}
                            placeholder="System Prompt"
                          />
                        </TableCell>
              
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleCreate}>
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEditing}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          {editingRole && editingRole.id === role.id && !isCreating ? (
                            <Input
                              value={editingRole.name}
                              onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                            />
                          ) : (
                            role.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingRole && editingRole.id === role.id && !isCreating ? (
                            <Input
                              // Changed from description to display_name
                              value={editingRole.display_name || ""}
                              onChange={(e) => setEditingRole({...editingRole, display_name: e.target.value})}
                            />
                          ) : (
                            // Changed from description to display_name
                            role.display_name || "-"
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {editingRole && editingRole.id === role.id && !isCreating ? (
                            <Input
                              // Changed from role_prompt to system_prompt
                              value={editingRole.system_prompt || ""}
                              onChange={(e) => setEditingRole({...editingRole, system_prompt: e.target.value})}
                            />
                          ) : (
                            // Changed from role_prompt to system_prompt
                            role.system_prompt || "-"
                          )}
                        </TableCell>
                        {/* Removed corresponding TableCell for Created At */}
                        <TableCell>
                          {editingRole && editingRole.id === role.id && !isCreating ? (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleUpdate(role.id)}>
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={cancelEditing}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => startEditing(role)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(role.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
