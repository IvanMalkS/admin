"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { UsersService, UserSchema } from "@/lib/api";

export default function AdminPage() {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await UsersService.readUsersUsersGet();
        setUsers(response);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Welcome to the admin dashboard. Here you can manage users, roles, and other settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && <p>Loading users...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && (users.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Users:</h3>
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>{user.email}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No users found.</p>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}