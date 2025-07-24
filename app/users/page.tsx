"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { UsersService, UserSchema, UserCreate, UserUpdate } from "@/lib/api";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";


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
      const response = await UsersService.listUsersUsersGet();
      setUsers(response);
    } catch (err) {
      setError("Не удалось загрузить пользователей.");
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
      setError("Все поля и пароль администратора обязательны для создания пользователя.");
      return;
    }
    
    try {
      const userData: UserCreate = {
        username: editingUser.username,
        is_admin: editingUser.is_admin,
        name: editingUser.name || null,
        surname: editingUser.surname || null, 
        telegram_id: editingUser.telegram_id,
      };
      

      await UsersService.createUserUsersPost(userData);
      await fetchUsers();
      setIsCreating(false);
      setEditingUser(null);
    } catch (err) {
      setError("Не удалось создать пользователя.");
      console.error(err);
    }
  };

  const handleUpdate = async (userId: number) => {
    if (!editingUser || !adminPassword) {
      setError("Все поля и пароль администратора обязательны для обновления пользователя.");
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
      
      await UsersService.updateUserUsersUserIdPut(userId, adminPassword, userData);
      await fetchUsers();
      setEditingUser(null);
    } catch (err) {
      setError("Не удалось обновить пользователя.");
      console.error(err);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!adminPassword) {
      setError("Требуется пароль администратора для удаления.");
      return;
    }
    
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return;
    
    try {
      await UsersService.deleteUserUsersUserIdDelete(userId, adminPassword);
      await fetchUsers();
    } catch (err) {
      setError("Не удалось удалить пользователя.");
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
      id: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
              <CardTitle>Управление пользователями</CardTitle>
              <CardDescription>
                Управляйте пользователями приложения и их ролями.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  type="password"
                  placeholder="Пароль администратора"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-64"
                />
                <Button onClick={startCreating} disabled={isCreating}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить пользователя
                </Button>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              {loading ? (
                <p>Загрузка пользователей...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя пользователя</TableHead>
                      <TableHead>Имя</TableHead>
                      <TableHead>Фамилия</TableHead>
                      <TableHead>ID Telegram</TableHead>
                      <TableHead>Админ</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isCreating && (
                      <TableRow>
                        <TableCell>
                          <Input
                            value={editingUser?.username || ""}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, username: e.target.value} : null)}
                            placeholder="Имя пользователя"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingUser?.name || ""}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, name: e.target.value} : null)}
                            placeholder="Имя"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingUser?.surname || ""}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, surname: e.target.value} : null)}
                            placeholder="Фамилия"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={editingUser?.telegram_id || 0}
                            onChange={(e) => setEditingUser(prev => prev ? {...prev, telegram_id: parseInt(e.target.value) || 0} : null)}
                            placeholder="ID Telegram"
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
                            user.is_admin ? "Да" : "Нет"
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