"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { UsersService, UserSchema, UserCreate, UserUpdate } from "@/lib/api";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

// Define an extended UserSchema for editing purposes, allowing 'id' to be optional for new users
interface EditingUser extends UserSchema {
  id?: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Assuming listUsersUsersGet is the correct method to fetch users
      const response = await UsersService.listUsersUsersGet();
      setUsers(response);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!editingUser || !adminPassword) {
      setError("All fields and admin password are required to create a user.");
      return;
    }
    
    try {
      const userData: UserCreate = {
        username: editingUser.username,
        is_admin: editingUser.is_admin,
        name: editingUser.name || null, // Name can be null
        surname: editingUser.surname || null, // Surname can be null
        telegram_id: editingUser.telegram_id,
      };
      
      // Assuming createUserUsersPost is the correct method to create a user
      await UsersService.createUserUsersPost(userData); // Admin password might not be needed here based on openapi.json
      await fetchUsers();
      setIsCreating(false);
      setEditingUser(null);
    } catch (err) {
      setError("Failed to create user.");
      console.error(err);
    }
  };

  const handleUpdate = async (userId: number) => {
    if (!editingUser || !adminPassword) {
      setError("All fields and admin password are required to update a user.");
      return;
    }
    
    try {
      const userData: UserUpdate = {
        username: editingUser.username,
        is_admin: editingUser.is_admin,
        name: editingUser.name || null,
        surname: editingUser.surname || null,
        telegram_id: editingUser.telegram_id,
      };
      
      // Assuming updateUserUsersUserIdPut is the correct method to update a user
      await UsersService.updateUserUsersUserIdPut(userId, adminPassword, userData);
      await fetchUsers();
      setEditingUser(null);
    } catch (err) {
      setError("Failed to update user.");
      console.error(err);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!adminPassword) {
      setError("Admin password required for deletion.");
      return;
    }
    
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      // Assuming deleteUserUsersUserIdDelete is the correct method to delete a user
      await UsersService.deleteUserUsersUserIdDelete(userId, adminPassword);
      await fetchUsers();
    } catch (err) {
      setError("Failed to delete user.");
      console.error(err);
    }
  };

  const startCreating = () => {
    setEditingUser({
      username: "",
      is_admin: false,
      name: null,
      surname: null,
      telegram_id: 0,
      id: 0, // Temporary ID for UI, actual ID will be assigned by backend
      created_at: new Date().toISOString(), // Placeholder
      updated_at: new Date().toISOString(), // Placeholder
    });
    setIsCreating(true);
  };

  const startEditing = (user: UserSchema) => {
    setEditingUser({ ...user });
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setIsCreating(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage application users and their roles.
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
                  Add User
                </Button>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              {loading ? (
                <p>Loading users...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Telegram ID</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isCreating && (
                      <TableRow>
                        <TableCell>
                          <Input
                            value={editingUser?.username || ""}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, username: e.target.value} : null)}
                            placeholder="Username"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingUser?.name || ""}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, name: e.target.value} : null)}
                            placeholder="Name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingUser?.surname || ""}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, surname: e.target.value} : null)}
                            placeholder="Surname"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={editingUser?.telegram_id || 0}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, telegram_id: parseInt(e.target.value) || 0} : null)}
                            placeholder="Telegram ID"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={editingUser?.is_admin || false}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, is_admin: e.target.checked} : null)}
                            className="h-4 w-4"
                          />
                        </TableCell>
                        <TableCell>-</TableCell> {/* Created At for new user */}
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
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {editingUser && editingUser.id === user.id && !isCreating ? (
                            <Input
                              value={editingUser.username}
                              onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                            />
                          ) : (
                            user.username
                          )}
                        </TableCell>
                        <TableCell>
                          {editingUser && editingUser.id === user.id && !isCreating ? (
                            <Input
                              value={editingUser.name || ""}
                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                            />
                          ) : (
                            user.name || "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {editingUser && editingUser.id === user.id && !isCreating ? (
                            <Input
                              value={editingUser.surname || ""}
                              onChange={(e) => setEditingUser({...editingUser, surname: e.target.value})}
                            />
                          ) : (
                            user.surname || "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {editingUser && editingUser.id === user.id && !isCreating ? (
                            <Input
                              type="number"
                              value={editingUser.telegram_id}
                              onChange={(e) => setEditingUser({...editingUser, telegram_id: parseInt(e.target.value) || 0})}
                            />
                          ) : (
                            user.telegram_id
                          )}
                        </TableCell>
                        <TableCell>
                          {editingUser && editingUser.id === user.id && !isCreating ? (
                            <input
                              type="checkbox"
                              checked={editingUser.is_admin}
                              onChange={(e) => setEditingUser({...editingUser, is_admin: e.target.checked})}
                              className="h-4 w-4"
                            />
                          ) : (
                            user.is_admin ? "Yes" : "No"
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {editingUser && editingUser.id === user.id && !isCreating ? (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleUpdate(user.id)}>
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={cancelEditing}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => startEditing(user)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>
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