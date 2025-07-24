import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Добро пожаловать в панель администратора</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Управляйте пользователями, ролями, сессиями и часто задаваемыми вопросами вашего приложения.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Управление пользователями</CardTitle>
                <CardDescription>
                  Просмотр и редактирование информации о пользователях.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Link href="/users" className="mt-auto">
                  <Button className="w-full">Перейти</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Управление ролями</CardTitle>
                <CardDescription>
                  Настройка ролей AI и их системных подсказок.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Link href="/roles" className="mt-auto">
                  <Button className="w-full">Перейти</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Управление сессиями</CardTitle>
                <CardDescription>
                  Мониторинг активных и прошлых сессий пользователей.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Link href="/sessions" className="mt-auto">
                  <Button className="w-full">Перейти</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Управление FAQ</CardTitle>
                <CardDescription>
                  Добавление, изменение и удаление часто задаваемых вопросов.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Link href="/faqs" className="mt-auto">
                  <Button className="w-full">Перейти</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}