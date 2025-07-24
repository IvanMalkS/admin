
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { SessionsService, SessionResponse } from "@/lib/api";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await SessionsService.listSessionsSessionsGet();
      setSessions(response);
    } catch (err) {
      setError("Не удалось загрузить сессии.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Управление сессиями</CardTitle>
              <CardDescription>
                Просмотр активных и прошлых пользовательских сессий с AI-помощниками.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {loading ? (
                <p>Загрузка сессий...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID сессии</TableHead>
                      <TableHead>ID пользователя</TableHead>
                      <TableHead>ID роли</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Создано</TableHead>
                      <TableHead>Обновлено</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.id}</TableCell>
                        <TableCell>{session.user_id}</TableCell>
                        <TableCell>{session.role_id}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            session.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {session.status === 'active' ? 'активно' : session.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(session.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(session.updated_at).toLocaleDateString()}
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
