
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
        description: editingRole.description || "",
        role_prompt: editingRole.role_prompt || "",
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
        description: editingRole.description || "",
        role_prompt: editingRole.role_prompt || "",
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
      description: "",
      role_prompt: "",
      id: 0,
      created_at: "",
      updated_at: "",
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
                      <TableHead>Description</TableHead>
                      <TableHead>Role Prompt</TableHead>
                      <TableHead>Created At</TableHead>
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
                            value={editingRole?.description || ""}
                            onChange={(e) => setEditingRole(prev => prev ? {...prev, description: e.target.value} : null)}
                            placeholder="Description"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingRole?.role_prompt || ""}
                            onChange={(e) => setEditingRole(prev => prev ? {...prev, role_prompt: e.target.value} : null)}
                            placeholder="Role prompt"
                          />
                        </TableCell>
                        <TableCell>-</TableCell>
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
                              value={editingRole.description || ""}
                              onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                            />
                          ) : (
                            role.description || "-"
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {editingRole && editingRole.id === role.id && !isCreating ? (
                            <Input
                              value={editingRole.role_prompt || ""}
                              onChange={(e) => setEditingRole({...editingRole, role_prompt: e.target.value})}
                            />
                          ) : (
                            role.role_prompt || "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(role.created_at).toLocaleDateString()}
                        </TableCell>
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
